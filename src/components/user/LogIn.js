import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { ImGoogle } from "react-icons/im";
import { appName, appTheme } from "../layout/LayoutVariables";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/config";
import { userAuth, userState } from "../../redux/blogSlice";

function LogIn() {
  const [userData, setUserData] = useState();
  const navto = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    alert("signUp");
    signInWithPopup(auth, provider)
      .then((result) => {
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
      })
      .catch((error) => {
        // Handle Errors here.
      });
  };
  
  const onSubmit = () => {};

  return (
    <div className="min-h-[calc(100vh-12rem)]">
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mt-20 mx-auto md:h-screen lg:py-0">
          <a
            href="/"
            className="mb-6 flex items-center text-2xl font-semibold text-cyan-600"
          >
            LogIn to {appName}
          </a>
          <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-cyan-600 border-cyan-900 border bg-clip-padding backdrop-blur-sm bg-opacity-10 border-cyan-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col items-center text-center">
              <div
                onClick={handleSignIn}
                className={`${appTheme.glassBox} w-fit p-3 rounded-sm text-cyan-400 hover:text-cyan-100 hover:bg-cyan-800 hover:scale-95 active:bg-cyan-900 duration-300 flex flex-row`}
              >
                <ImGoogle className="mt-1" />
                <h3>&nbsp; SignIn with Google</h3>
              </div>
              <form className="space-y-4 md:space-y-6 text-cyan-700 text-start" action="#">
              <p className="text-center">OR</p>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">
                    Your email
                  </label>
                  <input
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    type="email"
                    name="email"
                    id="email"
                    className="border-b border-cyan-700 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 bg-cyan-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 outline-none"
                    placeholder="user@cosmos.com"
                    required=""
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium">
                    Password
                  </label>
                  <input
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="border-b border-cyan-800 text-cyan-600 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-b-cyan-600 block w-full p-2.5 bg-cyan-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 outline-none"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between gap-10">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        onChange={(e) => setUserData({ ...userData, cache: e.target.value })}
                        id="remember"
                        aria="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-cyan-300 bg-cyan-700"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-cyan-70">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a href="/forgot-password-reset" className="text-sm font-medium text-cyan-700 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <button
                  onClick={(e) => onSubmit(e)}
                  type="submit"
                  className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-cyan-700">
                  Don’t have an account yet? <a href="/signup" className="font-medium text-cyan-600 hover:underline">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LogIn;
