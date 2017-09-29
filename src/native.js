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
import { getCurrentValueForResponsiveProp } from './util/native'
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
    order: responsiveProps.order,
    display: responsiveProps.visible === false ? 'none' : 'flex',
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

    if (props.wrap !== false) {
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

const getCurrentValuesForResponsiveProps = props => {
  const windowWidth = Dimensions.get('window').width

  return {
    w: getCurrentValueForResponsiveProp(props.w, windowWidth, BREAKPOINTS),
    h: getCurrentValueForResponsiveProp(props.h, windowWidth, BREAKPOINTS),
    top: getCurrentValueForResponsiveProp(props.top, windowWidth, BREAKPOINTS),
    right: getCurrentValueForResponsiveProp(props.right, windowWidth, BREAKPOINTS),
    bottom: getCurrentValueForResponsiveProp(props.bottom, windowWidth, BREAKPOINTS),
    left: getCurrentValueForResponsiveProp(props.left, windowWidth, BREAKPOINTS),
    order: getCurrentValueForResponsiveProp(props.order, windowWidth, BREAKPOINTS),
    visible: getCurrentValueForResponsiveProp(props.visible, windowWidth, BREAKPOINTS),
  }
}
