import React,{useEffect} from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {


  return (
    <>
    <Outlet/>
    </>
  )
}

export default RootLayout