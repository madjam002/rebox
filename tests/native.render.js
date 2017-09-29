/* @flow */

import React from 'react'
import { Box } from '../src/native'

import DebugBox from './debug-box'

const Test = ({ name, height, children }: any) => (
  <div style={{ display: 'flex', flexDirection: 'column', height }}>
    <h3>{name}</h3>

    <div
      style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}
      data-testname={name}
    >
      {children}
    </div>
  </div>
)

export const Horizontal = () => (
  <div>
    <Test name="horizontal multiple children">
      <Box horizontal>
        <DebugBox />
        <DebugBox />
        <DebugBox />
      </Box>
    </Test>

    <Test name="horizontal multiple children with fill">
      <Box horizontal>
        <DebugBox />
        <DebugBox fill />
        <DebugBox />
      </Box>
    </Test>

    <Test name="horizontal multiple children main with right">
      <Box horizontal>
        <DebugBox fill />
        <DebugBox />
      </Box>
    </Test>

    <Test name="horizontal multiple child boxes">
      <Box horizontal>
        <Box>
          <DebugBox />
        </Box>
        <Box stacked>
          <DebugBox />
          <DebugBox />
        </Box>
        <Box>
          <DebugBox />
        </Box>
      </Box>
    </Test>

    <Test name="horizontal multiple child boxes with two stacked">
      <Box horizontal>
        <Box stacked>
          <DebugBox />
        </Box>
        <Box stacked>
          <DebugBox />
          <DebugBox />
        </Box>
        <Box>
          <DebugBox />
        </Box>
      </Box>
    </Test>

    <Test name="horizontal multiple children with center vertical alignment">
      <Box horizontal vAlign="center">
        <DebugBox />
        <DebugBox h={130} />
        <DebugBox />
        <Box stacked>
          <DebugBox />
          <DebugBox h={130} />
        </Box>
        <DebugBox />
      </Box>

      <hr />

      <Box horizontal vAlign="center">
        <DebugBox />
        <DebugBox h={300} />
        <DebugBox />
        <Box stacked>
          <DebugBox />
          <DebugBox h={130} />
        </Box>
        <DebugBox />
      </Box>
    </Test>

    <Test name="horizontal multiple children with top vertical alignment">
      <Box horizontal vAlign="top">
        <DebugBox />
        <DebugBox h={130} />
        <DebugBox />
        <Box stacked>
          <DebugBox />
          <DebugBox h={130} />
        </Box>
        <DebugBox />
      </Box>
    </Test>

    <Test name="horizontal multiple children with bottom vertical alignment">
      <Box horizontal vAlign="bottom">
        <DebugBox />
        <DebugBox h={130} />
        <DebugBox />
        <Box stacked>
          <DebugBox />
          <DebugBox h={130} />
        </Box>
        <DebugBox />
      </Box>
    </Test>

    <Test name="horizontal multiple children with center horizontal alignment">
      <Box horizontal hAlign="center">
        <DebugBox />
        <Box stacked>
          <DebugBox />
          <DebugBox h={130} />
        </Box>
        <DebugBox h={130} />
      </Box>
    </Test>

    <Test name="horizontal multiple children with left horizontal alignment">
      <Box horizontal hAlign="left">
        <DebugBox />
        <Box stacked>
          <DebugBox />
          <DebugBox h={130} />
        </Box>
        <DebugBox h={130} />
      </Box>
    </Test>

    <Test name="horizontal multiple children with right horizontal alignment">
      <Box horizontal hAlign="right">
        <DebugBox />
        <Box stacked>
          <DebugBox />
          <DebugBox h={130} />
        </Box>
        <DebugBox h={130} />
      </Box>
    </Test>

    <Test name="horizontal multiple children with space around horizontal alignment">
      <Box horizontal hAlign="spaceAround">
        <DebugBox />
        <Box stacked>
          <DebugBox />
          <DebugBox h={130} />
        </Box>
        <DebugBox h={130} />
      </Box>
    </Test>

    <Test name="horizontal multiple children with space between horizontal alignment">
      <Box horizontal hAlign="spaceBetween">
        <DebugBox />
        <Box stacked>
          <DebugBox />
          <DebugBox h={130} />
        </Box>
        <DebugBox h={130} />
      </Box>
    </Test>
  </div>
)

export const HorizontalColumns = () => (
  <div>
    <Test name="horizontal columns with fixed widths on children">
      <Box stacked>
        <Box horizontal>
          <DebugBox w={1 / 12} />
          <DebugBox w={11 / 12} />
        </Box>
        <Box horizontal>
          <DebugBox w={2 / 12} />
          <DebugBox w={10 / 12} />
        </Box>
        <Box horizontal>
          <DebugBox w={3 / 12} />
          <DebugBox w={9 / 12} />
        </Box>
        <Box horizontal>
          <DebugBox w={4 / 12} />
          <DebugBox w={8 / 12} />
        </Box>
        <Box horizontal>
          <DebugBox w={5 / 12} />
          <DebugBox w={7 / 12} />
        </Box>
        <Box horizontal>
          <DebugBox w={6 / 12} />
          <DebugBox w={6 / 12} />
        </Box>
        <Box horizontal>
          <DebugBox w={7 / 12} />
          <DebugBox w={5 / 12} />
        </Box>
        <Box horizontal>
          <DebugBox w={8 / 12} />
          <DebugBox w={4 / 12} />
        </Box>
        <Box horizontal>
          <DebugBox w={9 / 12} />
          <DebugBox w={3 / 12} />
        </Box>
        <Box horizontal>
          <DebugBox w={10 / 12} />
          <DebugBox w={2 / 12} />
        </Box>
        <Box horizontal>
          <DebugBox w={11 / 12} />
          <DebugBox w={1 / 12} />
        </Box>
        <Box horizontal>
          <DebugBox w={1 / 12} />
          <DebugBox w={9 / 12} />
          <DebugBox w={2 / 12} />
        </Box>
      </Box>
    </Test>

    <Test name="horizontal columns with fixed widths on box children">
      <Box stacked>
        <Box horizontal>
          <Box w={1 / 12}>
            <DebugBox />
          </Box>
          <Box w={11 / 12}>
            <DebugBox />
          </Box>
        </Box>
        <Box horizontal>
          <Box w={1 / 12}>
            <DebugBox />
          </Box>
          <Box w={9 / 12}>
            <DebugBox />
          </Box>
          <Box w={2 / 12}>
            <DebugBox />
          </Box>
        </Box>
      </Box>
    </Test>

    <Test name="horizontal columns with responsive widths">
      <Box stacked>
        <Box horizontal wrap>
          <DebugBox w={[12 / 12, 3 / 12]} />
          <DebugBox w={[12 / 12, 9 / 12]} />
        </Box>
        <Box horizontal>
          <DebugBox w={[3 / 12, 4 / 12, 5 / 12]} />
          <DebugBox w={[9 / 12, 8 / 12, 7 / 12]} />
        </Box>
      </Box>
    </Test>
  </div>
)

export const Stacked = () => (
  <div>
    <Test name="stacked multiple children" height={500}>
      <Box stacked>
        <DebugBox />
        <DebugBox />
        <DebugBox />
        <DebugBox />
      </Box>
    </Test>

    <Test name="stacked multiple children no spacing">
      <Box stacked noSpaceBetween>
        <DebugBox />
        <DebugBox />
        <DebugBox />
        <DebugBox />
      </Box>
    </Test>

    <Test name="stacked multiple children more spacing">
      <Box stacked spaceBetween={2}>
        <DebugBox />
        <DebugBox />
        <DebugBox />
        <DebugBox />
      </Box>

      <hr />

      <Box stacked spaceBetween={3}>
        <DebugBox />
        <DebugBox />
        <DebugBox />
        <DebugBox />
      </Box>
    </Test>

    <Test name="stacked nested multiple children with different spacing">
      <Box stacked>
        <DebugBox label="Outside" />
        <DebugBox label="Outside" />
        <Box stacked spaceBetween={3}>
          <DebugBox label="Nested" />
          <DebugBox label="Nested" />
          <DebugBox label="Nested" />
        </Box>
        <DebugBox label="Outside" />
      </Box>
    </Test>

    <Test name="stacked multiple children with fill" height={500}>
      <Box stacked>
        <DebugBox />
        <DebugBox fill />
        <DebugBox />
      </Box>
    </Test>

    <Test name="stacked children with center alignment with horizontal" height={600}>
      <Box stacked hAlign="center" vAlign="center">
        <Box w={250} h={250}>
          <DebugBox />
        </Box>
        <Box horizontal>
          <DebugBox w={200} />
          <DebugBox />
        </Box>
      </Box>
    </Test>

    <Test name="stacked children with left alignment with horizontal" height={600}>
      <Box stacked hAlign="left" vAlign="center">
        <Box w={250} h={250}>
          <DebugBox />
        </Box>
        <Box horizontal>
          <DebugBox w={200} />
          <DebugBox />
        </Box>
      </Box>
    </Test>

    <Test name="stacked children with right alignment with horizontal" height={600}>
      <Box stacked hAlign="right" vAlign="center">
        <Box w={250} h={250}>
          <DebugBox />
        </Box>
        <Box horizontal>
          <DebugBox w={200} />
          <DebugBox />
        </Box>
      </Box>
    </Test>
  </div>
)

export const StackedAlignment = () => (
  <div>
    <Test name="stacked children with top vertical alignment" height={500}>
      <Box stacked vAlign="top">
        <DebugBox />
        <DebugBox />
        <DebugBox />
        <DebugBox />
      </Box>
    </Test>

    <Test name="stacked children with center vertical alignment" height={500}>
      <Box stacked vAlign="center">
        <DebugBox />
        <DebugBox />
        <DebugBox />
        <DebugBox />
      </Box>
    </Test>

    <Test name="stacked children with bottom vertical alignment" height={500}>
      <Box stacked vAlign="bottom">
        <DebugBox />
        <DebugBox />
        <DebugBox />
        <DebugBox />
      </Box>
    </Test>

    <Test name="stacked children with space around vertical alignment" height={500}>
      <Box stacked vAlign="spaceAround">
        <DebugBox />
        <DebugBox />
        <DebugBox />
        <DebugBox />
      </Box>
    </Test>

    <Test name="stacked children with space between vertical alignment" height={500}>
      <Box stacked vAlign="spaceBetween">
        <DebugBox />
        <DebugBox />
        <DebugBox />
        <DebugBox />
      </Box>
    </Test>
  </div>
)

export const Standalone = () => (
  <div>
    <Test name="standalone fill all available space" height={500}>
      <Box>
        <DebugBox />
      </Box>
    </Test>
  </div>
)

export const Position = () => (
  <div>
    <Test name="position top left" height={500}>
      <Box top left w={150} h={150}>
        <DebugBox />
      </Box>
    </Test>

    <Test name="position top right" height={500}>
      <Box top right w={150} h={150}>
        <DebugBox />
      </Box>
    </Test>

    <Test name="position bottom left" height={500}>
      <Box bottom left w={150} h={150}>
        <DebugBox />
      </Box>
    </Test>

    <Test name="position bottom right" height={500}>
      <Box bottom right w={150} h={150}>
        <DebugBox />
      </Box>
    </Test>

    <Test name="position top left with space" height={500}>
      <Box top={1} left={1} w={150} h={150}>
        <DebugBox />
      </Box>
    </Test>

    <Test name="position top left with more space" height={500}>
      <Box top={2} left={4} w={150} h={150}>
        <DebugBox />
      </Box>
    </Test>

    <Test name="position responsive" height={500}>
      <Box top={[0, 3, 4]} right={[0, 3, 4]} bottom={[0, 3, 4]} left={[0, 3, 4]}>
        <DebugBox />
      </Box>
    </Test>
  </div>
)
