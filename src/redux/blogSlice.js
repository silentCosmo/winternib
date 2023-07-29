import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../api/instance";
import CryptoJS from "crypto-js";

const initialState = {value:'temp'}

const blogSlice = createSlice({
    name:'blogs',
    initialState,
    reducers: {
        test:(state)=>{
           state.data = 'data set'
        },
        post:(state,action) => {
            console.log(action.payload);
            instance.post('/posts',action.payload)
        },
        edit:(state,action) => {
            console.log('onEdit:',action.payload);
            const id = action.payload.id
            instance.put(`/posts/${id}`,action.payload)
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
        },
        user:(state,action)=>{
            state.user = action.payload
            console.log('user true');
        }
    }
})


export const {test, post, edit, createUser, auth, user} = blogSlice.actions
export default blogSlice.reducer