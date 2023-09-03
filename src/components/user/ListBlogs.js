import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';
import { appTheme } from '../layout/LayoutVariables';

function ListBlogs() {
  const [blogs, setBlogs] = useState([]);
  /* const [refresh,setRefresh] = useState(false) */
  const navto = useNavigate()
  /* const fetchData = async () => {
    const blogs = await instance.get("/posts").then((response) => {
      return response.data;
    })
    setBlogs(blogs);
    console.log("a", blogs);
  } */

  const getBlogs = ()=>{ 
    
    /* ref(db, 'posts/' + 0 );
    onValue(getBlogs, (snapshot) => {
    const data = snapshot.val()
    console.log('postElement', data);
  }) */

  //const userId = 'DzyeOEdcryaJlqn4sdPlm8mPL0o2'
  //const dbRef = ref(getDatabase())
  console.log('Hiiii')

  onValue(ref(db,"blogs/"), (snapshot) => {
    const data = snapshot.val()
    console.log(data)
    if(data!==null){
        Object.values(data).map((blog)=>{
          setBlogs((oldArr)=>[...oldArr,blog])
          console.log('blog');
          return 0
      })
    }
  })
  
  console.log(blogs);

  /* get(child(dbRef, `users/`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      const blogs = snapshot.val()
      //const array = Object.entries(blogs)
      //console.log(array);
      //setBlogs(blogs)
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  }) */

  /* dbRef.on("posts/", (snapshot) => {
    const data = snapshot.val();
    console.log('lk',data);
    // data is an array
  }) */

 }

  useEffect(() => {
    getBlogs()
    /* fetchData().catch((err)=>{
      if(err.code==='ERR_NETWORK'){
        console.log('JSON ERROR',err.code)
      }
    }) */
    //eslint-disable-next-line
  }, []);
  const onClick = (id)=>{
    //const lowercaseTitle = id.toLowerCase();
    //const urlId = lowercaseTitle.replace(/[^\w\s]/g, '-').replace(/\s+/g, '-')
    navto(`/view-blog/${id}`)
  }
  return (
    <div className='my-5'>
        <div className="flex justify-center">
        <div className="grid md:grid-cols-3 p-2 grid-cols-2 gap-2 md:gap-20">
        {blogs.map((blog) => {
          return (
            <div onClick={()=>onClick(blog.bid)} key={blog.bid} className="flex flex-row mt-1">
              <div className="w-[19rem] h-full mb-2 bg-teal-700 bg-inherit backdrop-blur-2xl bg-opacity-5 border border-teal-900 rounded-lg shadow-md hover:shadow-teal-600 hover:scale-95 duration-100">
                <div>
                  <img
                    className="rounded-t-lg h-52 w-full object-cover"
                    src={blog.image?blog.image:appTheme.noThumb}
                    alt="thumbnile"
                  />
                </div>
                <div className="p-3">
                 <div className='text-right'>
                    <p className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-gray-400 bg-teal-600 bg-opacity-20 rounded-md hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:hover:bg-teal-700 dark:focus:teal-blue-900">
                    {new Date(blog.date).getDay()} / { new Date(blog.date).getDate()} / { new Date(blog.date).getFullYear()}
                    </p>
                 </div>
                  <div className='text-left'>
                    <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-200 dark:text-black-600">
                      {blog.title}
                    </h5>
                  </div>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 w-full text-start overflow-hidden h-12">
                    {blog.content}
                  </p>
                  
                </div>
              </div>
                
            </div>
          );
        })}
        </div>
      </div>
    </div>
  )
}

export default ListBlogs