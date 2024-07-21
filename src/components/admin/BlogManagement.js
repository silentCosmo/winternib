import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loading from "../layout/Loading";

function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const user = JSON.parse(localStorage.getItem('auth'))

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter((blog) => blog.uid === user.uid);
      setBlogs(blogsArray.reverse());
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [refresh]);

  const onDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "blogs", id));
        setRefresh(!refresh);
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 my-4 min-h-screen">
      <NavLink
        to={"/add-blog"}
        className="border border-cyan-500 p-2 ml-5 bg-cyan-700 text-cyan-100 active:bg-cyan-800 backdrop-blur-md bg-opacity-30 hover:bg-cyan-800 w-[7rem]"
      >
        Add Blog
      </NavLink>
      <div className="text-center mx-2">
        <hr className="border border-cyan-600" />
      </div>

      <div className="flex justify-center">
        {loading ? (
          <Loading />
        ) : (
          <div className="grid md:grid-cols-4 grid-cols-2 md:gap-5 gap-1">
            {blogs.map((blog) => (
              <div key={blog.id} className="flex flex-row">
                <div className="md:w-[15rem] w-48 h-full mb-2 bg-white border border-cyan-800 rounded-sm shadow-md backdrop-filter backdrop-blur-xl bg-opacity-5">
                  <div>
                    <img
                      className="rounded-t-sm h-52 w-full object-cover hover:object-none bg-zinc-50"
                      src={blog.image}
                      alt=""
                    />
                  </div>
                  <div className="p-3">
                    <div>
                      <h5 className="mb-1 text-sm font-extrabold overflow-x-auto tracking-tight text-gray-400">
                        {blog.title}
                      </h5>
                    </div>
                    <p className="mb-3 text-sm text-start font-normal text-gray-700 dark:text-gray-400 w-full overflow-hidden h-16">
                      {blog.content}
                    </p>
                    <p className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-gray-400 bg-cyan-800 bg-opacity-50 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-cyan-700 dark:focus:cyan-blue-900">
                      {blog.keywords}
                    </p>
                  </div>
                  <div className="flex flex-row justify-center mb-2">
                    <NavLink
                      className="text-emerald-500 bg-cyan-950 border border-cyan-700 rounded-l-md px-2 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
                      to={`/post/${blog.id}`}
                    >
                      View
                    </NavLink>
                    <NavLink
                      className="text-sky-500 bg-cyan-950 border-y border-cyan-700 px-2 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
                      to={`/edit-blog/${blog.id}`}
                    >
                      Edit
                    </NavLink>
                    <button
                      className="text-rose-600 bg-cyan-950 border border-cyan-700 rounded-r-md px-2 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
                      onClick={() => onDelete(blog.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogManagement;
