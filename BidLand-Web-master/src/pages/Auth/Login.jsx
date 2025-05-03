import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HomeModernIcon } from "@heroicons/react/20/solid";
import Spinner from "components/Spinner/Spinner";
import { Toaster, toast } from "sonner";
const Login = () => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const LoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // setLoader(true);
      var JSON = {
        email: values.email,
        password: values.password,
      };
      try {
        axios.post(`http://localhost:3000/auth/login`, JSON).then((res) => {
          console.log(res.data);
          localStorage.setItem("JWT", res?.data?.token);
          localStorage.setItem("expire", res?.data?.expiresIn);
          localStorage.setItem("userId", res?.data?.user?.userId);
          localStorage.setItem("userData", res?.data?.user?.profilePicture);
          localStorage.setItem("userRole", res?.data?.user?.role);
          localStorage.setItem("userName", res?.data?.user?.username);
          localStorage.setItem("userEmail", res?.data?.user?.email);
          localStorage.setItem("userVerify", res?.data?.user?.verification?.isVerified);
          setUser(res?.data?.user);
          toast.success("Login Successfully")
          setTimeout(() => {
            if (res?.data?.user?.role == "seller") {
              setLoader(false);
              navigate("/sellerdashboard/get-all-users");
            }
            else if (res?.data?.user?.role == "admin") {
              setLoader(false);
              navigate("/admindashboard/get-all-users-page");
            }
             else {
              setLoader(false);
              navigate("/");
            }
          }, 1000);
        }).catch((err) =>{
          setLoader(false);
          console.log(err);
          toast.error(err?.response?.data?.message)
        });
      } catch (error) {
        console.log(error);
      }
    },
    enableReinitialize: true,
  });

  const handleForgetPass = () => {
    navigate("/forgetpassword");
  };
  return (
    <>
    <Toaster richColors/>
      {loader && <Spinner />}
      <div className="bg-white flex flex-col font-markoone  items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col  items-center justify-center w-full">
          <LandingPageHeader className="bg-orange-50  flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
          <div class="w-full h-screen flex font-manrope">
            <div class="relative overflow-hidden flex w-1/2 bg-gradient-to-tr from-orange-600 to-purple-300 i justify-around items-center ">
              <div>
                <div className="flex flex-row gap-x-1 items-center justify-start">
                  <HomeModernIcon className="h-8 w-8 text-white" />
                  <span
                    className="text-white text-xl mt-2.5 font-semibold"
                    size="txtMarkoOneRegular20"
                  >
                    BidLand
                  </span>
                </div>
                <p class="text-white mt-1 ">
                  The most popular property selling platform
                </p>
                <button
                  type="submit"
                  class="block w-36  bg-indigo-600 hover:bg-indigo-700  text-white mt-4 py-3 rounded-2xl font-semibold mb-2"
                >
                  Read More
                </button>
              </div>
              <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
              <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
              <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 "></div>
              <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 "></div>
            </div>
            <div class="flex w-1/2 justify-center py-10  items-center bg-white font-manrope">
              <form class=" w-1/2" onSubmit={LoginForm.handleSubmit}>
                <h1 class="text-gray-800 text-center font-bold text-2xl mb-1">
                  Welcome Back
                </h1>
                <p class="text-sm text-center font-normal text-gray-600 mb-7">
                  Login Your Account
                </p>
                <div class="flex items-center justify-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                  <input
                    class="pl-2 outline-none border-none w-full rounded-lg"
                    type="email"
                    name="email"
                    id="email"
                    value={LoginForm.email}
                    onChange={LoginForm.handleChange}
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <input
                    class="pl-2 outline-none border-none w-full rounded-lg"
                    type="password"
                    name="password"
                    id="password"
                    value={LoginForm.password}
                    onChange={LoginForm.handleChange}
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="flex items-center justify-between py-3">
                  <span
                    class="text-sm ml-2 hover:text-blue-500 cursor-pointer"
                    onClick={() => handleForgetPass()}
                  >
                    Forgot Password ?
                  </span>
                  <span class="text-sm mr-3">
                    Don't have an account?{" "}
                    <Link
                      className="hover:text-blue-500 cursor-pointer hover:underline"
                      to="/register"
                    >
                      Create
                    </Link>
                  </span>
                </div>
                <button
                  type="submit"
                  class="block w-full bg-indigo-600 hover:bg-indigo-700 mt-4 py-4  text-white rounded-2xl tracking-wide font-semibold mb-2"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  class="block w-full bg-indigo-600 hover:bg-indigo-700 mt-4 py-4  text-white rounded-2xl tracking-wide font-semibold mb-2"
                >
                  Create New Account
                </button>
              </form>
            </div>
          </div>
        </div>
        <LandingPageFooter className="bg-orange-50  flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
};

export default Login;
