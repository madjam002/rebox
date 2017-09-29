import React from 'react'

export default props => (
  <div
    style={{
      flex: 1,
      flexBasis: 'auto',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      padding: 16,
      borderColor: 'rgba(0, 0, 0, 0.2)',
      borderWidth: 1,
      borderStyle: 'solid',
      fontSize: 32,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      textTransform: 'uppercase',
      color: 'rgba(0, 0, 0, 0.2)',
      boxSizing: 'border-box',
    }}
  >
    {props.label || '</>'}
  </div>
)
