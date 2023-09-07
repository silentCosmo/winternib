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
            const id = action.payload.id
            const update = {...action.payload,date: new Date()}
            set(ref(db, 'blogs/' + id), update )
              
        },
        /* post:(state,action) => {
            console.log(action.payload);
            instance.post('/posts',action.payload)
        },
        createUser:(state,action)=>{
            console.log('user',action.payload);
            let crypass = CryptoJS.AES.encrypt(action.payload.password,'secretkey123').toString()
            console.log(crypass);
            const user = {email:action.payload.email,password:crypass}
            instance.post('/users',user)
        },
        auth:(state,action)=>{
            console.log(action.payload);
            const getData = async ()=>{
                const data = await instance.get(`/users?email=${action.payload.email}`)
                //console.log('data23',data.data[0].password);
                const sPass = data.data[0]? data.data[0].password: 'cosmic*%$#@!error'
                 
                const dPass = CryptoJS.AES.decrypt(sPass,'secretkey123').toString(CryptoJS.enc.Utf8)
                
                if(dPass===action.payload.password){
                    console.log('auth done');
                    let auth = true
                    sessionStorage.setItem('auth',auth)
                    alert('log in success')
                    //nav('/blog-management')   
                    action.payload.nav('/blog-management')
                    action.payload.disp(user(true))
                }else{
                    console.log('wrong password');
                    alert('No User found! please check the email and password')
                }

                console.log('43',dPass);
            }
            getData()
        }, */
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
            const date = new Date()
            console.log(date);
            const newBlog = {...action.payload, cid:state.user.uid, date: date, bid:bid }
            console.log(newBlog);
            set(ref(db, `blogs/${bid}` ), newBlog)
        }
    }
})


export const {test, theme,bg, post, edit, createBlog, userAuth, userState} = blogSlice.actions
export default blogSlice.reducer