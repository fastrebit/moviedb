import React from 'react'

const MyRating = ({ rating }) => {
  const formattedRating = rating.toFixed(1)
  let borderColor = '#E90000'
  if (rating > 3 && rating <= 5) borderColor = '#E97E00'
  if (rating > 5 && rating <= 7) borderColor = '#E9D100'
  if (rating > 7 && rating <= 10) borderColor = '#66E900'
  return (
    <div style={{ border: `2px solid ${borderColor}`, borderRadius: '50%', padding: '5px' }}>{formattedRating}</div>
  )
}

export default MyRating
