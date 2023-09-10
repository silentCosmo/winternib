import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { ImGoogle } from "react-icons/im";
import { appName, appTheme } from "../layout/LayoutVariables";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/config";
import { userAuth, userState } from "../../redux/blogSlice";

function LogIn() {
  const navto = useNavigate();
  /*const dispatch = useDispatch()
     const [userData,setUserData] = useState({
        email:'',
        password:'',
        cache:false,
        nav:nav,
        disp:dispatch
    })
    console.log(userData); 

    const onSubmit = (e)=>{
        e.preventDefault()
        dispatch(auth(userData))
    }*/

  const dispatch = useDispatch();

  const handleSignIn = () => {
    alert("signUp");
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.

        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        const userData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        };
        dispatch(userAuth(userData));
        dispatch(userState(true));
        navto("/");

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        /* const errorCode = error.code;
    const errorMessage = error.message; */
        // The email of the user's account used.
        //const email = error.customData.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    /* const userData = {
    id:'7777777',
    name:'user.displayName',
    email:'user.email',
    avatar:'user.photoURL',
  } */
  };

  return (
    <div className="h-[90vh]">
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mt-20 mx-auto md:h-screen lg:py-0">
          <a
            href="/"
            className="flex items-center text-2xl font-semibold text-teal-400"
          >
            LogIn to {appName}
          </a>
          <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-teal-00 bg-clip-padding backdrop-blur-sm bg-opacity-10 border-teal-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col items-center text-center">
              {/* <h1 className="text-xl font-bold leading-tight tracking-tight text-teal-950 md:teal-2xl">
                  Sign in to your account
              </h1> */}
              <div
                onClick={handleSignIn}
                className={`${appTheme.glassBox} w-fit p-3 rounded-sm text-teal-300 hover:text-teal-100 hover:bg-teal-800 hover:scale-95 active:bg-teal-900 duration-300 flex flex-row`}
              >
                <ImGoogle className="mt-1" />
                <h3>&nbsp; SignIn with Google</h3>
              </div>
              {/* <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-teal-900">Your email</label>
                      <input onChange={(e)=>setUserData({...userData,email:e.target.value})} type="" name="email" id="email" className="border border-gray-300 text-teal-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 bg-teal-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10" placeholder="user@cosmos.com" required=""/>
                  </div>
                  <div>
                      <label html="password" className="block mb-2 text-sm font-medium text-teal-900">Password</label>
                      <input onChange={(e)=>setUserData({...userData,password:e.target.value})} type="password" name="password" id="password" placeholder="••••••••" className="border border-gray-300 text-teal-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 bg-teal-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10" required=""/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input onChange={(e)=>setUserData({...userData,cache:e.target.value})} id="remember" ariay="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounde focus:ring-3 focus:ring-eteal-300 bg-teal-700" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-teal-700">Remember me</label>
                          </div>
                      </div>
                      <a href="/forgot-password-reset" className="text-sm font-medium text-teal-700 hover:underline">Forgot password?</a>
                  </div>
                  <button onClick={(e)=>onSubmit(e)} type="submit" className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-teal-600 hover:bg-teal-700 focus:ring-teal-800">Sign in</button>
                  <p className="text-sm font-light text-teal-700">
                      Don’t have an account yet? <a href="/signup" className="font-medium text-teal-600 hover:underline">Sign up</a>
                  </p>
              </form> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LogIn;
