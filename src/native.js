/* @flow */

import React from 'react'
import { View, Dimensions } from 'react-native'

import type { Children } from 'react'

const space = count => count * 10

export type BoxProps = {
  // horizontal / vertical spaced children
  stacked?: boolean,
  horizontal?: boolean,
  wrap?: boolean,
  spaceBetween?: number,
  noSpaceBetween?: boolean,

  // positioning
  top?: number,
  right?: number,
  bottom?: number,
  left?: number,

  // alignment
  vAlign?: 'top' | 'center' | 'bottom' | 'spaceAround' | 'spaceBetween',
  hAlign?: 'top' | 'center' | 'bottom' | 'spaceAround' | 'spaceBetween',

  // sizing for child boxes
  fill?: boolean,
  w?: number | number[],
  h?: number | number[],

  // misc
  children?: Children,

  // internal
  __boxIsSpacingChild?: boolean,
  __boxParentSpaceBetween?: number,
}

const HORIZONTAL_VALIGN_MAP = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
}

const HORIZONTAL_HALIGN_MAP = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  spaceAround: 'space-around',
  spaceBetween: 'space-between',
}

const STACKED_VALIGN_MAP = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
  spaceAround: 'space-around',
  spaceBetween: 'space-between',
}

const STACKED_HALIGN_MAP = {
  left: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
}

const rerenderOnViewportChange = Component =>
  class extends React.Component {
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount() {
      Dimensions.addEventListener('screen', this.handleChange)
      window.addEventListener('resize', this.handleChange)
    }

    componentWillUnmount() {
      Dimensions.removeEventListener('screen', this.handleChange)
      window.removeEventListener('resize', this.handleChange)
    }

    handleChange() {
      this.forceUpdate()
    }

    render() {
      return <Component {...this.props} />
    }
  }

export const Box = rerenderOnViewportChange((_props: BoxProps) => {
  let props = _props
  const isChildABox =
    React.Children.count(props.children) === 1 &&
    React.Children.only(props.children).type === Box

  if (isChildABox) {
    props = Object.assign({}, _props, React.Children.only(props.children).props)
  }

  const responsiveProps = getCurrentValuesForResponsiveProps(props)

  const hasPosition = props.top || props.right || props.bottom || props.left

  const width = calculateSize(responsiveProps.w)
  const height = calculateSize(responsiveProps.h)

  const style: Object = {
    flexGrow: 1,
    position: hasPosition ? 'absolute' : 'relative',
    top: space(props.top),
    right: space(props.right),
    bottom: space(props.bottom),
    left: space(props.left),
    width,
    height,
  }

  const isSpacingContainer = props.stacked || props.horizontal || props.wrap
  const isSpacingChild = props.__boxIsSpacingChild

  if (isSpacingChild) {
    const spaceBetweenPx = space(props.__boxParentSpaceBetween)

    style.flexGrow = props.fill ? 1 : 0
    style.padding = spaceBetweenPx / 2
  }

  if (isSpacingContainer) {
    const spaceBetween = props.noSpaceBetween ? 0 : props.spaceBetween
    const spaceBetweenPx = space(spaceBetween)

    const isHorizontal = props.horizontal || props.wrap

    style.flexDirection = isHorizontal ? 'row' : 'column'
    style.margin = -(spaceBetweenPx / 2)

    style.alignItems = isHorizontal
      ? HORIZONTAL_VALIGN_MAP[props.vAlign]
      : STACKED_HALIGN_MAP[props.hAlign]
    style.justifyContent = isHorizontal
      ? HORIZONTAL_HALIGN_MAP[props.hAlign]
      : STACKED_VALIGN_MAP[props.vAlign]

    if (props.wrap) {
      style.flexWrap = 'wrap'
    }

    const flattenedChildren = React.Children.toArray(props.children)

    const children = flattenedChildren.map((child, index) =>
      <Box
        key={index}
        fill={child.props.fill}
        w={child.props.w}
        h={child.props.h}
        __boxIsSpacingChild
        __boxParentSpaceBetween={spaceBetween}
        {...(child.type === Box ? child.props : {})}
      >
        {child.type === Box ? child.props.children : child}
      </Box>,
    )

    return (
      <View style={style}>
        {children}
      </View>
    )
  }

  const child = React.Children.only(props.children)

  return (
    <View style={style}>
      {child}
    </View>
  )
})

Box.defaultProps = {
  spaceBetween: 1,
}

const calculateSize = size => {
  if (!size) {
    return undefined
  }

  if (size <= 1) {
    // percentage
    return `${size * 100}%`
  }

  return size
}

const BREAKPOINTS = [767, 991, 1199, 1300]

const getCurrentValuesForResponsiveProps = props => ({
  w: getCurrentValueForResponsiveProp(props.w),
  h: getCurrentValueForResponsiveProp(props.h),
})

const getCurrentValueForResponsiveProp = value => {
  if (!Array.isArray(value)) {
    // value is scalar value so it will be the same across breakpoints
    return value
  }

  const windowWidth = Dimensions.get('window').width
  let currentBreakpointIndex = BREAKPOINTS.length - 1

  for (let i = 0; i < BREAKPOINTS.length; i++) {
    if (windowWidth < BREAKPOINTS[i]) {
      currentBreakpointIndex = i
      break
    }
  }

  if (currentBreakpointIndex == null) return null

  if (currentBreakpointIndex > value.length - 1) {
    return value[value.length - 1]
  }

  return value[currentBreakpointIndex]
}
