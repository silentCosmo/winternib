import React from "react";

function BlogsCardPc() {
  return (
    <div>
      <div
        onClick={() => onClick(blog.bid)}
        key={blog.bid}
        className="flex flex-row mt-1"
      >
        <div className="flex items-center md:w-[19rem] h-full mb-2 bg-teal-700 bg-inherit backdrop-blur-2xl bg-opacity-5 border border-teal-900 rounded-lg shadow-md hover:shadow-teal-600 hover:scale-95 duration-100">
          <div>
            <img
              className="rounded-l-lg h-56 w-48 object-cover"
              src={blog.image ? blog.image : appTheme.noThumb}
              alt="thumbnail"
            />
          </div>
          <div className="flex-1 p-3">
            <div className="text-right">
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
            <div className="text-left">
              <h5 className="mb-1 text-2xl font-bold tracking-tight overflow-hidden text-gray-200 dark:text-black-600">
                {blog.title}
              </h5>
            </div>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 max-w-fit text-start overflow-hidden h-12">
              {blog.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogsCardPc;
