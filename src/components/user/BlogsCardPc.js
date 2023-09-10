import React from "react";
import { appTheme } from "../layout/LayoutVariables";
import { useNavigate } from "react-router-dom";

function BlogsCardPc({ blog }) {
  const sameYear = { month: "short", day: "numeric" };
  const prevYear = { month: "short", day: "numeric", year: "numeric" };
  const thisYear = new Date().getFullYear();
  const navto = useNavigate();
  const onClick = (id) => {
    navto(`/view-blog/${id}`);
  };
  return (
    <div>
      <div key={blog.bid} className="flex flex-row mt-1">
        <div className="mx-auto w-full flex items-center h-full mb-2 bg-teal-700 bg-inherit backdrop-blur-2xl bg-opacity-5 border border-teal-900 rounded-lg shadow-md hover:shadow-teal-700 hover:scale-95 duration-75">
          <div className="h-56 w-64 overflow-hidden">
            <img
              className="rounded-l-lg h-56 w-64 object-cover hover:scale-125 transition duration-600"
              src={blog.image ? blog.image : appTheme.noThumb}
              alt="thumbnail"
            />
          </div>
          <div className="flex-1 p-3">
            <div className="text-left">
              <h5 className="mb-1 text-2xl font-bold tracking-tight overflow-hidden text-teal-50 opacity-80">
                {blog.title}
              </h5>
              <div className="">
                <p className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-gray-400 bg-teal-600 bg-opacity-20 rounded-md hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-teal-700 dark:focus:teal-blue-900">
                  {thisYear === new Date(blog.date).getFullYear()
                    ? new Date(blog.date)
                        .toLocaleDateString("en-US", sameYear)
                        .replace(/,/g, "")
                    : new Date(blog.date)
                        .toLocaleDateString("en-US", prevYear)
                        .replace(/,/g, "")}
                </p>
              </div>
            </div>
            <p
              onClick={() => onClick(blog.bid)}
              className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-start"
            >
              {blog.content.length > 150 || blog.title.length > 70
                ? blog.content.slice(0, 140 - blog.title.length)
                : blog.content}
              <span className="font-bold opacity-80 cursor-pointer">
                {blog.content.length > 150 ? "...Read more" : ""}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogsCardPc;
