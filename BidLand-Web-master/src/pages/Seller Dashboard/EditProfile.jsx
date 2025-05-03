import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import LandingPageHeader from "components/LandingPageHeader";
import LandingPageFooter from "components/LandingPageFooter";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import {storage} from "../../../fireabse";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Toaster, toast } from "sonner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [userPic, setUserPic] = useState("");
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [updaingProfile, setUpdaingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [accountDelete, setAccountDelete] = useState(false)
  const [imgMetaData, setImgMetaData] = useState("");
  const navigate = useNavigate();

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
        console.log("File uploaded successfully!", snapshot);
        setImgMetaData(snapshot?.metadata?.fullPath);
        // Get the download URL for the file
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            toast.success("File uploaded successfully");
            setUrl(downloadURL);
            setLoader(false); // Set the download URL in the component state
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

  useEffect(() => {
    const handleUserProfile = () => {
      try {
        axios.get(`http://localhost:3000/auth/user/${id}`).then((res) => {
          console.log(res?.data?.user);
          setUser(res?.data?.user);
          setUserPic(res?.data?.user?.profilePicture);
          ProfileForm.setValues({
            username: res?.data?.user?.username,
            email: res?.data?.user?.email,
            phone: res?.data?.user?.phone,
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleUserProfile();
  }, []);

  const ProfileForm = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      profilePicture: "",
    },
    onSubmit: async (values) => {
      var json = {
        username: values.username,
        email: values.email,
        password: values.password,
        phone: values.phone,
        profilePicture: url ? url : userPic,
      };
      try {
        setUpdaingProfile(true);
        await axios
          .put(`http://localhost:3000/auth/user/${id}`, json)
          .then((res) => {
            localStorage.setItem("userData", res?.data?.profilePicture);
            setUpdaingProfile(false);
            toast.success("Profile Updated Successfully");
          });
      } catch (error) {
        console.error("Error submitting form:", error);
        setUpdaingProfile(false);
        toast.error("Error Updating Profile");
      }
    },
    enableReinitialize: true,
  });

  const UpdatePassword = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    onSubmit: async (values) => {
      var json = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      };
      try {
        setUpdatingPassword(true)
        await axios
          .put(`http://localhost:3000/auth/update-password/${id}`, json)
          .then((res) => {
            console.log(res.data);
            setUpdatingPassword(false)
            toast.success("Password Updated Successfully")
          }).catch((err) =>{
            toast.error(err?.response?.data?.message)
            setUpdatingPassword(false)
          });
      } catch (error) {
        console.error("Error submitting form:", error);
        setUpdatingPassword(false)
        toast.error("Password Updation Error")
      }
    },
    enableReinitialize: true,
  });

  const handleDeleteAccount = (id) => {
    console.log(id);
    try {
      setAccountDelete(true)
      axios.delete(`http://localhost:3000/auth/delete/${id}`).then((res) => {
        console.log(res);
        toast.success("Account Deleted Successfully")
        setAccountDelete(false)
        navigate("/");
        
        localStorage.removeItem("JWT");
        localStorage.removeItem("userData");
        localStorage.removeItem("userPic");
        localStorage.removeItem("userId");
        location.reload();
      });
    } catch (error) {
      console.log(error);
      toast.error("Account Delete Error")
      setAccountDelete(false)
    }
  };

  return (
    <>
      <Toaster richColors />
      <div className="bg-white flex flex-col font-markoone  items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col  items-center justify-center w-full">
          <div className="divide-y divide-gray-300 font-manrope">
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7 ">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  You can edit your personal information here.
                </p>
              </div>

              <form
                className="md:col-span-2"
                onSubmit={ProfileForm.handleSubmit}
              >
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div className="col-span-full flex items-center gap-x-8">
                    <img
                      src={url ? url : userPic}
                      alt=""
                      className="h-24 w-24 flex-none rounded-full bg-gray-800 object-cover"
                    />
                    {loader ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600"
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
                        class="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50  hover:bg-gray-10"
                      >
                        <div class="flex flex-col items-center justify-center">
                          <svg
                            class="w-8 h-8 mb-2 text-gray-500 "
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

                          {url ? (
                            <span className="bg-purple-100 text-sm rounded-full px-2 text-purple-800">
                              {imgMetaData}
                            </span>
                          ) : (
                            <p class="text-sm text-gray-500 ">
                              <span class="font-semibold">Click to upload</span>{" "}
                              or drag and drop
                            </p>
                          )}
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
                  <div className="col-span-full">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 "
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        name="username"
                        value={ProfileForm.values.username}
                        onChange={ProfileForm.handleChange}
                        type="text"
                        className="block w-full rounded-md border-0 bg-gray-100 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 "
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={ProfileForm.values?.email}
                        onChange={ProfileForm.handleChange}
                        autoComplete="email"
                        className="block w-full rounded-md border-0 bg-gray-100 py-1.5 t shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 "
                    >
                      Phone No
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={ProfileForm.values?.phone}
                        onChange={ProfileForm.handleChange}
                        className="block w-full rounded-md border-0 bg-gray-100 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex">
                  {updaingProfile ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600"
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
                    <button
                      type="submit"
                      className="rounded-md bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7 ">
                  Change password
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  Update your password associated with your account.
                </p>
              </div>

              <form
                className="md:col-span-2"
                onSubmit={UpdatePassword.handleSubmit}
              >
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium leading-6 "
                    >
                      Current password
                    </label>
                    <div className="mt-2">
                      <input
                        id="currentPassword"
                        name="currentPassword"
                        value={UpdatePassword.values.currentPassword}
                        onChange={UpdatePassword.handleChange}
                        type="password"
                        className="block w-full rounded-md border-0 bg-gray-100 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium leading-6 "
                    >
                      New password
                    </label>
                    <div className="mt-2">
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={UpdatePassword.values.newPassword}
                        onChange={UpdatePassword.handleChange}
                        className="block w-full rounded-md border-0 bg-gray-100 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex">
                  {updatingPassword ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600"
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
                    <button
                      type="submit"
                      className="rounded-md bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7 ">
                  Delete account
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  No longer want to use our service? You can delete your account
                  here. This action is not reversible. All information related
                  to this account will be deleted permanently.
                </p>
              </div>

              <div className="flex items-start md:col-span-2">
               {accountDelete ? 
               <div role="status">
               <svg
                 aria-hidden="true"
                 class="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-red-600"
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
             </div>:
                <button
                  onClick={() => handleDeleteAccount(id)}
                  className="rounded-md bg-red-500 text-white px-4 py-4 text-sm font-semibold  shadow-sm hover:bg-red-400"
                >
                  Yes, delete my account
                </button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
