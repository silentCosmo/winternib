import './App.css';
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import BlogManagement from './components/admin/BlogManagement';
import AddBlog from './components/admin/AddBlog';
import Home from './components/user/Home';
import ViewBlog from './components/user/ViewBlog';
import EditBlog from './components/admin/EditBlog';
import LogIn from './components/user/LogIn';
import SignUp from './components/user/SignUp';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
//import { bg } from './redux/blogSlice';
import { appTheme } from './components/layout/LayoutVariables';

function App() {
  //const [auth,setAuth] = useState(false)
  //const disp = useDispatch()
  const auth = useSelector((state)=>state.blogs.user)
  const bgIm = useSelector((state)=>state.blogs.bg)

  useEffect(()=>{
    /* const auth = localStorage.getItem('auth')
    console.log('pa',JSON.parse(auth))
    if(auth){
      setAuth(true)
      disp(user(true))
    } */
  },[])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <><NavBar/><Outlet/><Footer/></>,
      children:[
    {
      path: '/',
      element: <><Home/></>,
    },
    {
      path: '/blog-management',
      element: auth? <BlogManagement/> :<Navigate to='/'/>,
    },
    {
      path: '/add-blog',
      element: <AddBlog/>
    },
    {
      path: '/view-blog/:id',
      element: <ViewBlog/>
    },
    {
      path: '/edit-blog/:id',
      element: <EditBlog/>
    },
    {
      path: '/login',
      element: <LogIn/>
    },
    {
      path: '/signup',
      element: <SignUp/>
    },
    ]}
  ])

  return (
    <div className="App bg-zinc-50" style={{ backgroundImage: `url(${bgIm?bgIm:appTheme.appBg})`, backgroundRepeat: 'round' }} >
      <div className=' backdrop-blur-md'>
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
