/* @flow */

import * as React from 'react'

type InternalSpacingChildProps = {|
  __boxIsSpacingChild: true,
  __boxParentSpaceBetween: number,
|}

type InternalProps = {||} | {| __boxIsSpacingChild: false |} | InternalSpacingChildProps

type ResponsiveProp<T> = T | T[]

type BoxCoreProps = {|
  ...InternalProps,

  // positioning
  top?: ResponsiveProp<number | boolean>,
  right?: ResponsiveProp<number | boolean>,
  bottom?: ResponsiveProp<number | boolean>,
  left?: ResponsiveProp<number | boolean>,

  // sizing for child boxes
  fill?: boolean,

  // general size
  w?: ResponsiveProp<number>,
  h?: ResponsiveProp<number>,
|}

type BoxMultiChildProps = {|
  ...BoxCoreProps,

  spaceBetween?: number,
  noSpaceBetween?: boolean,

  children?: React.Node,
|}

type BoxSingleChildProps = {|
  ...BoxCoreProps,

  children: React.Element<any>,
|}

type BoxHorizontalProps = {|
  ...BoxMultiChildProps,

  horizontal: true,
  wrap?: boolean,

  // alignment of children
  vAlign?: 'top' | 'center' | 'bottom',
  hAlign?: 'left' | 'center' | 'right' | 'spaceAround' | 'spaceBetween',
|}

type BoxStackedProps = {|
  ...BoxMultiChildProps,

  stacked: true,

  // alignment of children
  vAlign?: 'top' | 'center' | 'bottom' | 'spaceAround' | 'spaceBetween',
  hAlign?: 'left' | 'center' | 'right',
|}

export type BoxProps = BoxSingleChildProps | BoxHorizontalProps | BoxStackedProps

export const HORIZONTAL_VALIGN_MAP = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
}

export const HORIZONTAL_HALIGN_MAP = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  spaceAround: 'space-around',
  spaceBetween: 'space-between',
}

export const STACKED_VALIGN_MAP = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
  spaceAround: 'space-around',
  spaceBetween: 'space-between',
}

export const STACKED_HALIGN_MAP = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

export const space = (count: number) => count * 10

export const calculateSize = (size?: ?number | boolean) => {
  if (size == null || size === false || size === true) {
    return undefined
  }

  if (size <= 1) {
    // percentage
    return `${size * 100}%`
  }

  return `${size}px`
}

const DEFAULT_SPACE_BETWEEN = 1

export const getSpaceBetween = (props: BoxProps) => {
  if (props.noSpaceBetween) {
    return 0
  } else if (props.spaceBetween == null) {
    return DEFAULT_SPACE_BETWEEN
  }

  return props.spaceBetween
}

export const computeAlignItems = (props: BoxHorizontalProps | BoxStackedProps) => {
  if (props.horizontal) {
    return props.vAlign != null ? HORIZONTAL_VALIGN_MAP[props.vAlign] : null
  }

  return props.hAlign != null ? STACKED_HALIGN_MAP[props.hAlign] : null
}

export const computeJustifyContent = (props: BoxHorizontalProps | BoxStackedProps) => {
  if (props.horizontal) {
    return props.hAlign != null ? HORIZONTAL_HALIGN_MAP[props.hAlign] : null
  }

  return props.vAlign != null ? STACKED_VALIGN_MAP[props.vAlign] : null
}

export const BREAKPOINTS = [767, 991, 1199, 1300]
