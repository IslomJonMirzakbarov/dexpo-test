import React from 'react'

const NProgressContainer = ({ animationDuration, children, isFinished }) => (
  <div
    style={{
      opacity: isFinished ? 0 : 1,
      pointerEvents: 'none',
      transition: `opacity ${animationDuration}ms linear`
    }}
  >
    {children}
  </div>
)

export default NProgressContainer
