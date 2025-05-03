import React, { useEffect, useState } from "react";
import { ArrowSmallLeftIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useFormik } from "formik";

const Queries = () => {
  var userId = localStorage.getItem("userId");
  var token = localStorage.getItem("JWT");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [properties, setProperties] = useState([]);
  const [queries, setQueries] = useState([]);
  const [show, setShow] = useState(false);
  const [propertyId, setPropertyId] = useState("");
  const [queryId, setQueryId] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    try {
      axios
        .get(`http://localhost:3000/property/${userId}/properties`)
        .then((res) => {
          console.log(res?.data);
          setProperties(res?.data?.properties);
          setLoader(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlePropertyBids = (id) => {
    setShow(true);
    setPropertyId(id);
    try {
      axios.get(`http://localhost:3000/property/view/${id}`).then((res) => {
        setQueries(res?.data?.property?.queries);
        console.log(res?.data?.property?.bids);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Reply = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      console.log(values);
      const json = {
        propertyId: propertyId,
        replyText: values.replyText,
      };
      try {
        axios
          .post(`http://localhost:3000/property/reply-query/${queryId}`, json)
          .then((res) => {
            //   setQueries(res?.data?.property?.queries);
            console.log(res?.data);
          });
      } catch (error) {
        console.log(error);
      }
    },
    enableReinitializer: true,
  });

  //   const handleWinBid = (bid) => {
  //     console.log(bid);
  //     const json = {
  //       propertyId: bid?.propertyId,
  //       winnerUserId: bid?.userId,
  //       bidId: bid?._id,
  //     };
  //     try {
  //       axios.post(`http://localhost:3000/property/win-bid`, json, config).then((res) =>{
  //         console.log(res?.data);
  //         toast.success(res?.data?.message)

  //       }).catch((err)=>{
  //         toast.error(err?.response?.data?.message);
  //       });
  //     } catch (error) {
  //       console.log(error?.response?.data?.message);
  //     }
  //   };
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
                Bids on Properties
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the properties added by me.
              </p>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 h-[20rem] overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full  align-middle sm:px-6 lg:px-8">
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
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Rating
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
                    {properties?.map((property) => (
                      <tr key={property?._id}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="h-11 w-11 flex-shrink-0">
                              <img
                                className="h-11 w-11 rounded-full"
                                src={
                                  property?.images[0]
                                    ? property?.images[0]
                                    : "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                                }
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {property?.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 ">
                          <p className="truncate w-60">
                            {property?.description}
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <p className="truncate w-40">
                            {property?.location?.address}
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {"Rs " + property?.fixedPrice}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          5.0 rating
                        </td>
                        <td className="flex items-center gap-x-2 justify-center whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <button
                            className="text-white px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
                            onClick={() => handlePropertyBids(property?._id)}
                          >
                            Show Queries
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {show && (
            <>
              <div className="sm:flex sm:items-center my-10">
                <div className="sm:flex-auto">
                  <h1 className="text-2xl font-semibold leading-6 text-gray-900">
                    Queries by Users
                  </h1>
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 h-[20rem] overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full  align-middle px-4 rounded-md">
                    <table className="min-w-full divide-y divide-gray-300 border">
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
                            Query
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Reply
                          </th>
                          {/*
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Actions
                      </th> */}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 ">
                        {queries?.map((bid) => (
                          <tr key={bid._id}>
                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                              <div className="flex items-center">
                                <div className="h-11 w-11 flex-shrink-0">
                                  <img
                                    className="h-11 w-11 rounded-full"
                                    src={bid?.userDetails?.profilePicture}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">
                                    {bid?.userDetails?.name}
                                  </div>
                                  <div className="mt-1 text-gray-500">
                                    {bid?.userDetails?.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                              <div className="text-gray-900 font-medium">
                                {"''" + bid?.queryText + "''"}
                              </div>
                              {/* <div className="mt-1 text-gray-500">{person.department}</div> */}
                            </td>

                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                              <form onSubmit={Reply.handleSubmit}>
                                <div className="flex gap-x-2">
                                  <label
                                    for="replyText"
                                    class="block mb-2 text-sm font-medium text-gray-900 sr-only"
                                  ></label>
                                  <textarea
                                    id="replyText"
                                    name="replyText"
                                    value={Reply.values.replyText}
                                    onChange={Reply.handleChange}
                                    rows="1"
                                    class="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                    placeholder="Write Query Reply...."
                                  ></textarea>
                                  <button
                                    type="submit"
                                    onClick={() => setQueryId(bid?._id)}
                                    className="bg-blue-500 px-5 py-1 rounded-md text-white"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </form>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Queries;
