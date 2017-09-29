/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'
import { Box } from '../web'

it('should render when some of the children are null', () => {
  const tree = renderer.create(
    <Box horizontal>
      <div />
      {null}
      <span />
    </Box>,
  )

  expect(tree).toMatchSnapshot()
})

it('should render when some of the children are strings', () => {
  const tree = renderer.create(
    <Box horizontal>
      <div />
      I am a string!
      <span />
    </Box>,
  )

  expect(tree).toMatchSnapshot()
})
