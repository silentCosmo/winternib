import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { user } from '../../redux/blogSlice'; 
import { appName } from './LayoutVariables';

function NavBar() {
  const loggedIn = useSelector((state)=>state.blogs.user)
  const dispatch = useDispatch()
  const navto = useNavigate()

  const logOut = ()=>{
    const auth = false
    sessionStorage.setItem('auth',auth)
    dispatch(user(false))
    navto('/login')
  }
  return (
    <div className='sticky top-0 p-3 z-20 h-full w-full bg-teal-300 shadow-teal-200 shadow-sm rounded-b-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
        <header className='flex flex-row justify-between mx-3'>
        <div>
          <NavLink to={'/'} className='text-teal-600 text-3xl font-bold'>{appName}</NavLink>
        </div>
        { loggedIn?
        <>
          <div>
            <NavLink to={'/blog-management'} className='bg-teal-400 hover:bg-teal-500 border border-teal-600 text-indigo-950 px-2 py-1'>ManageBlogs</NavLink>
          </div>
        <div>
          <button onClick={logOut} className='bg-red-400 hover:bg-red-500 border border-red-600 text-indigo-950 px-2 py-1'>LogOut</button>
        </div>
        </>
        :
        <div>
          <NavLink to={'/login'} className='bg-teal-400 hover:bg-teal-500 border border-teal-500 text-teal-950 px-2 py-1 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30'>LogIn</NavLink>
        </div>
        }
      </header>
    </div>
  )
}

export default NavBar