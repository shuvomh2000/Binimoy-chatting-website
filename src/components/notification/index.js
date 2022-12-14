import React from 'react'
import Sidebar from '../Sidebar'

const Notification = () => {
  return (
    <div className='flex justify-between'>
      <div className='w-[14%]'>
        <Sidebar active="notification"/>
      </div>
      <div className='w-[84%]'></div>
    </div>
  )
}

export default Notification