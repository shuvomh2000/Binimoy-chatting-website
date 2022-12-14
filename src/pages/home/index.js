import React from 'react'
import {NavLink} from 'react-router-dom'
import Sidebar from '../../components/Sidebar'


const Home = () => {
  return (
    <div className='flex justify-between'>
      <div className='w-[14%]'>
        <Sidebar active="home"/>
      </div>
      <div className='w-[84%]'>
        <button>
          <NavLink to='/login'>
            go to register
          </NavLink>
        </button>
      </div>
    </div>
    
  )
}

export default Home