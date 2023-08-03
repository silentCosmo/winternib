import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [refresh,setRefresh] = useState(false)

  /* const fetchData = async () => {
    const blogs = await instance.get("/posts").then((response) => {
      return response.data;
    });
    setBlogs(blogs);
    console.log("a", blogs);
  }; */
  useEffect(() => {
    //fetchData();
    setBlogs([{title:'dgu',keyword:'sdfsf', dedescription:'shagdtgytsdftsyafdtyafsdtygtasy',image:'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'}
        ,{title:'dgu',keyword:'sdfsf', dedescription:'shagdtgytsdftsyafdtyafsdtygtasy',image:'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'}])
  }, [refresh]);

  const onDelete = (id) => {
    //instance.delete(`/posts/${id}`)
    setRefresh(!refresh)
  }

  console.log("b");
  return (
    <div className="flex justify-center flex-col gap-2 ml-5 mt-4">
      <NavLink
        to={"/add-blog"}
        className="border border-teal-500 p-2 bg-teal-400 active:bg-teal-800 hover:bg-teal-600 w-[7rem]"
      >
        Add Blog
      </NavLink>

      <hr className="w-full" />
      
      <div className="flex justify-center">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-5">
        {blogs.map((blog) => {
          return (
            <div className="flex flex-row mt-1">
              <div className="w-[19rem] h-full mb-2 bg-white border border-gray-200 rounded-lg shadow-md">
                <div>
                  <img
                    className="rounded-t-lg h-52 w-full object-cover hover:object-none bg-zinc-50"
                    src={blog.image}
                    alt=""
                  />
                </div>
                <div class="p-3">
                  <div>
                    <h5 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-teal-600">
                      {blog.title}
                    </h5>
                  </div>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 w-full overflow-hidden h-12">
                    {blog.description}
                  </p>
                  <p class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-400 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:hover:bg-teal-700 dark:focus:teal-blue-900">
                    {blog.keywords}
                  </p>
                </div>
                  <div className="flex flex-row justify-center gap-2 mb-2">
                    <a className="text-green-500 bg-teal-950 border border-teal-500 rounded-md px-2 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10" href={`/view-blog/${blog.id}`}>View</a>
                    <a className="text-blue-500 bg-teal-950 border border-teal-500 rounded-md px-2 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10" href={`/edit-blog/${blog.id}`}>Edit</a>
                    <button className="text-red-500 bg-teal-950 border border-teal-500 rounded-md px-2 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10" onClick={()=>onDelete(blog.id)}>Delete</button>
                </div>
              </div>
                
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default BlogManagement;
