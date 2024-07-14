import React, { useState } from "react";
import { appName } from "../layout/LayoutVariables";

function SignUp() {
  const [userData, setUserData] = useState({
    email: "",
    password: "1",
    confirmpass: "2",
  });
  console.log(userData);

  //const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault();
    if (userData.password === userData.confirmpass) {
      alert("input success!");
      //const user = {email:userData.email,password:userData.password}
      //dispatch(createUser(user))
    } else {
      alert("password confirmation failed!");
    }
  };

  return (
    <div>
      <section className="min-h-[calc(100vh-12rem)]">
        <div className="flex mt-20 flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-cyan-700"
          >
            {appName}
          </a>
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-cyan-600 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-cyan-900">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-cyan-700 md:text-2xl">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6 text-start text-cyan-700" action="#" method="post">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
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
                    className="border-b border-cyan-800 focus:border-cyan-600 outline-none sm:text-sm rounded-lg block w-full p-2.5 bg-cyan-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
                    placeholder="user@cosmos.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium"
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
                    className="border-b border-cyan-800 focus:border-cyan-600 outline-none sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 bg-cyan-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium"
                  >
                    Confirm password
                  </label>
                  <input
                    onChange={(e) =>
                      setUserData({ ...userData, confirmpass: e.target.value })
                    }
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="border-b border-cyan-800 focus:border-cyan-600 outline-none sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-cyan-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-cyan-300 rounded bg-cyan-700 focus:ring-3 focus:ring-cyan-300"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-cyan-700">
                      I accept the{" "}
                      <a
                        className="font-medium text-cyan-600 hover:underline"
                        href="/"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={(e) => onSubmit(e)}
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-cyan-700">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-cyan-600 hover:underline"
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
