/* @flow */

import React from 'react'
import { View } from 'react-native'

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
  vAlign?: 'top' | 'middle' | 'bottom',
  hAlign?: 'top' | 'middle' | 'bottom' | 'spaceAround',

  // sizing for child boxes
  fill?: boolean,
  w?: number,
  h?: number,

  // misc
  children?: Children,

  // internal
  __boxIsSpacingChild?: boolean,
  __boxParentSpaceBetween?: number,
}

const VALIGN_MAP = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
}

const HALIGN_MAP = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
  spaceAround: 'space-around',
}

export const Box = (_props: BoxProps) => {
  let props = _props
  const isChildABox =
    React.Children.count(props.children) === 1 &&
    React.Children.only(props.children).type === Box

  if (isChildABox) {
    props = Object.assign({}, _props, React.Children.only(props.children).props)
  }

  const hasPosition = props.top || props.right || props.bottom || props.left

  const width = calculateSize(props.w)
  const height = calculateSize(props.h)

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
    style.alignItems = isHorizontal ? VALIGN_MAP[props.vAlign] : null
    style.justifyContent = isHorizontal ? HALIGN_MAP[props.hAlign] : null

    if (props.wrap) {
      style.flexWrap = 'wrap'
    }

    const flattenedChildren = React.Children.toArray(props.children)

    const children = flattenedChildren.map((child, index) =>
      <Box
        key={index}
        fill={child.props.fill}
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
}

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
