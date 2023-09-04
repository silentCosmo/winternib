import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { createBlog } from "../../redux/blogSlice";
import { useNavigate } from "react-router-dom";

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
  return (
    <div className=" text-teal-300 p-5">
      <h3 className="mb-2 font-bold text-lg text-teal-400">ADD BLOG</h3>

      <form
        className="md:w-[50%] rounded-md text-center border border-teal-700 bg-teal-950 mx-auto p-3 baackdrop-blur-2xl bg-opacity-40"
        onSubmit={onFormSubmit}
      >
        <div className="mb-6">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-start"
          >
            Blog Tittle
          </label>
          <input
            type="ti"
            id="title"
            value={submitValues.title}
            onChange={(e) =>
              setSubmitValues({ ...submitValues, title: e.target.value })
            }
            className="shadow-sm bg-gray-950 bg-opacity-40 border border-teal-800 text-sm rounded-lg block w-full p-2.5"
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
            value={submitValues.description}
            onChange={(e) =>
              setSubmitValues({ ...submitValues, content: e.target.value })
            }
            className="shadow-sm bg-gray-950 bg-opacity-40 border border-teal-800 text-sm rounded-lg focus:ring-teal-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-g"
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
            value={submitValues.keywords}
            onChange={(e) =>
              setSubmitValues({ ...submitValues, keywords: e.target.value })
            }
            className="shadow-sm bg-gray-950 bg-opacity-40 border border-teal-800 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-teal-500 block w-full p-2.5  dark:placeholder-g "
            required
          />
        </div>

        <div>
          <label
            className="block mb-2 text-sm font-medium text-teal-300"
            for="user_avatar"
          >
            Image
          </label>
          {/* <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none  dark:placeholder-g" aria-describedby="user_avatar_help" id="user_avatar" type="file"/> */}
          <FileBase64
            multiple={false}
            value={submitValues.image}
            onDone={(files) =>
              setSubmitValues({ ...submitValues, image: files.base64 })
            }
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-900 dark:text-gray-400 focus:outline-none"
          ></FileBase64>
          {/* <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div> */}
        </div>
        <button
          type="submit"
          className="text-white mt-5 bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
        <button
          type="cancel"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-800 ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
