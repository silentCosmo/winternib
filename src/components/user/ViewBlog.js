import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { bg } from "../../redux/blogSlice";
import { appTheme } from "../layout/LayoutVariables";

function ViewBlog() {
  const { id } = useParams();
  const disp = useDispatch();
  const [blog, setBlog] = useState({});
  const fetchData = async (id) => {
    await onValue(ref(db, `blogs/${id}`), (snapshot) => {
      const data = snapshot.val();
      setBlog(data);
      disp(bg(data.image ? data.image : appTheme.noImg));
      console.log(data);
    });

    /* const blog = await instance.get(`/posts/${id.id}`).then((response) => {
          return response.data;
        });
        setBlog(blog);
        console.log("a", blog); 
        setBlog([{title:'dgu',keyword:'sdfsf', dedescription:'shagdtgytsdftsyafdtyafsdtygtasy',image:'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'}
        ,{title:'dgu',keyword:'sdfsf', dedescription:'shagdtgytsdftsyafdtyafsdtygtasy',image:'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'}])*/
  };
  useEffect(() => {
    fetchData(id);
    return () => disp(bg(false));
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className={`md:p-5 p-1 min-h-[100vh]`}>
      <div className="pb-5 justify-center rounded-sm bg-teal-300 border-teal-600 border-opacity-20 border bg-clip-padding backdrop-filter backdrop-blur-xl text-lg bg-opacity-5">
        <div>
          <h1 className="my-5 font-extrabold text-2xl mx-auto max-w-screen-lg drop-shadow-md opacity-75 text-teal-100">
            {blog.title}
          </h1>
        </div>
        <div className="flex justify-center">
          <img
            className="max-h-80 rounded-md px-1"
            src={blog.image ? blog.image : appTheme.noImg}
            alt="Blog Img"
          />
        </div>
        <div className="flex justify-center">
          <hr className="mt-6 w-[87.5vw] border border-teal-200 border-opacity-20" />
        </div>
        <div className="mt-4 md:px-16 px-3">
          <p className=" text-left whitespace-break-spaces drop-shadow-md text-teal-100">
            {blog.content}
          </p>
          <h1>{blog.keyword}</h1>
        </div>
      </div>
    </div>
  );
}

export default ViewBlog;
