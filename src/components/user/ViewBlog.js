import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ViewBlog() {
    const id = useParams()
    const [blog,setBlog] = useState({})
    const fetchData = async (id) => {
        /* const blog = await instance.get(`/posts/${id.id}`).then((response) => {
          return response.data;
        });
        setBlog(blog);
        console.log("a", blog); */
        setBlog([{title:'dgu',keyword:'sdfsf', dedescription:'shagdtgytsdftsyafdtyafsdtygtasy',image:'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'}
        ,{title:'dgu',keyword:'sdfsf', dedescription:'shagdtgytsdftsyafdtyafsdtygtasy',image:'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'}])
      };
      useEffect(()=>{
        fetchData(id)
      },[id])

  return (
    <div className={`p-5 min-h-[100vh]`} style={{backgroundImage: `url(${blog.image})`}}>
        <div className='pb-5 justify-center bg-teal-300 border-teal-200 border bg-clip-padding backdrop-filter backdrop-blur-xl text-lg bg-opacity-10'>
        <h1 className='my-5 font-bold text-4xl text-teal-100 drop-shadow-md'>{blog.title}</h1>
        <div className='flex justify-center'>
        <img className='max-h-80 rounded-md'
         src={blog.image} alt='Blog Img'/>
        </div>
        <div className='flex justify-center'>
        <hr className='mt-6 w-[87.5vw] border border-teal-200'/> 
        </div>
        <div className='mt-3 px-16'>
          <p className='whitespace-break-spaces text-justify text-white drop-shadow-md'>{blog.description}</p>
          <h1>{blog.keyword}</h1>
        </div>
        </div>
    </div>
  )
}

export default ViewBlog