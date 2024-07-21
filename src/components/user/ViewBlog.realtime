import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { bg } from "../../redux/blogSlice";
import { appTheme } from "../layout/LayoutVariables";
import Loading from "../layout/Loading";

function ViewBlog() {
  const { id } = useParams();
  const disp = useDispatch();
  const [blog, setBlog] = useState({});
  const [isLoading,setIsLoading] = useState(true)

  console.log(isLoading);

  const fetchData = async (id) => {
    await onValue(ref(db, `blogs/${id}`), (snapshot) => {
      const data = snapshot.val();
      setIsLoading(false);
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
    <div className={`md:p-5 md:px-[20%] p-1 min-h-screen`}>
      { isLoading?<Loading/>:
      <div className="pb-5 justify-center rounded-sm bg-slate-950 border-cyan-600 border-opacity-20 border  backdrop-filter backdrop-blur- text-lg bg-opacity-60">
        <div>
          <h1 className="my-5 font-extrabold text-xl max-w-[83%] mx-auto md:max-w-screen-lg drop-shadow-md opacity-75 text-cyan-100">
            {blog.title}
          </h1>
        </div>
        <div className="flex justify-center">
          <img
            className="md:h-[32rem] h-[25rem] w-[80%] object-cover rounded-md px-1"
            src={blog.image ? blog.image : appTheme.noImg}
            alt="Blog Img"
          />
        </div>

        <div className="flex justify-center">
          <hr className="mt-8 w-11/12 border border-cyan-200 border-opacity-20" />
        </div>
        <div className="md:px-16 px-4 py-6">
          <p className="md:text-lg text-sm text-start whitespace-break-spaces drop-shadow-md text-cyan-50 opacity-50 tracking-wider leading-7">
            {blog.content}
          </p>
          <h1>{blog.keyword}</h1>
        </div>
      </div>}
    </div>
  );
}

export default ViewBlog;
