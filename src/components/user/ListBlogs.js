import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { appTheme, truncateText } from "../layout/LayoutVariables";
import Loading from "../layout/Loading";
import BlogsCardPc from "./BlogsCardPc";

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
          <div className="grid md:grid-cols-2 p-2 grid-cols-1 gap-2">
            {blogs.map((blog) => {
              return (
                <>
                  <div className="text-right hidden md:block w-[48vw]">
                    <BlogsCardPc blog={blog} />
                  </div>
                  <div key={blog.bid} className="flex flex-row mt-1 overflow-hidden md:hidden">
                    <div className="md:w-[19rem] h-full mb-2 bg-teal-700 bg-inherit backdrop-blur-2xl bg-opacity-5 border border-teal-900 rounded-lg shadow-md hover:shadow-teal-700 hover:scale-95 duration-75">
                      <div className="h-60 hover:h-56 overflow-hidden">
                        <img
                          className="rounded-t-lg h-60 w-full object-cover hover:scale-125 transition duration-700"
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
                          <h5 className="mb-1 text-2xl font-bold tracking-tight  overflow-hidden text-teal-50 opacity-80">
                            {blog.title}
                          </h5>
                        </div>
                        <p
                          onClick={() => onClick(blog.bid)}
                          className="mb-3 font-normal text-gray-700 dark:text-gray-400 max-w-fit text-start overflow-hidden"
                        >
                          {truncateText(blog.content, 165)}
                          <span className="font-bold opacity-80 cursor-pointer">
                            {blog.content.length > 150 ? "...Read more" : ""}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListBlogs;
