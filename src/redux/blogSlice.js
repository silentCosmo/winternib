import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/config";
import { ref, set } from "firebase/database";
import { appTheme } from "../components/layout/LayoutVariables";

const initialState = {value:'temp',theme:'hi'}
const blogSlice = createSlice({
    name:'blogs',
    initialState,
    reducers: {
        test:(state)=>{
           state.data = 'data set'
        },
        theme:(state,action)=>{
            console.log(action.payload);
            state.theme = action.payload?appTheme.dark:appTheme.light
            console.log(state.theme);
        },
        bg:(state,action)=>{
            state.bg = action.payload
            console.log(state.bg)
        },
        edit:(state,action) => {
            console.log('onEdit:',action.payload);
            const id = action.payload.bid
            const update = {...action.payload}
            console.log(update);
            set(ref(db, 'blogs/' + id), update )
              
        },
        userAuth:(state,action)=>{
            const userData = action.payload
            console.log('authRes',userData)
            set(ref(db, `users/${userData.uid}/`), userData)
            localStorage.setItem('auth',JSON.stringify(userData))
        },
        userState:(state,action)=>{
            
            if(action.payload!==false){
                state.user = action.payload
            }else{
                state.user = false
                localStorage.removeItem('auth')
            }
            console.log('user true',action.payload, state.user);
        },
        createBlog:(state,action)=>{
            console.log(state.user.uid);
            const bid = Date.now()
            const date = new Date().toLocaleDateString("en-uk")
            console.log(date);
            const newBlog = {...action.payload, cid:state.user.uid, date: date, bid:bid }
            console.log(date);
            console.log(newBlog);
            set(ref(db, `blogs/${bid}` ), newBlog)
        }
    }
})


export const {test, theme,bg, post, edit, createBlog, userAuth, userState} = blogSlice.actions
export default blogSlice.reducer
