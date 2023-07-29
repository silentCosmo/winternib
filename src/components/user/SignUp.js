import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/blogSlice";

function SignUp() {
  const [userData, setUserData] = useState({
    email: "",
    password: "1",
    confirmpass: "2",
  });
  console.log(userData);

  const dispatch = useDispatch()
  
  const onSubmit = (e)=> {
    e.preventDefault()
        if(userData.password===userData.confirmpass){
            alert('input success!')
            const user = {email:userData.email,password:userData.password}
            dispatch(createUser(user))
        }else{
            alert('password confirmation failed!')
        }
  }
  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-teal-700"
          >
            COSMOBLOGS
          </a>
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-teal-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-teal-300">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-teal-900 md:text-2xl">
                Create and account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" method="post">
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-teal-900"
                  >
                    Your email
                  </label>
                  <input
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    type="email"
                    name="email"
                    id="email"
                    className="border border-gray-300 text-teal-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-teal-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
                    placeholder="user@cosmos.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-teal-900"
                  >
                    Password
                  </label>
                  <input
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="border border-gray-300 text-teal-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-teal-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Confirm password
                  </label>
                  <input
                    onChange={(e) =>
                      setUserData({ ...userData, confirmpass: e.target.value })
                    }
                    type="confirm-password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="border border-gray-300 text-teal-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-teal-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-teal-300 rounded bg-teal-50 focus:ring-3 focus:ring-teal-300"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-teal-700"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-teal-600 hover:underline"
                        href="/"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={(e)=>onSubmit(e)}
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-teal-700">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-teal-600 hover:underline"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
