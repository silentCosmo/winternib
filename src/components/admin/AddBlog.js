import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../../redux/blogSlice";
import imageCompression from "browser-image-compression";

function AddBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const initialValues = {
    title: "",
    content: "",
    keywords: "",
    image: "",
  };

  const [submitValues, setSubmitValues] = useState(initialValues);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createBlog(submitValues));
    navigate("/blog-management");
  };

  const handleImageUpload = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
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
    <div className="min-h-screen text-cyan-200 p-5">
      <h3 className="mb-2 text-lg font-bold text-cyan-400">ADD BLOG</h3>
      <form
        className="md:w-[50%] text-center border border-cyan-950 backdrop-blur-md mx-auto p-3 pb-8"
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
            className="shadow-sm bg-gray-950 outline-none bg-opacity-40 border border-cyan-800 text-sm rounded-sm block w-full p-2.5"
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
            className="shadow-sm bg-gray-950 outline-none bg-opacity-40 border border-cyan-800 text-sm rounded-sm block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-cyan-300 text-start"
            htmlFor="user_avatar"
          >
            Image
          </label>
          {submitValues.image && (
              <div className="mb-2 justify-center fle">
                <img src={submitValues.image} alt="Current Blog" className="w-32 h-32 object-cover mb-2" />
              </div>
            )}
          <input
            type="file"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="block w-full rounded-sm text-sm border border-cyan-800 cursor-pointer bg-gray-950"
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
            rows={20}
            id="content"
            value={submitValues.content}
            onChange={(e) =>
              setSubmitValues({ ...submitValues, content: e.target.value })
            }
            className="shadow-sm bg-gray-950  outline-none bg-opacity-40 border border-cyan-800 text-sm rounded-sm block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white mt-5 bg-opacity-40 border border-cyan-700 bg-cyan-800 hover:bg-cyan-800 focus:ring-4 focus:outline-none font-medium text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => navigate("/blog-management")}
          className="text-white bg-opacity-40 border border-red-700 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-800 focus:outline-none font-medium text-sm px-5 py-2.5 text-center ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
