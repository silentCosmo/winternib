import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { edit } from "../../redux/blogSlice";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase/config";

function EditBlog() {
  const { id } = useParams();
  // eslint-disable-next-line
  const data = useSelector((state) => state.blogs);
  const [blog, setBlog] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async (id) => {
    onValue(ref(db, "blogs/" + id), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setBlog(data);
      }
    });
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const handleImageUpload = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1980,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        setBlog({ ...blog, image: reader.result });
      };
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(edit(blog));
    navigate("/blog-management");
  };

  return (
    <div className="h-screen text-cyan-200 p-5">
      <h3 className="mb-2 text-lg font-bold text-cyan-400">EDIT BLOG</h3>

      <form
        className="md:w-[50%] rounded-md text-center border border-cyan-800 backdrop-blur-md mx-auto p-3"
        onSubmit={onFormSubmit}
      >
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-start">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            className="shadow-sm bg-gray-950 bg-opacity-40 border border-cyan-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="keyword" className="block mb-2 text-sm font-medium text-start">
            Keywords
          </label>
          <input
            type="text"
            id="keyword"
            value={blog.keywords}
            onChange={(e) => setBlog({ ...blog, keywords: e.target.value })}
            className="shadow-sm bg-gray-950 bg-opacity-40 border border-cyan-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-start">
            Content
          </label>
          <textarea
            rows={10}
            type="text"
            id="description"
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
            className="shadow-sm bg-gray-950 bg-opacity-40 border border-cyan-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium" htmlFor="user_avatar">
            Upload file
          </label>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white mt-5 bg-opacity-40 border border-blue-700 bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
        <NavLink
          to="/blog-management"
          className="text-white bg-opacity-40 border border-red-700 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2"
        >
          Cancel
        </NavLink>
      </form>
    </div>
  );
}

export default EditBlog;
