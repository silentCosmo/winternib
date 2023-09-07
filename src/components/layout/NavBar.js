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

  //useEffect(()=>{setUserIn(true)},[loggedIn])

  useEffect(()=>{
    const auth = JSON.parse(localStorage.getItem('auth'))
    //console.log('pa',JSON.parse(auth))
    if(auth){
      dispatch(userState(auth))
    }
  },[dispatch])

  const logOut = ()=>{
    //const auth = false
    localStorage.removeItem('auth')
    dispatch(userState(false))
    navto('/login')
    handleMenu()
  }
  const handleMenu = (select)=>{
    if(select==='manage'){navto('blog-management')}
    setMenuToggle(!menuToggle)
  }
  /* const [toggle,setToggle] = useState(false)
  const themeMode = ()=>{
    setToggle(!toggle)
    dispatch(theme(toggle))
    
  } */

  return (
    <div className='sticky top-0 p-3 z-20 h-full w-full bg-teal-300 shadow-teal-600 shadow-sm rounded-b-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
        <header className='flex flex-row justify-between mx-3'>
        <div>
          <NavLink to={'/'} className='text-teal-500 text-3xl font-bold'>{appName}</NavLink>
          {/* <button onClick={themeMode}>Dark</button> = Theme change beta*/}
        </div>
        {/* </header>{ loggedIn? */}
        


          <div className='text-teal-500 hover:animate-bounce text-2xl animate-spin-slow' onClick={handleMenu}>&#10052;</div>
          <div className={`bg-teal-950 rounded-md border border-teal-700 backdrop-blur-xl bg-opacity-20 absolute top-0 right-0 mt-16 w-[99%] mr-[0.5%] ${menuToggle?'':'hidden'}`}>

          { loggedIn?
          <div className=" flex-row w-screen flex">
           <div className=''>
            <div to={'/blog-management'} onClick={()=>handleMenu('manage')} className='hover:bg-teal-900 w-[49vw] border-red-600 hover:bg-opacity-50 text-teal-200 hover:text-teal-100 px-2 py-2'>ManageBlogs</div>
          </div>
          <div>
            <button onClick={logOut} className='hover:bg-teal-900 border-l border-teal-700 hover:bg-opacity-50 w-[49vw] text-teal-200 hover:text-red-100 px-2 py-2'>LogOut</button>
          </div>
        </div>
        :
        <div className='mt-'>
          <NavLink to={'/login'} onClick={handleMenu} className='px-2 py-1 bg-teal-400 hover:bg-teal-500 border border-teal-500 text-teal-950 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30'>LogIn</NavLink>
        </div> 
        
        }

        {/* <div className='mt-1'>
            <NavLink to={'/blog-management'} className='bg-teal-950 rounded-md hover:bg-teal-900 border border-teal-600 bg-opacity-60 text-teal-200 hover:text-teal-100 px-2 py-2'>ManageBlogs</NavLink>
          </div>
        <div>
          <button onClick={logOut} className='bg-red-800 rounded-md hover:bg-red-800 border border-red-600 bg-opacity-60 text-red-100 hover:text-red-50 px-2 py-1'>LogOut</button>
        </div>
        </div>
        :
        <div className='mt-1'>
          <NavLink to={'/login'} className='px-2 py-1 bg-teal-400 hover:bg-teal-500 border border-teal-500 text-teal-950 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30'>LogIn</NavLink>
        </div>  */}

        </div>
      </header>
      {/* <div className={`border border-yellow-400 ${menuToggle?'':'hidden'}`}>
            <li>Item1</li>
            <li>Item2</li>
            <li>Item3</li>
          </div> */}
    </div>
  )
}

export default NavBar