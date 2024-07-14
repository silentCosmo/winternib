import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { userState } from '../../redux/blogSlice'; 
import { appName } from './LayoutVariables';

function NavBar() {
  const loggedIn = useSelector((state)=>state.blogs.user)
  const dispatch = useDispatch()
  const navto = useNavigate()
  const [menuToggle,setMenuToggle] = useState(false)

  useEffect(()=>{
    const auth = JSON.parse(localStorage.getItem('auth'))
    if(auth){
      dispatch(userState(auth))
    }
  },[dispatch])

  const logOut = ()=>{
    localStorage.removeItem('auth')
    dispatch(userState(false))
    navto('/login')
    handleMenu()
  }
  const handleMenu = (select)=>{
    if(select==='manage'){navto('blog-management')}
    if(select==='login'){navto('login')}
    setMenuToggle(!menuToggle)
  }

  return (
    <div className='sticky top-0 p-3 z-20 h-full w-full bg-transparent shadow-cyan-900 shadow-sm rounded-b-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50'>
      <header className='flex flex-col justify-between mx-3'>
        <div className='flex-row flex justify-between'>
          <NavLink to={'/'} className='text-cyan-600 text-2xl font-semibold'>{appName}</NavLink>
          <div className='text-cyan-500 opacity-90 hover:animate-pulse animate-spin-slow text-2xl' onClick={handleMenu}>&#10052;</div>
        </div>
        <div className={`bg-cyan-950 rounded-md border border-cyan-700 backdrop-blur-xl bg-opacity-20 top- right- mt-4 w-[99%] mr-[0.5%] ${menuToggle?'':'hidden'}`}>

          { loggedIn?
          <div className=" flex-row flex">
            <div className=''>
              <div to={'/blog-management'} onClick={()=>handleMenu('manage')} className='hover:bg-cyan-900 w-[45vw] border-red-600 hover:bg-opacity-50 text-cyan-200 hover:text-cyan-100 px-2 py-2'>ManageBlogs</div>
            </div>
            <div>
              <button onClick={logOut} className='hover:bg-cyan-900 border-l border-cyan-700 hover:bg-opacity-50 w-[45vw] md:w-[50.3vw] text-cyan-200 hover:text-red-100 px-2 py-2'>LogOut</button>
            </div>
          </div>
          :
          <div className='mt-'>
            <button onClick={()=>handleMenu('login')} className='px-2 py-2 w-full rounded-md hover:bg-cyan-900 text-cyan-400 bg-clip-padding backdrop-filter backdrop-blur-sm hover:bg-opacity-30'>LogIn</button>
          </div> 
          }
        </div>
      </header>
    </div>
  )
}

export default NavBar
