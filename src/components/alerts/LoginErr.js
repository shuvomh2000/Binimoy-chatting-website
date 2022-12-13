import React from 'react'

const LoginErr = ({props}) => {
  return (
    <div className='bg-red px-[5px] py-[2px] rounded'>
        <h3 className='text-white font-normal font-nunito text-sm'>{props}</h3>
    </div>
  )
}

export default LoginErr