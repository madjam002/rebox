/* @flow */

import React from 'react'
import { View, Dimensions } from 'react-native'
import {
  BREAKPOINTS,
  space,
  getSpaceBetween,
  calculateSize,
  computeAlignItems,
  computeJustifyContent,
} from './common'
import type { BoxProps } from './common'

const rerenderOnViewportChange = Component =>
  class extends React.Component<any, any> {
    handleChange: any

    constructor(props: any) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount() {
      Dimensions.addEventListener('screen', this.handleChange)
      if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('resize', this.handleChange)
      }
    }

    componentWillUnmount() {
      Dimensions.removeEventListener('screen', this.handleChange)
      if (typeof window !== 'undefined' && window.addEventListener) {
        window.removeEventListener('resize', this.handleChange)
      }
    }

    handleChange() {
      this.forceUpdate()
    }

    render() {
      return <Component {...this.props} />
    }
  }

const calculatePosition = value => {
  if (value === true) {
    return 0
  } else if (value == null || value === false) {
    return undefined
  }

  return space(value)
}

export const Box = rerenderOnViewportChange((_props: BoxProps) => {
  let props = _props
  const isChildABox =
    React.Children.count(props.children) === 1 && React.Children.only(props.children).type === Box

  if (isChildABox) {
    props = Object.assign({}, _props, React.Children.only(props.children).props)
  }

  const responsiveProps = getCurrentValuesForResponsiveProps(props)

  const hasPosition =
    props.top != null || props.right != null || props.bottom != null || props.left != null

  const width = calculateSize(responsiveProps.w)
  const height = calculateSize(responsiveProps.h)

  const style: Object = {
    flexGrow: 1,
    position: hasPosition ? 'absolute' : 'relative',
    top: calculatePosition(responsiveProps.top),
    right: calculatePosition(responsiveProps.right),
    bottom: calculatePosition(responsiveProps.bottom),
    left: calculatePosition(responsiveProps.left),
    width,
    height,
  }

  if (props.__boxIsSpacingChild) {
    const spaceBetweenPx = space(props.__boxParentSpaceBetween)

    style.flexGrow = props.fill ? 1 : 0
    style.padding = spaceBetweenPx / 2
  }

  if (props.stacked || props.horizontal) {
    const spaceBetween = getSpaceBetween(props)
    const spaceBetweenPx = space(spaceBetween)

    style.flexDirection = props.horizontal ? 'row' : 'column'
    style.margin = -(spaceBetweenPx / 2)

    style.alignItems = computeAlignItems(props)
    style.justifyContent = computeJustifyContent(props)

    if (style.alignItems == null) delete style.alignItems
    if (style.justifyContent == null) delete style.justifyContent

    if (props.wrap) {
      style.flexWrap = 'wrap'
    }

    const flattenedChildren = React.Children.toArray(props.children)

    const children = flattenedChildren.map((child, index) => (
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
      </Box>
    ))

    return <View style={style}>{children}</View>
  }

  const child = React.Children.only(props.children)

  return <View style={style}>{child}</View>
})

const getCurrentValuesForResponsiveProps = props => ({
  w: getCurrentValueForResponsiveProp(props.w),
  h: getCurrentValueForResponsiveProp(props.h),
  top: getCurrentValueForResponsiveProp(props.top),
  right: getCurrentValueForResponsiveProp(props.right),
  bottom: getCurrentValueForResponsiveProp(props.bottom),
  left: getCurrentValueForResponsiveProp(props.left),
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
