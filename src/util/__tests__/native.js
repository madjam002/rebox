/* eslint-env jest */

import { getCurrentValueForResponsiveProp } from '../native'

export const BREAKPOINTS = [767, 991, 1199, 1300]

describe('getCurrentValueForResponsiveProp', () => {
  it('should return single scalar value if scalar value is provided', () => {
    const dummyWindowWidth = 300

    expect(getCurrentValueForResponsiveProp(500, dummyWindowWidth, BREAKPOINTS)).toEqual(500)
  })

  it('should return the correct value for responsive prop', () => {
    expect(getCurrentValueForResponsiveProp([500, 600, 700, 800], 300, BREAKPOINTS)).toEqual(500)
    expect(getCurrentValueForResponsiveProp([500, 600, 700, 800], 800, BREAKPOINTS)).toEqual(600)
    expect(getCurrentValueForResponsiveProp([500, 600, 700, 800], 1100, BREAKPOINTS)).toEqual(700)
    expect(getCurrentValueForResponsiveProp([500, 600, 700, 800], 1200, BREAKPOINTS)).toEqual(800)
    expect(getCurrentValueForResponsiveProp([500, 600, 700, 800], 1600, BREAKPOINTS)).toEqual(800)
  })

  it('should return the correct value for responsive prop as sparse array', () => {
    expect(getCurrentValueForResponsiveProp([500, , , 800], 300, BREAKPOINTS)).toEqual(500)
    expect(getCurrentValueForResponsiveProp([500, , , 800], 800, BREAKPOINTS)).toEqual(500)
    expect(getCurrentValueForResponsiveProp([500, , , 800], 1100, BREAKPOINTS)).toEqual(500)
    expect(getCurrentValueForResponsiveProp([500, , , 800], 1200, BREAKPOINTS)).toEqual(800)
    expect(getCurrentValueForResponsiveProp([500, , , 800], 1600, BREAKPOINTS)).toEqual(800)
  })

  it('should return the correct value for responsive prop as array with nulls', () => {
    expect(getCurrentValueForResponsiveProp([500, null, null, 800], 300, BREAKPOINTS)).toEqual(500)
    expect(getCurrentValueForResponsiveProp([500, null, null, 800], 800, BREAKPOINTS)).toEqual(500)
    expect(getCurrentValueForResponsiveProp([500, null, null, 800], 1100, BREAKPOINTS)).toEqual(500)
    expect(getCurrentValueForResponsiveProp([500, null, null, 800], 1200, BREAKPOINTS)).toEqual(800)
    expect(getCurrentValueForResponsiveProp([500, null, null, 800], 1600, BREAKPOINTS)).toEqual(800)
  })

  it('should return the correct value for responsive prop with only a few values', () => {
    expect(getCurrentValueForResponsiveProp([500, 800], 300, BREAKPOINTS)).toEqual(500)
    expect(getCurrentValueForResponsiveProp([500, 800], 800, BREAKPOINTS)).toEqual(800)
    expect(getCurrentValueForResponsiveProp([500, 800], 1100, BREAKPOINTS)).toEqual(800)
    expect(getCurrentValueForResponsiveProp([500, 800], 1200, BREAKPOINTS)).toEqual(800)
    expect(getCurrentValueForResponsiveProp([500, 800], 1600, BREAKPOINTS)).toEqual(800)
  })
})
