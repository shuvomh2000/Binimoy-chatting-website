import React from 'react'
import {NavLink} from 'react-router-dom'


const Home = () => {
  return (
    <div>
      <button>
        <NavLink to='/login'>
        go to login
        </NavLink>
        </button>
    </div>
    
  )
}

export default Home