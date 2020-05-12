import React from 'react'

const Avatar = ({ image, alt }) => {
  return (
    <img 
      src={image} 
      alt={alt}
      style={{
        borderRadius: '50%',
        width: `40px`
      }}
    />
  )
}

export default Avatar;