import { child, get, getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';

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

  onValue(ref(db,"blogs/"), (snapshot) => {
    const data = snapshot.val()
    console.log(data)
    if(data!==null){
        Object.values(data).map((blog)=>{
          setBlogs((oldArr)=>[...oldArr,blog])
          console.log(blog);
          
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
  }, []);
  const onClick = (id)=>{
    navto(`/view-blog/${id}`)
  }
  return (
    <div className='my-5'>
        <div className="flex justify-center">
        <div className="grid md:grid-cols-3 p-2 grid-cols-2 gap-2 md:gap-20">
        {blogs.map((blog) => {
          return (
            <div onClick={()=>onClick(blog.id)} key={blog.id} className="flex flex-row mt-1">
              <div className="w-[19rem] h-full mb-2 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-teal-200 hover:scale-95 duration-100">
                <div>
                  <img
                    className="rounded-t-lg h-52 w-full object-cover bg-zinc-50"
                    src={blog.image}
                    alt=""
                  />
                </div>
                <div className="p-3">
                 <div className='text-right'>
                    <p className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-teal-500 rounded-sm hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:hover:bg-teal-700 dark:focus:teal-blue-900">
                    {blog.id}
                    </p>
                 </div>
                  <div className='text-left'>
                    <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-black-600">
                      {blog.title}
                    </h5>
                  </div>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-600 w-full text-start overflow-hidden h-12">
                    {blog.description}
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