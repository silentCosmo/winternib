import { useDispatch } from "react-redux";
import { instance } from "./instance";
import { blogData } from "../redux/blogSlice";

const dispatch = useDispatch

export const get = {
     fetchData : async (id) => {
        const blog = await instance.get(`/posts/${id}`).then((response) => {
          return response.data;
        })
        console.log("aStore", blog);
        dispatch(blogData(blog))
    }
}