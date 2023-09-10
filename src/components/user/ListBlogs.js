import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { appTheme } from "../layout/LayoutVariables";
import Loading from "../layout/Loading";

function ListBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  /* const [refresh,setRefresh] = useState(false) */
  const sameYear = { month: "short", day: "numeric" };
  const prevYear = { month: "short", day: "numeric", year: "numeric" };
  const thisYear = new Date().getFullYear();
  const navto = useNavigate();

  const getBlogs = () => {
    console.log("Hiiii");
    /* onValue(ref(db,"blogs/"), (snapshot) => {
    const data = snapshot.val()
    console.log(data)
    if(data!==null){
        Object.values(data).map((blog)=>{
          const blogsArray = (oldArr)=>[...oldArr,blog]
          setBlogs(blogsArray)
          setLoading(false)
          console.log('blog');
          return 0
      })
    }
  }) */

    onValue(ref(db, "blogs/"), (snapshot) => {
      const data = snapshot.val();
      console.log(data);

      if (data !== null) {
        const blogsArray = Object.values(data).map((blog) => blog);
        setBlogs(blogsArray.reverse());
        setLoading(false);
      }
    });

    console.log(blogs);
  };

  useEffect(() => {
    getBlogs();
    //eslint-disable-next-line
  }, []);
  const onClick = (id) => {
    navto(`/view-blog/${id}`);
  };
  return (
    <div className="md:my-5">
      <div className="flex justify-center">
        {loading ? (
          <Loading />
        ) : (
          <div className="grid md:grid-cols-3 p-2 grid-cols-1 gap-2 md:gap-20">
            {blogs.map((blog) => {
              return (
                <div
                  onClick={() => onClick(blog.bid)}
                  key={blog.bid}
                  className="flex flex-row mt-1"
                >
                  <div className="md:w-[19rem] h-full mb-2 bg-teal-700 bg-inherit backdrop-blur-2xl bg-opacity-5 border border-teal-900 rounded-lg shadow-md hover:shadow-teal-600 hover:scale-95 duration-100">
                    <div>
                      <img
                        className="rounded-t-lg h-56 w-full object-cover"
                        src={blog.image ? blog.image : appTheme.noThumb}
                        alt="thumbnile"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-right">
                        <p className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-gray-400 bg-teal-600 bg-opacity-20 rounded-md hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:hover:bg-teal-700 dark:focus:teal-blue-900">
                          {/* {new Date(blog.date).getDay()} / */}{" "}
                          {thisYear === new Date(blog.date).getFullYear()
                            ? new Date(blog.date)
                                .toLocaleDateString("en-US", sameYear)
                                .replace(/,/g, "")
                            : new Date(blog.date)
                                .toLocaleDateString("en-US", prevYear)
                                .replace(/,/g, "")}{" "}
                          {/* / { new Date(blog.date).getFullYear()} */}
                        </p>
                      </div>
                      <div className="text-left">
                        <h5 className="mb-1 text-2xl font-bold tracking-tight  overflow-hidden text-gray-200 dark:text-black-600">
                          {blog.title}
                        </h5>
                      </div>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 max-w-fit text-start overflow-hidden h-12">
                        {blog.content}
                      </p>
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

export default ListBlogs;
