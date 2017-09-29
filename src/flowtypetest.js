/* @flow */
/* prettier-ignore */

import React from 'react'
import { Box } from './web'

const test = (tree: any) => {}

// valid usage
test(<Box horizontal />)
test(<Box stacked />)
test(
  <Box horizontal>
    <div />
    <div />
  </Box>,
)
test(
  <Box stacked>
    <div />
    <div />
  </Box>,
)
test(
  <Box>
    <div />
  </Box>
)

test(<Box horizontal spaceBetween={5}><div /><div /></Box>)
test(<Box horizontal hAlign="left"><div /><div /></Box>)
test(<Box horizontal vAlign="top"><div /><div /></Box>)

test(<Box stacked spaceBetween={5}><div /><div /></Box>)
test(<Box stacked hAlign="left"><div /><div /></Box>)
test(<Box stacked vAlign="top"><div /><div /></Box>)

test(<Box horizontal hAlign="spaceAround"><div /><div /></Box>)
test(<Box stacked vAlign="spaceAround"><div /><div /></Box>)

// $ExpectError test unknown prop
test(<Box foo="bar" />)

// $ExpectError multiple children for non spacing container
test(<Box><div /><div /></Box>)

// $ExpectError spaceBetween for non spacing container
test(<Box spaceBetween={5}><div /></Box>)

// $ExpectError alignment for non spacing container
test(<Box vAlign="top"><div /></Box>)

// $ExpectError alignment for non spacing container
test(<Box hAlign="top"><div /></Box>)

// $ExpectError invalid alignment
test(<Box horizontal hAlign="blah"><div /><div /></Box>)

// $ExpectError spaceAround for align items when horizontal
test(<Box horizontal vAlign="spaceAround"><div /><div /></Box>)

// $ExpectError spaceAround for align items when stacked
test(<Box stacked hAlign="spaceAround"><div /><div /></Box>)
