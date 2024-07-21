import { doc, getDoc } from "firebase/firestore";
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
  const [isLoading, setIsLoading] = useState(true);

  const sameYear = { month: "short", day: "numeric" };
  const prevYear = { month: "short", day: "numeric", year: "numeric" };
  const thisYear = new Date().getFullYear();

  const fetchData = async (id) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setBlog(data);
        disp(bg(data.image ? data.image : appTheme.noImg));
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(id);
    return () => disp(bg(false));
    // eslint-disable-next-line
  }, [id]);


  return (
    <div className={`md:p-5 md:px-[20%] p-1 my-1 min-h-screen`}>
      {isLoading ? <Loading /> :
        <div className="pb-5 justify-center rounded-sm bg-slate-950 border-cyan-600 border-opacity-20 border  backdrop-filter backdrop-blur- text-lg bg-opacity-60">
          <div>
          {/* <h1 className="my-5 font-extrabold text-lg max-w-[95%] mx-auto md:max-w-screen-lg drop-shadow-md opacity-65 text-cyan-50">
              {blog.title}
            </h1> */}
            <div className="flex mt-5 md:mt-16 justify-center">
              <img
                className="md:h-[32rem] md:w-[80%] h-[15rem] w-[95%] object-cover rounded-md px-1"
                src={blog.image ? blog.image : appTheme.noImg}
                alt="Blog Img"
              />
            </div>
            
            <div className="flex align-middle justify-center group">
              <hr className="mt-8  border w-[70%] border-cyan-400 border-opacity-20 group-hover:border-opacity-30 duration-1000" />
              <div className="mt-4  text-right">
                <p className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-gray-400 bg-cyan-400 bg-opacity-20 rounded-md group-hover:bg-opacity-30 duration-1000">
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

          </div>
          <h1 className="mt-4 font-extrabold text-lg max-w-[95%] md:text-2xl md:max-w-screen-lg drop-shadow-md opacity-60 text-cyan-50">
              {blog.title}
            </h1>
          <div className="md:px-16 px-4 py-3">
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
