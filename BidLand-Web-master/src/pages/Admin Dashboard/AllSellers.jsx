import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

const AllSellers = () => {
  var token = localStorage.getItem("JWT");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [users, setUsers] = useState(null);
  const [cnicFront, setCNICFront] = useState(null);
  const [cnicBack, setCNICBack] = useState(null);
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    try {
      axios.get("http://localhost:3000/auth/get-all-sellers").then((res) => {
        console.log(res?.data?.sellers);
        setUsers(res?.data?.sellers);
        setLoader(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleVerification = (id) => {
    setLoader(true);
    try {
      axios.get(`http://localhost:3000/auth/user/${id}`).then((res) => {
        console.log(res?.data);
        setUser(res?.data?.user);
        setCNICFront(res?.data?.user?.verification?.cnicFront);
        setCNICBack(res?.data?.user?.verification?.cnicBack);
        setLoader(false);
        document.getElementById("my_modal_3").showModal();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const hanldeVerifyUser = (status) => {
    setLoader(true);
    if (status == "Verify") {
      const JSON = {
        userId: user?._id,
        status: "Approved",
      };
      try {
        axios
          .post(`http://localhost:3000/auth/manage-verification`, JSON, config)
          .then((res) => {
            console.log(res?.data);
            toast.success("User Verified Successfully");
            setLoader(false);
          });
      } catch (error) {
        console.log(error);
      }
    } else if (status == "Reject") {
      const JSON = {
        userId: user?._id,
        status: "Rejected",
        reason: "Fake Documents",
      };
      try {
        axios
          .post(`http://localhost:3000/auth/manage-verification`, JSON, config)
          .then((res) => {
            console.log(res?.data);
            toast.success("User Rejected Successfully");
            setLoader(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Toaster richColors />
      {loader ? (
          <div class="text-center flex h-[80vh] mx-auto justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
        </div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold leading-6 text-gray-900">
                Users
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the users in your account including their name,
                title, email and role.
              </p>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 h-[40rem] overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300 border rounded-lg ">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users?.map((person) => (
                      <tr key={person?.id}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="h-11 w-11 flex-shrink-0">
                              <img
                                className="h-11 w-11 rounded-full"
                                src={
                                  person?.profilePicture
                                    ? person?.profilePicture
                                    : "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                                }
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {person?.username}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {person?.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {person?.phone}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {person?.role == "seller" && "Seller"}
                          </span>
                        </td>
                        <td className="flex items-center gap-x-2 justify-center whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 ">
                          <button
                            className="text-white px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 relative"
                            onClick={() => handleVerification(person?._id)}
                          >
                            Check Verification
                            {person?.verification?.status == "Requested" && (
                              <span className="bg-red-500 text-white text-base rounded-full px-2 absolute -top-3 -right-3">
                                1
                              </span>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-2xl mb-10">Verification</h3>
                    {cnicFront != null && cnicBack != null ? (
                      <>
                        <div className="py-4 flex flex-col gap-y-4">
                          <div className="flex flex-col items-center gap-y-2">
                            <span className="text-lg text-gray-900 font-semibold">
                              User CNIC Front
                            </span>
                            <a
                              href={cnicFront}
                              target="__blank"
                              className="bg-blue-500 px-20 py-3 rounded-lg text-white font-semibold"
                            >
                              View CNIC Front
                            </a>
                          </div>
                          <div className="flex flex-col items-center gap-y-2">
                            <span className="text-lg text-gray-900 font-semibold">
                              User CNIC Back
                            </span>
                            <a
                              href={cnicBack}
                              target="__blank"
                              className="bg-blue-500 px-20 py-3 rounded-lg text-white font-semibold"
                            >
                              View CNIC Back
                            </a>
                          </div>
                        </div>
                        {user?.verification?.status == "Requested" && (
                          <div className="flex items-end justify-end gap-x-2 mt-10">
                            <button
                              className="bg-green-500 rounded-md px-6 py-3 text-white font-semibold"
                              onClick={() => hanldeVerifyUser("Verify")}
                            >
                              Verify
                            </button>
                            <button
                              className="bg-red-500 rounded-md px-6 py-3 text-white font-semibold"
                              onClick={() => hanldeVerifyUser("Reject")}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {user?.verification?.status == "Approved" && (
                          <div className="flex items-center justify-center gap-x-2 mt-10">
                            <span className="bg-green-500 px-3 py-2 rounded-full text-white font-semibold">
                              Verified
                            </span>
                          </div>
                        )}
                        {user?.verification?.status == "Rejected" && (
                          <div className="flex items-center justify-center gap-x-2 mt-10">
                            <span className="bg-red-500 px-3 py-2 rounded-full text-white font-semibold">
                              Rejected
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      "CNIC Not Uploaded By User"
                    )}
                  </div>
                </dialog>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllSellers;
