import { test } from 'screenie-cli'
import { testRoute } from './webdriver'

const elementByTest = test => ({ element: `[data-testname="${test}"]` })

test(
  'horizontal',
  testRoute('/horizontal', ({ capture }) => {
    capture('multiple children', elementByTest('horizontal multiple children'))

    capture('multiple children with fill', elementByTest('horizontal multiple children with fill'))

    capture(
      'multiple children main with right',
      elementByTest('horizontal multiple children main with right'),
    )

    capture('multiple child boxes', elementByTest('horizontal multiple child boxes'))

    capture(
      'multiple child boxes with two stacked',
      elementByTest('horizontal multiple child boxes with two stacked'),
    )

    capture(
      'multiple children with center vertical alignment',
      elementByTest('horizontal multiple children with center vertical alignment'),
    )

    capture(
      'multiple children with top vertical alignment',
      elementByTest('horizontal multiple children with top vertical alignment'),
    )

    capture(
      'multiple children with bottom vertical alignment',
      elementByTest('horizontal multiple children with bottom vertical alignment'),
    )

    capture(
      'multiple children with center horizontal alignment',
      elementByTest('horizontal multiple children with center horizontal alignment'),
    )

    capture(
      'multiple children with left horizontal alignment',
      elementByTest('horizontal multiple children with left horizontal alignment'),
    )

    capture(
      'multiple children with right horizontal alignment',
      elementByTest('horizontal multiple children with right horizontal alignment'),
    )

    capture(
      'multiple children with space around horizontal alignment',
      elementByTest('horizontal multiple children with space around horizontal alignment'),
    )

    capture(
      'multiple children with space between horizontal alignment',
      elementByTest('horizontal multiple children with space between horizontal alignment'),
    )

    capture(
      'children visibility at different breakpoints',
      elementByTest('horizontal children visibility at different breakpoints'),
    )
  }),
)

test(
  'horizontal columns',
  testRoute('/horizontal-columns', ({ capture }) => {
    capture(
      'with fixed widths on children',
      elementByTest('horizontal columns with fixed widths on children'),
    )

    capture(
      'with fixed widths on box children',
      elementByTest('horizontal columns with fixed widths on box children'),
    )

    capture('with responsive widths', elementByTest('horizontal columns with responsive widths'))

    capture(
      'with responsive widths with sparse array',
      elementByTest('horizontal columns with responsive widths with sparse array'),
    )

    capture(
      'with responsive widths with nulls in array',
      elementByTest('horizontal columns with responsive widths with nulls in array'),
    )

    capture(
      'reordering at different breakpoints',
      elementByTest('horizontal columns reordering at different breakpoints'),
    )

    capture(
      'visibility at different breakpoints',
      elementByTest('horizontal columns visibility at different breakpoints'),
    )
  }),
)

test(
  'stacked',
  testRoute('/stacked', ({ capture }) => {
    capture('multiple children', elementByTest('stacked multiple children'))

    capture(
      'multiple multiple children no spacing',
      elementByTest('stacked multiple children no spacing'),
    )

    capture(
      'multiple multiple children more spacing',
      elementByTest('stacked multiple children more spacing'),
    )

    capture(
      'multiple nested multiple children with different spacing',
      elementByTest('stacked nested multiple children with different spacing'),
    )

    capture('multiple children with fill', elementByTest('stacked multiple children with fill'))

    capture(
      'stacked children with center alignment with horizontal',
      elementByTest('stacked children with center alignment with horizontal'),
    )

    capture(
      'stacked children with left alignment with horizontal',
      elementByTest('stacked children with left alignment with horizontal'),
    )

    capture(
      'stacked children with right alignment with horizontal',
      elementByTest('stacked children with right alignment with horizontal'),
    )
  }),
)
test(
  'stacked alignment',
  testRoute('/stacked-alignment', ({ capture }) => {
    capture(
      'stacked children with top vertical alignment',
      elementByTest('stacked children with top vertical alignment'),
    )

    capture(
      'stacked children with center vertical alignment',
      elementByTest('stacked children with center vertical alignment'),
    )

    capture(
      'stacked children with bottom vertical alignment',
      elementByTest('stacked children with bottom vertical alignment'),
    )

    capture(
      'stacked children with space around vertical alignment',
      elementByTest('stacked children with space around vertical alignment'),
    )

    capture(
      'stacked children with space between vertical alignment',
      elementByTest('stacked children with space between vertical alignment'),
    )
  }),
)

test(
  'standalone',
  testRoute('/standalone', ({ capture }) => {
    capture('fill all available space', elementByTest('standalone fill all available space'))
  }),
)

test(
  'position',
  testRoute('/position', ({ capture }) => {
    capture('position top left', elementByTest('position top left'))

    capture('position top right', elementByTest('position top right'))

    capture('position bottom left', elementByTest('position bottom left'))

    capture('position bottom right', elementByTest('position bottom right'))

    capture('position top left with space', elementByTest('position top left with space'))

    capture('position top left with more space', elementByTest('position top left with more space'))

    capture('position responsive', elementByTest('position responsive'))
  }),
)
