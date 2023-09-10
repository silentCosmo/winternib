import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import FileBase64 from 'react-file-base64'
import { edit } from '../../redux/blogSlice';
import { onValue, ref } from 'firebase/database';
import { db } from '../../firebase/config';

function EditBlog() {
    const id = useParams()
    console.log(id,'id');
    const data = useSelector((state)=>state.blogs)
    console.log(data);
    const [blog,setBlog] = useState({})
    const fetchData = async (id) => {
      onValue(ref(db,"blogs/"+id), (snapshot) => {
        const data = snapshot.val()
        console.log(data)
        if(data!==null){
            setBlog(data)
              
        }
        })
      };
      useEffect(()=>{
        fetchData(id.id)
      },[id])

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let initialValues = {
        bid:blog.bid,
        cid:blog.cid,
        title: blog.title,
        content: blog.content,
        keywords: blog.keywords,
        image: blog.image,
    };
    console.log('iv',initialValues);
/* 
    const [onEdit,setOnEdit] = useState({})

    console.log('sv',onEdit); */
  
    const onFormSubmit = (e) => {
      e.preventDefault();
      console.log(blog);
      dispatch(edit(initialValues));
      navigate("/blog-management");
    }

  return (
    <div className="h-screen text-teal-200 p-5">
      <h3 className='mb-2 text-lg font-bold text-teal-400'>EDIT BLOG</h3>

      <form
        className="md:w-[50%] rounded-md text-center border border-teal-800 backdrop-blur-md mx-auto p-3"
        onSubmit={onFormSubmit}
      >
        <div className="mb-6">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-start"
          >
            Tittle
          </label>
          <input
            type="title"
            id="title"
            value={blog.title}
            onChange={(e) =>
              setBlog({ ...blog, title: e.target.value })
            }
            className="shadow-sm bg-gray-950 bg-opacity-40 border border-teal-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-g dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            required
          />
        </div>
        <div className="mb-6">
          <label
            for="keyword"
            className="block mb-2 text-sm font-medium text-start"
          >
            Keywords
          </label>
          <input
            type="text"
            id="keyword"
            defaultValue={blog.keywords}
            onChange={(e) =>
              setBlog({ ...blog, keywords: e.target.value })
            }
            className="shadow-sm bg-gray-950 bg-opacity-40 border border-teal-800  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-g dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            required
          />
        </div>

        <div className="mb-6">
          <label
            for="description"
            className="block mb-2 text-sm font-medium text-start"
          >
            Content
          </label>
          <textarea
            rows={4}
            type="text"
            id="description"
            value={blog.content}
            onChange={(e) =>
              setBlog({ ...blog, content: e.target.value })
            }
            className="shadow-sm bg-gray-950 bg-opacity-40 border border-teal-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-g  dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            required
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium"
            for="user_avatar"
          >
            Upload file
          </label>
          {/* <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none  dark:placeholder-g" aria-describedby="user_avatar_help" id="user_avatar" type="file"/> */}
          <FileBase64
            multiple={false}
            defaultValue={blog.image}
            onDone={(files) =>
              setBlog({ ...blog, image: files.base64 })
            }
            className="block w-full text-sm  border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none  dark:placeholder-g"
          ></FileBase64>
          {/* <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div> */}
        </div>
        <button
          type="submit"
          className="text-white mt-5 bg-opacity-40 border border-blue-700 bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
        <NavLink to={'/blog-management'}
          type="submit"
          className="text-white bg-opacity-40 border border-red-700 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2"
        >
          Cancel
        </NavLink>
      </form>
    </div>
  )
}

export default EditBlog