/* @flow */

import React from 'react'
import styled, { css } from 'styled-components'
import {
  BREAKPOINTS,
  calculateSize,
  getSpaceBetween,
  space,
  computeAlignItems,
  computeJustifyContent,
} from './common'
import type { BoxProps } from './common'

const px = value => `${value}px`

export const Box = (_props: BoxProps) => {
  let props = _props
  let isChildABox = false

  try {
    isChildABox = React.Children.only(props.children).type === Box
  } catch (ex) {
    // React.Children.only throws an error if more than one child
  }

  if (isChildABox) {
    props = Object.assign({}, _props, React.Children.only(props.children).props)
  }

  const hasPosition =
    props.top != null || props.right != null || props.bottom != null || props.left != null

  // is it a spacing container?
  if (props.horizontal || props.stacked) {
    const flattenedChildren = React.Children.toArray(props.children)
    const spaceBetween = getSpaceBetween(props)

    const children = flattenedChildren.map(
      (child, index) =>
        child.props != null ? (
          <InternalBox
            key={index}
            fill={child.props.fill}
            w={child.props.w}
            h={child.props.h}
            __boxIsSpacingChild
            __boxParentSpaceBetween={spaceBetween}
            {...(child.type === Box ? child.props : {})}
          >
            {child.type === Box ? child.props.children : child}
          </InternalBox>
        ) : (
          <InternalBox key={index} __boxIsSpacingChild __boxParentSpaceBetween={spaceBetween}>
            {child}
          </InternalBox>
        ),
    )

    return (
      <StyledBox
        {...props}
        hasPosition={hasPosition}
        isSpacingContainer
        spaceBetween={spaceBetween}
      >
        {children}
      </StyledBox>
    )
  }

  return <StyledBox {...props} hasPosition={hasPosition} isSpacingContainer={false} />
}

const InternalBox: any = Box // for some reason we get inexact type incompatibility errors so we alias to any

const getResponsivePropValue = (propValue, breakpointIndex) => {
  if (!Array.isArray(propValue)) {
    if (breakpointIndex !== 0) return null

    return propValue
  }

  return propValue[breakpointIndex]
}

const calculatePosition = value => {
  if (value === true) {
    return 0
  } else if (value == null || value === false) {
    return undefined
  }

  return px(space(value))
}

const RESPONSIVE_PROP_SELECTOR = {
  w: value => ({ width: calculateSize(value) }),
  h: value => ({ height: calculateSize(value) }),
  top: value => ({ top: calculatePosition(value) }),
  right: value => ({ right: calculatePosition(value) }),
  bottom: value => ({ bottom: calculatePosition(value) }),
  left: value => ({ left: calculatePosition(value) }),
  order: value => ({ order: value }),
  visible: value => ({ display: value === true ? 'flex' : 'none' }),
}

const RESPONSIVE_PROPS = Object.keys(RESPONSIVE_PROP_SELECTOR)

const getValuesForResponsiveProps = (props, breakpointIndex) => {
  const style = {}

  for (const propName of RESPONSIVE_PROPS) {
    const propValue = props[propName]

    if (getResponsivePropValue(propValue, breakpointIndex) != null) {
      const propStyleSelector = RESPONSIVE_PROP_SELECTOR[propName]

      Object.assign(style, propStyleSelector(getResponsivePropValue(propValue, breakpointIndex)))
    }
  }

  return style
}

const mediaQueries = BREAKPOINTS.map(
  (size, breakpointIndex) =>
    css`
      @media (min-width: ${size}px) {
        ${props => getValuesForResponsiveProps(props, breakpointIndex + 1)};
      }
    `,
)

const getSpacingContainerStyle = props => {
  const style = {}

  const spaceBetweenPx = space(props.spaceBetween)

  const isHorizontal = props.horizontal

  style.flexDirection = isHorizontal ? 'row' : 'column'
  style.margin = `${px(-(spaceBetweenPx / 2))}`

  style.alignItems = computeAlignItems(props)
  style.justifyContent = computeJustifyContent(props)

  if (style.alignItems == null) delete style.alignItems
  if (style.justifyContent == null) delete style.justifyContent

  if (props.wrap) {
    style.flexWrap = 'wrap'
  }

  return style
}

const StyledBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  position: ${props => (props.hasPosition ? 'absolute' : 'relative')};
  box-sizing: border-box;

  ${props => props.isSpacingContainer && getSpacingContainerStyle};

  ${props =>
    props.__boxIsSpacingChild &&
    css`
      padding: ${props => px(space(props.__boxParentSpaceBetween) / 2)};
      flex-grow: ${props => (props.fill ? 1 : 0)};
    `};

  ${props => getValuesForResponsiveProps(props, 0)} ${mediaQueries};
`
