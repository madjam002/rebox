/* @flow */

export const getCurrentValueForResponsiveProp: any = (value, windowWidth, breakpoints) => {
  if (!Array.isArray(value)) {
    // value is scalar value so it will be the same across breakpoints
    return value
  }

  let currentBreakpointIndex = breakpoints.length - 1

  for (let i = 0; i < breakpoints.length; i++) {
    if (windowWidth < breakpoints[i]) {
      currentBreakpointIndex = i
      break
    }
  }

  if (currentBreakpointIndex == null) return null

  if (currentBreakpointIndex > value.length - 1) {
    return getLastNonNullValue(value, value.length - 1)
  }

  return getLastNonNullValue(value, currentBreakpointIndex)
}

function getLastNonNullValue(array, startIndex) {
  if (array[startIndex] == null) {
    if (startIndex - 1 < 0) return null

    return getLastNonNullValue(array, startIndex - 1)
  }

  return array[startIndex]
}
