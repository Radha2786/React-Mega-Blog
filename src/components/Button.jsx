import React from 'react'

function Button({
    children,
    type='button',
    bgColor='bg-purple-600',
    textColor='text-white',
    className='',
    ...props // ho skta ho kuch aur properties bheji ho
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button