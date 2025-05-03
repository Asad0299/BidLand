import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HomeModernIcon, PhoneIcon } from "@heroicons/react/20/solid";
import {storage} from "../../../fireabse";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Toaster, toast } from "sonner";
const Register = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [imgMetaData, setImgMetaData] = useState("")
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setLoader(true);
      setImage(e.target.files[0]);
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = (image) => {
    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    const storageRef = ref(storage, `images/${image.name}`);

    uploadBytes(storageRef, image)
      .then((snapshot) => {
        setImgMetaData(snapshot?.metadata?.fullPath)
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            setLoader(false); 
            toast.success("File uploaded successfully");
            setUrl(downloadURL);
          })
          .catch((error) => {
            toast.error("Error getting download URL:", error);
            setLoader(false);
          });
      })
      .catch((error) => {
        toast.error("Error uploading file:", error);
        setLoader(false);
      });
  };

  const SignUpForm = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "",
      phone: "",
      profilePicture: "",
    },
    onSubmit: async (values) => {
      var json = {
        username: values.username,
        email: values.email,
        password: values.password,
        role: values.role,
        phone: values.phone,
        profilePicture: url,
      };
      try {
        await axios
          .post("http://localhost:3000/auth/register", json)
          .then((res) => {
            console.log(res.data);
            toast.success("User Register Successfully")
            setTimeout(() => {
              navigate("/login")
            }, 500);
          }).catch((err) =>{
            console.log(err);
            toast.error(err?.response?.data?.message)
          });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });
  return (
    <>
    <Toaster richColors/>
      <div className="bg-white flex flex-col font-markoone  items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col  items-center justify-center w-full">
          <LandingPageHeader className="bg-orange-50  flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
          <div class="w-full h-screen flex font-manrope">
            <div class="relative overflow-hidden flex w-1/2 bg-gradient-to-tr from-purple-300 to-orange-500 i justify-around items-center ">
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
              <form class=" w-1/2" onSubmit={SignUpForm.handleSubmit}>
                <h1 class="text-gray-800 text-center font-bold text-2xl mb-1">
                  Welcome To BidLand
                </h1>
                <p class="text-sm text-center font-normal text-gray-600 mb-7">
                  Create Your Account
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
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                  <input
                    class="pl-2 outline-none border-none w-full rounded-lg"
                    type="text"
                    name="username"
                    id="username"
                    value={SignUpForm.username}
                    onChange={SignUpForm.handleChange}
                    placeholder="Username"
                    required
                  />
                </div>
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
                    value={SignUpForm.email}
                    onChange={SignUpForm.handleChange}
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
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
                    value={SignUpForm.password}
                    onChange={SignUpForm.handleChange}
                    placeholder="Password"
                    required
                  />
                </div>
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <input
                    class="pl-2 outline-none border-none w-full rounded-lg"
                    type="text"
                    name="phone"
                    id="phone"
                    value={SignUpForm.phone}
                    onChange={SignUpForm.handleChange}
                    placeholder="Phnoe Number"
                    required
                  />
                </div>
                <div class="flex items-center  mb-4">
                  <select
                    id="role"
                    name="role"
                    value={SignUpForm.role}
                    onChange={SignUpForm.handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-600 font-medium text-sm  py-4 px-4 rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Choose a role</option>
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>
                <div class="flex items-center">
                  <div class="flex items-center justify-center w-full">
                    {loader ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <label
                        for="dropzone-file"
                        class="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div class="flex flex-col items-center justify-center">
                          <svg
                            class="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>

                         {url ? <span className="bg-purple-100 text-sm rounded-full px-2 text-purple-800">{imgMetaData}
                         </span>: <p class="text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>}
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          class="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>
                  {/* <div>
                    <input type="file" onChange={handleImageChange} />
                    <p  className="bg-blue-400 p-3 " onClick={handleUpload}>Upload</p>
                    {url && <img   src={url} alt="Uploaded" />}
                  </div> */}
                </div>
                <div className="flex items-center justify-between py-3">
                  <span class="text-sm mr-3">
                    Already have account?{" "}
                    <Link
                      className="hover:text-blue-500 cursor-pointer hover:underline"
                      to="/login"
                    >
                      Login
                    </Link>
                  </span>
                </div>
                <button
                  type="submit"
                  class="block w-full bg-indigo-600 hover:bg-indigo-700 mt-4 py-4  text-white rounded-2xl tracking-wide font-semibold mb-2"
                >
                  Register
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

export default Register;
