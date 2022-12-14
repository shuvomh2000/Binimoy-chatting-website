import React from 'react'
import Sidebar from '../Sidebar'

const Message = () => {
  return (
    <div className='flex justify-between'>
      <div className='w-[14%]'>
        <Sidebar active="message"/>
      </div>
      <div className='w-[84%]'></div>
    </div>
  )
}

export default Message