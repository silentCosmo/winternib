import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FileBase64 from 'react-file-base64'
import { edit } from '../../redux/blogSlice';

function EditBlog() {
    const id = useParams()
    const data = useSelector((state)=>state.blogs)
    console.log(data);
    const [blog,setBlog] = useState({})
    const fetchData = async (id) => {
        /* const blog = await instance.get(`/posts/${id.id}`).then((response) => {
          return response.data;
        });
        setBlog(blog);
        console.log("a", blog); */
      };
      useEffect(()=>{
        fetchData(id)
      },[id])

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let initialValues = {
        id:id.id,
        title: blog.title,
        description: blog.description,
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
      dispatch(edit(blog));
      navigate("/blog-management");
    }

  return (
    <div className="border border-green-400 p-5">
      <h3>EDIT BLOG</h3>

      <form
        className="w-[50%] text-center border border-yellow-400 mx-auto p-3"
        onSubmit={onFormSubmit}
      >
        <div className="mb-6">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 text-start"
          >
            Blog Tittle
          </label>
          <input
            type="title"
            id="title"
            value={blog.title}
            onChange={(e) =>
              setBlog({ ...blog, title: e.target.value })
            }
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-g dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            required
          />
        </div>
        <div className="mb-6">
          <label
            for="keyword"
            className="block mb-2 text-sm font-medium text-gray-900 text-start"
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
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-g dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            required
          />
        </div>

        <div className="mb-6">
          <label
            for="description"
            className="block mb-2 text-sm font-medium text-gray-900 text-start"
          >
            Description
          </label>
          <textarea
            rows={4}
            type="text"
            id="description"
            value={blog.description}
            onChange={(e) =>
              setBlog({ ...blog, description: e.target.value })
            }
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-g  dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            required
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none  dark:placeholder-g"
          ></FileBase64>
          {/* <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div> */}
        </div>
        <button
          type="submit"
          className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default EditBlog