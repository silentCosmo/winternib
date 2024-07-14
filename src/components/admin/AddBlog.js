import React, { useState } from "react";
// eslint-disable-next-line
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { createBlog } from "../../redux/blogSlice";
import { useNavigate } from "react-router-dom";
import imageCompression from 'browser-image-compression';

function AddBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let initialValues = {
    title: "",
    content: "",
    keywords: "",
    image: "",
  };
  const [submitValues, setSubmitValues] = useState(initialValues);

  const onFormSubmit = (e) => {
    e.preventDefault();
    //console.log(submitValues)
    dispatch(createBlog(submitValues));
    navigate("/blog-management");
  };

  const handleImageUpload = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        setSubmitValues({ ...submitValues, image: reader.result });
      };
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  return (
    <div className="h-screen text-cyan-300 p-5">
      <h3 className="mb-2 font-bold text-lg text-cyan-400">ADD BLOG</h3>

      <form
        className="md:w-[50%] rounded-md text-center border border-cyan-700 bg-cyan-950 mx-auto p-3 baackdrop-blur-2xl bg-opacity-40"
        onSubmit={onFormSubmit}
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-start"
          >
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            value={submitValues.title}
            onChange={(e) =>
              setSubmitValues({ ...submitValues, title: e.target.value })
            }
            className="shadow-sm bg-gray-950 bg-opacity-40 border border-cyan-800 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-start"
          >
            Content
          </label>
          <textarea
            rows={10}
            type="text"
            id="content"
            value={submitValues.content}
            onChange={(e) =>
              setSubmitValues({ ...submitValues, content: e.target.value })
            }
            className="shadow-sm bg-gray-950 bg-opacity-40 border border-cyan-800 text-sm rounded-lg focus:ring-cyan-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="keywords"
            className="block mb-2 text-sm font-medium text-start"
          >
            Keywords
          </label>
          <input
            type="text"
            id="keywords"
            value={submitValues.keywords}
            onChange={(e) =>
              setSubmitValues({ ...submitValues, keywords: e.target.value })
            }
            className="shadow-sm bg-gray-950 bg-opacity-40 border border-cyan-800 text-sm rounded-lg focus:ring-yellow-500 focus:border-cyan-500 block w-full p-2.5"
            required
          />
        </div>

        <div>
          <label
            className="block mb-2 text-sm font-medium text-cyan-300"
            htmlFor="user_avatar"
          >
            Image
          </label>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-900 dark:text-gray-400 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white mt-5 bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => navigate("/blog-management")}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-800 ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
