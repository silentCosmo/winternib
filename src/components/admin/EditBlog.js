import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { edit } from "../../redux/blogSlice";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase/config";
import Loading from "../layout/Loading";

// Utility function to format a date as yyyy-MM-dd
const formatDateForInput = (dateStr) => {
  const [month, day, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

// Utility function to format a date from yyyy-MM-dd to MM/dd/yyyy
const formatDateForDisplay = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return `${month}/${day}/${year}`;
};

function EditBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async (id) => {
    onValue(ref(db, "blogs/" + id), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        // Convert date format to yyyy-MM-dd for the input field
        data.date = formatDateForInput(data.date);
        setBlog(data);
      } else {
        console.error("Blog not found");
      }
    });
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const handleImageUpload = async (file) => {
    if (!file) return;

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
        setBlog((prev) => ({ ...prev, image: reader.result }));
      };
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    // Convert date format back to MM/dd/yyyy if needed
    const updatedBlog = {
      ...blog,
      date: formatDateForDisplay(blog.date),
    };
    dispatch(edit(updatedBlog));
    navigate("/blog-management");
  };

  return (
    <div className="min-h-screen text-cyan-200 p-5">
      <h3 className="mb-2 text-lg font-bold text-cyan-400">EDIT BLOG</h3>
      {blog ? (
        <form
          className="md:w-[50%] text-center border border-cyan-800 backdrop-blur-md mx-auto p-3 pb-5"
          onSubmit={onFormSubmit}
        >
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-start">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={blog.title || ''}
              onChange={(e) => setBlog((prev) => ({ ...prev, title: e.target.value }))}
              className="shadow-sm bg-gray-950 bg-opacity-40 rounded-sm border outline-none border-cyan-800 text-sm focus:border-cyan-500 block w-full p-2.5"
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
              value={blog.keywords || ''}
              onChange={(e) => setBlog((prev) => ({ ...prev, keywords: e.target.value }))}
              className="shadow-sm rounded-sm bg-gray-950 bg-opacity-40 border focus:outline-none border-cyan-800 text-sm focus:border-cyan-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-start">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={blog.date || ''}
              onChange={(e) => setBlog((prev) => ({ ...prev, date: e.target.value }))}
              className="shadow-sm rounded-sm bg-gray-950 bg-opacity-40 border outline-none border-cyan-800 text-sm focus:border-cyan-500 block w-full p-2.5"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="user_avatar" className="block mb-2 text-sm font-medium text-start">
              Image
            </label>
            {blog.image && (
              <div className="mb-2 flex justify-center">
                <img src={blog.image} alt="Current Blog" className="w-32 h-32 object-cover mb-2" />
              </div>
            )}
            <input
              type="file"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              className="block w-full rounded-sm text-sm border border-cyan-800 cursor-pointer bg-gray-950"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-start">
              Content
            </label>
            <textarea
              rows={20}
              type="text"
              id="description"
              value={blog.content || ''}
              onChange={(e) => setBlog((prev) => ({ ...prev, content: e.target.value }))}
              className="shadow-sm rounded-sm bg-gray-950 bg-opacity-40 border outline-none border-cyan-800 text-sm focus:border-cyan-500 block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white mt-5 bg-opacity-40 border border-cyan-700 bg-cyan-800 hover:bg-cyan-800 focus:ring-4 focus:outline-none font-medium text-sm px-5 py-2 text-center"
          >
            Update
          </button>
          <NavLink
            to="/blog-management"
            className="text-white bg-opacity-40 border border-red-700 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-800 focus:outline-none font-medium text-sm px-5 py-2.5 text-center ml-2"
          >
            Cancel
          </NavLink>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default EditBlog;
