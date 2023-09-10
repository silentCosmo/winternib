import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { onValue, ref, remove } from "firebase/database";
import { db } from "../../firebase/config";
import Loading from "../layout/Loading";

function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const fetchData = async () => {
    onValue(ref(db, "blogs/"), (snapshot) => {
      const data = snapshot.val();
      console.log(data);

      if (data !== null) {
        const blogsArray = Object.values(data).map((blog) => blog);
        setBlogs(blogsArray.reverse());
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, [refresh]);
  
  const onDelete = (id) => {
    remove(ref(db, "blogs/" + id));
    setRefresh(!refresh);
  };

  console.log("b");
  return (
    <div className="flex flex-col gap-2 my-4 min-h-screen">
      <NavLink
        to={"/add-blog"}
        className="border border-teal-500 p-2 ml-5 bg-teal-700 text-teal-100 active:bg-teal-800 backdrop-blur-md bg-opacity-30 hover:bg-teal-800 w-[7rem]"
      >
        Add Blog
      </NavLink>
      <div className="text-center mx-2">
        <hr className="border border-teal-600" />
      </div>

      <div className="flex justify-center">
        {loading ? (
          <Loading />
        ) : (
          <div className="grid md:grid-cols-4 grid-cols-2 md:gap-5 gap-2">
            {blogs.map((blog) => {
              return (
                <div className="flex flex-row mt-1">
                  <div className="md:w-[15rem] w-44 h-full mb-2 bg-white border border-teal-800 rounded-lg shadow-md backdrop-filter backdrop-blur-xl bg-opacity-5">
                    <div>
                      <img
                        className="rounded-t-lg h-52 w-full object-cover hover:object-none bg-zinc-50"
                        src={blog.image}
                        alt=""
                      />
                    </div>
                    <div class="p-3">
                      <div>
                        <h5 class="mb-1 text-2xl font-bold overflow-x-scroll tracking-tight text-gray-900 dark:text-teal-600">
                          {blog.title}
                        </h5>
                      </div>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 w-full overflow-hidden h-12">
                        {blog.content}
                      </p>
                      <p class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-400 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:hover:bg-teal-700 dark:focus:teal-blue-900">
                        {blog.keywords}
                      </p>
                    </div>
                    <div className="flex flex-row justify-center mb-2">
                      <a
                        className="text-green-500 bg-teal-950 border border-teal-700 rounded-l-md px-2 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
                        href={`/view-blog/${blog.bid}`}
                      >
                        View
                      </a>
                      <a
                        className="text-blue-500 bg-teal-950 border-y border-teal-700 px-2 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
                        href={`/edit-blog/${blog.bid}`}
                      >
                        Edit
                      </a>
                      <button
                        className="text-red-500 bg-teal-950 border border-teal-700 rounded-r-md px-2 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
                        onClick={() => onDelete(blog.bid)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogManagement;
