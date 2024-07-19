import { onValue, query, ref, orderByKey, limitToLast, endAt } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { appTheme, truncateText } from "../layout/LayoutVariables";
import Loading from "../layout/Loading";
import BlogsCardPc from "./BlogsCardPc";

function ListBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastKey, setLastKey] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const sameYear = { month: "short", day: "numeric" };
  const prevYear = { month: "short", day: "numeric", year: "numeric" };
  const thisYear = new Date().getFullYear();
  const navto = useNavigate();
  const BLOGS_BATCH_SIZE = 10;

  const fetchBlogs = (key = null) => {
    setLoading(true);

    let blogQuery = query(ref(db, "blogs/"), orderByKey(), limitToLast(BLOGS_BATCH_SIZE));

    if (key) {
      blogQuery = query(ref(db, "blogs/"), orderByKey(), endAt(key), limitToLast(BLOGS_BATCH_SIZE + 1));
    }

    onValue(blogQuery, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const blogsArray = Object.entries(data).map(([key, blog]) => ({ key, ...blog }));

        // Check if there are more blogs to fetch
        const newBlogs = blogsArray.reverse();
        if (key) {
          // Remove the first blog as it will be repeated in the new batch
          newBlogs.shift();
        }

        setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
        setLastKey(newBlogs.length ? newBlogs[newBlogs.length - 1]?.key : null);
        setHasMore(newBlogs.length === BLOGS_BATCH_SIZE);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const onClick = (id) => {
    navto(`/view-blog/${id}`);
  };

  return (
    <div className="md:my-5">
      <div className="flex justify-center">
        {loading && blogs.length === 0 ? (
          <Loading />
        ) : (
          <div className="grid md:grid-cols-2 p-2 grid-cols-1 gap-2">
            {blogs.map((blog) => (
              <React.Fragment key={blog.key}>
                <div className="text-right hidden md:block w-[48vw]">
                  <BlogsCardPc blog={blog} />
                </div>
                <div className="flex flex-row mt-1 md:hidden">
                  <div className="md:w-[19rem] h-full mb-2 overflow-hidden bg-cyan-900 bg-opacity-5 border border-cyan-900 rounded-lg shadow-md hover:shadow-cyan-700 hover:scale-95 duration-75">
                    <div className="h-60 hover:h-56 overflow-hidden">
                      <img
                        className="rounded-t-lg h-60 w-full object-cover hover:scale-125 transition duration-700"
                        src={blog.image ? blog.image : appTheme.noThumb}
                        alt="thumbnail"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-right">
                        <p className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-gray-400 bg-cyan-600 bg-opacity-20 rounded-md hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-cyan-700 dark:focus:cyan-blue-900">
                          {thisYear === new Date(blog.date).getFullYear()
                            ? new Date(blog.date).toLocaleDateString("en-US", sameYear).replace(/,/g, "")
                            : new Date(blog.date).toLocaleDateString("en-US", prevYear).replace(/,/g, "")}
                        </p>
                      </div>
                      <div className="text-left">
                        <h5 className="mb-1 text-xl font-bold tracking-tight overflow-hidden text-cyan-50 opacity-60">
                          {blog.title}
                        </h5>
                      </div>
                      <p
                        onClick={() => onClick(blog.bid)}
                        className="mb-3 font-normal text-slate-100 opacity-50 max-w-fit text-start overflow-hidden"
                      >
                        {truncateText(blog.content, 165)}
                        <span className="font-bold opacity-80 cursor-pointer">
                          {blog.content.length > 150 ? "...Read more" : ""}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
      {hasMore && (
        <div className={`flex flex-col items-center my-5`}>
          <button
            onClick={() => fetchBlogs(lastKey)}
            className={`px-4 py-2 text-slate-300 bg-cyan-700 bg-opacity-50 backdrop-blur-xl rounded hover:bg-cyan-800 ${loading &&('hidden')}`}
          >
            Load More
          </button>
          {loading && blogs.length > 0 && (
            <div className="mt-4 spinner"></div>  
          )}
        </div>
      )}
    </div>
  );
}

export default ListBlogs;
