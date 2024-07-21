import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/config";
import { collection, addDoc, updateDoc, doc, setDoc } from "firebase/firestore"; // Make sure to import setDoc
import { appTheme } from "../components/layout/LayoutVariables";

const initialState = {
  value: 'temp',
  theme: 'hi',
  user: null,  // Make sure you initialize user state if it's used
  bg: null,    // Initialize other state properties if used
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    test: (state) => {
      state.data = 'data set';
    },
    theme: (state, action) => {
      console.log(action.payload);
      state.theme = action.payload ? appTheme.dark : appTheme.light;
      console.log(state.theme);
    },
    bg: (state, action) => {
      state.bg = action.payload;
      console.log(state.bg);
    },
    edit: async (state, action) => {
      console.log('onEdit:', action.payload);
      const { bid, ...updateData } = action.payload;

      try {
        const blogDocRef = doc(db, 'blogs', bid);
        await updateDoc(blogDocRef, updateData);
        console.log('Blog updated successfully');
      } catch (error) {
        console.error('Error updating blog:', error);
      }
    },
    userAuth: async (state, action) => {
      const userData = action.payload;
      console.log('authRes', userData);

      try {
        // Assuming you want to store user data in Firestore under 'users' collection
        const userDocRef = doc(db, 'users', userData.uid);
        await setDoc(userDocRef, userData); // Use setDoc to create or update user document
        localStorage.setItem('auth', JSON.stringify(userData));
      } catch (error) {
        console.error('Error setting user data:', error);
      }
    },
    userState: (state, action) => {
      if (action.payload !== false) {
        state.user = action.payload;
      } else {
        state.user = false;
        localStorage.removeItem('auth');
      }
      console.log('user true', action.payload, state.user);
    },
    createBlog: async (state, action) => {
      console.log(state.user.uid);
      //const bid = Date.now();
      //const date = new Date().toISOString();
      //const date = new Date().toLocaleDateString("en-US");
      console.log(action.payload.date);

      const newBlog = { ...action.payload, uid: state.user.uid };
      console.log(action.payload.date);
      console.log(newBlog);

      try {
        const blogCollectionRef = collection(db, 'blogs');
        await addDoc(blogCollectionRef, newBlog);
        console.log('Blog created successfully');
      } catch (error) {
        console.error('Error creating blog:', error);
      }
    },
  },
});

export const { test, theme, bg, edit, createBlog, userAuth, userState } = blogSlice.actions;
export default blogSlice.reducer;
