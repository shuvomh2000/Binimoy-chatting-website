import React from 'react'
import Sidebar from '../Sidebar'

const Setting = () => {
  return (
    <div className='flex justify-between'>
    <div className='w-[14%]'>
      <Sidebar active="setting"/>
    </div>
    <div className='w-[84%]'></div>
  </div>
  )
}

export default Setting