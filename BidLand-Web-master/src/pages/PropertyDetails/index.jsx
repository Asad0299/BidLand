import React, { useEffect } from "react";

import { Button, GoogleMap, Img, Input, List, Text } from "components";
import LandingPageCard from "components/LandingPageCard";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Menu } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import {
  Dialog,
  Disclosure,
  Popover,
  RadioGroup,
  Tab,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  CheckCircleIcon,
  ChevronDownIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster, toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import moment from "moment";

const product = {
  name: "Zip Tote Basket",
  price: "$140",
  rating: 4,
  images: [
    {
      id: 1,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    // More images...
  ],
  colors: [
    {
      name: "Washed Black",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Washed Gray",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: "Features",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
    // More sections...
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const PropertyDetailsPage = () => {
  var userPic = localStorage.getItem("userData");
  var userId = localStorage.getItem("userId");
  var token = localStorage.getItem("JWT");
  var userName = localStorage.getItem("userName");
  var userEmail = localStorage.getItem("userEmail");
  var userVerification = localStorage.getItem("userVerify");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [reviewFormvisible, setReviewFormvisible] = useState(false);
  const [queryFormvisible, setQueryFormvisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [sellerInfo, setSellerInfo] = useState(null);
  const [propertyImages, setPropertyImages] = useState([]);
  const [propertyCoordinates, setPropertyCoordiantes] = useState(null);
  const [propertyBids, setPropertyBids] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [queries, setQueries] = useState([]);
  useEffect(() => {
    const handleLisitng = async () => {
      try {
        await axios
          .get(`http://localhost:3000/property/view/${id}`)
          .then((res) => {
            setPropertyDetails(res?.data?.property);
            setPropertyImages(res?.data?.property?.images);
            setPropertyCoordiantes(res?.data?.property?.location?.coordinates);
            setPropertyBids(res?.data?.property?.bids);
            console.log(res?.data?.property?.location?.coordinates);
            console.log(res?.data?.property);
            setReviews(res?.data?.property?.reviews);
            setQueries(res?.data?.property?.queries)
          });
      } catch (error) {
        console.log(error);
      }
    };
    handleLisitng();
  }, []);

  const sortedBids = [...propertyBids]?.sort(
    (a, b) => b.biddingPrice - a.biddingPrice
  );

  const filterBids = sortedBids?.filter((bid) => bid?.userId === userId);

  console.log("filterBids", filterBids);

  useEffect(() => {
    const handleSellerInfo = async () => {
      try {
        await axios
          .get(`http://localhost:3000/auth/seller/${propertyDetails?.addedBy}`)
          .then((res) => {
            console.log(res?.data?.seller);
            setSellerInfo(res?.data?.seller);
          });
      } catch (error) {
        console.log(error);
      }
    };
    handleSellerInfo();
  }, [propertyDetails]);

  const formik = useFormik({
    initialValues: {
      username: userName,
      email: userEmail,
    },
    onSubmit: (values) => {
      var JSON = {
        username: userName,
        profilePicture: userPic,
        reviewText: values.review,
        email: userEmail,
        rating: values.rating,
      };
      try {
        axios
          .post(`http://localhost:3000/property/review/${id}`, JSON)
          .then((res) => {
            console.log(res);
            toast.success("Successfully Added Review");
            location.reload();
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      } catch (error) {
        console.log(error);
      }
      handelreset();
    },
  });
  const handelreset = () => {
    formik.resetForm();
  };

  const ReportForm = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      var JSON = {
        feedbackMessage: values.feedbackMessage,
        feedbackReason: values.feedbackReason,
      };
      try {
        axios
          .post(`http://localhost:3000/property/report/${id}`, JSON, config)
          .then((res) => {
            toast.success(res?.data?.message);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message);
          });
      } catch (error) {
        console.log(error);
      }
    },
    enableReinitialize: true,
  });

  const hanldeCheckout = async () => {
    const response = await fetch(
      "http://localhost:3000/property/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: propertyDetails?._id,
          name: propertyDetails?.name,
          fixedPrice: propertyDetails?.fixedPrice,
        }),
      }
    );

    console.log(response);

    const stripe = await loadStripe(
      "pk_test_51NO5Z9COYbX4EEUkrTs8Zb2tvXYstfc1aLzXCwlg1k9bOKy5BPuriLZAgCjMNmXkERdYyzwYEKz6P0OzF2IkVdjg00ly46twDk"
    );
    const session = await response.json();
    console.log(session);
    const json = {
      sessionId: session?.sessionId,
      userId: userId,
      propertyId: propertyDetails?._id,
      totalPrice: propertyDetails?.fixedPrice,
      paymentMethod: "card",
    };
    console.log(json);
    try {
      axios
        .post("http://localhost:3000/orders/create", json)
        .then(async (res) => {
          const result = await stripe.redirectToCheckout({
            sessionId: session?.sessionId,
          });
          if (result.error) {
            console.error(result.error.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const Query = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      var JSON = {
        userDetails: {
          name: userName,
          email: userEmail,
          profilePicture: userPic,
        },
        queryText: values.queryText,
      };
      console.log(JSON);
      try {
        axios
          .post(`http://localhost:3000/property/add-query/${id}`, JSON, config)
          .then((res) => {
            console.log(res?.data);
            toast.success("Successfully Sent Query");
            location.reload();
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Toaster richColors />
      <div className="bg-white flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col md:gap-10 gap-[60px] items-start justify-start w-full">
          <div className="flex flex-col gap-10 items-start justify-start w-full">
            <LandingPageHeader className="bg-orange-50 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
            <main className="max-w-7xl mx-auto font-manrope my-12">
              <div className="max-w-none">
                {/* Product */}
                <div className="grid grid-cols-2 items-start gap-x-8">
                  {/* Image gallery */}
                  <Tab.Group as="div" className="flex flex-col-reverse">
                    {/* Image selector */}
                    <div className="mx-auto mt-6  w-full max-w-2xl sm:block lg:max-w-none">
                      <Tab.List className="grid grid-cols-4 gap-6">
                        {propertyImages?.map((image) => (
                          <Tab className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4">
                            {({ selected }) => (
                              <>
                                <span className="absolute inset-0 overflow-hidden rounded-md">
                                  <img
                                    src={image}
                                    alt="Loading"
                                    className="h-full w-full object-cover object-center rounded-sm"
                                  />
                                </span>
                                <span
                                  className={classNames(
                                    selected
                                      ? "ring-indigo-500"
                                      : "ring-transparent",
                                    "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>

                    <Tab.Panels className="aspect-h-1 aspect-w-1 w-full ">
                      {propertyImages?.map((image) => (
                        <Tab.Panel>
                          <img
                            src={image}
                            alt="Loding"
                            className="h-full w-full object-cover object-center rounded-lg"
                          />
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  {/* Product info */}
                  <div className=" px-4 ">
                    <div className="flex justify-between items-center">
                      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {propertyDetails?.name}
                      </h1>
                      <div>
                        <Menu as="div" className="relative">
                          <Menu.Button className="-m-1.5 flex items-center p-1.5">
                            <span className="sr-only">Open user menu</span>
                            <span className="flex items-center">
                              <EllipsisVerticalIcon
                                className=" h-8 w-8 "
                                aria-hidden="true"
                              />
                            </span>
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-3 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      if (token) {
                                        document
                                          .getElementById("my_modal_3")
                                          .showModal();
                                      } else {
                                        toast.error("User Not Login");
                                      }
                                    }}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "flex px-4 py-2 w-full text-sm text-gray-700"
                                    )}
                                  >
                                    Report
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                        <dialog id="my_modal_3" className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                              </button>
                            </form>
                            <h3 className="font-bold text-xl">Report</h3>
                            <form onSubmit={ReportForm.handleSubmit}>
                              <div className="py-6">
                                <label
                                  for="feedbackMessage"
                                  class="block mb-2 text-sm font-medium text-gray-900"
                                >
                                  Feedback
                                </label>
                                <textarea
                                  id="feedbackMessage"
                                  name="feedbackMessage"
                                  value={ReportForm.values.feedbackMessage}
                                  onChange={ReportForm.handleChange}
                                  rows="4"
                                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Write your feedback"
                                ></textarea>
                                <label
                                  for="feedbackReason"
                                  class="block mb-2 text-sm font-medium text-gray-900 mt-6"
                                >
                                  Select an option
                                </label>
                                <select
                                  id="feedbackReason"
                                  name="feedbackReason"
                                  value={ReportForm.values.feedbackReason}
                                  onChange={ReportForm.handleChange}
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                >
                                  <option selected>Choose a option</option>
                                  <option value="Fake Post">Fake Post</option>
                                  <option value="Bidding Scam">
                                    Bidding Scam
                                  </option>
                                </select>
                              </div>
                              <div className="flex justify-end">
                                <button
                                  type="submit"
                                  className="bg-blue-500 rounded-md px-4 py-2 text-white"
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                        </dialog>
                      </div>
                    </div>
                    <div className="my-4">
                      <h2 className="sr-only">Product information</h2>
                      <p className="text-3xl tracking-tight text-gray-900">
                        {"Rs " + propertyDetails?.fixedPrice}
                      </p>
                    </div>

                    {/* Reviews */}
                    <div className="my-4">
                      <h3 className="text-lg font-semibold">Reviews</h3>
                      <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                product.rating > rating
                                  ? "text-orange-500"
                                  : "text-gray-300",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="">{product.rating} out of 5 stars</p>
                      </div>
                    </div>

                    <div className="my-4">
                      <h3 className="text-lg font-semibold">Description</h3>

                      <span className="space-y-6 text-base text-gray-700">
                        {propertyDetails?.description}
                      </span>
                      {token &&
                      userVerification === "true" &&
                      propertyDetails?.winner === userId &&
                      propertyDetails?.isBiddingWinnerDeclared === true ? (
                        <div className="my-4">
                          <button
                            className="w-full h-11 bg-blue-700 hover:bg-blue-600 rounded-lg text-white"
                            onClick={hanldeCheckout}
                          >
                            Purchase Property
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <section aria-labelledby="details-heading" className="mt-8">
                      <h2
                        id="details-heading "
                        className="text-lg font-semibold"
                      >
                        Additional details
                      </h2>

                      <div className="divide-y divide-gray-200 border-t">
                        {product.details.map((detail) => (
                          <Disclosure as="div" key={detail.name}>
                            {({ open }) => (
                              <>
                                <h3>
                                  <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                    <span
                                      className={classNames(
                                        open
                                          ? "text-indigo-600"
                                          : "text-gray-900",
                                        "text-base font-medium"
                                      )}
                                    >
                                      Specifications
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel
                                  as="div"
                                  className="prose prose-sm pb-6"
                                >
                                  <ul role="list">
                                    {propertyDetails?.specifications?.map(
                                      (item) => (
                                        <div className="flex items-center gap-x-3">
                                          <span className="bg-gray-500 w-1.5 h-1.5 block rounded-full"></span>
                                          <li key={item}>{item}</li>
                                        </div>
                                      )
                                    )}
                                  </ul>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </div>
                      <div className="divide-y divide-gray-200 border-t">
                        {product.details.map((detail) => (
                          <Disclosure as="div" key={detail.name}>
                            {({ open }) => (
                              <>
                                <h3>
                                  <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                    <span
                                      className={classNames(
                                        open
                                          ? "text-indigo-600"
                                          : "text-gray-900",
                                        "text-base font-medium"
                                      )}
                                    >
                                      Features
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel
                                  as="div"
                                  className="prose prose-sm pb-6"
                                >
                                  <ul role="list">
                                    {propertyDetails?.specifications?.map(
                                      (item) => (
                                        <div className="flex items-center gap-x-3">
                                          <span className="bg-gray-500 w-1.5 h-1.5 block rounded-full"></span>
                                          <li key={item}>{item}</li>
                                        </div>
                                      )
                                    )}
                                  </ul>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="max-w-7xl mx-auto font-manrope flex flex-col gap-y-10">
          <div>
            <h1 className="text-xl mb-2 text-gray-900 font-semibold">
              Map View:
            </h1>
            <iframe
              className="w-[80rem] rounded-lg h-72 sm:h-96"
              marginheight="0"
              marginwidth="0"
              src={`https://maps.google.com/maps?q=${propertyCoordinates?.coordinates[0]},${propertyCoordinates?.coordinates[1]}&hl=en&z=14&amp&output=embed`}
            ></iframe>
          </div>
          <div className="bg-white border border-bluegray-100 border-solid flex flex-col items-start justify-start sm:px-5 rounded-[10px] w-full">
            <div className="flex flex-col gap-[26px] items-start justify-start w-full bg-gray-100 px-10 py-4">
              <Text
                className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full "
                size="txtManropeExtraBold28"
              >
                Seller Information
              </Text>
              <Link to={`/agentprofile/${sellerInfo?._id}`} className="w-full">
                <div className="flex flex-row gap-6 items-center justify-start w-full rounded-lg cursor-pointer bg-white">
                  <Img
                    className="h-48 object-cover object-center rounded-full w-48"
                    src={
                      sellerInfo?.profilePicture
                        ? sellerInfo?.profilePicture
                        : "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                    }
                    alt="rectangle5599"
                  />
                  <div className="flex flex-col gap-[3px] items-start justify-start w-auto mt-2">
                    <Text
                      className="text-gray-900 text-xl tracking-widder w-auto"
                      size="txtManropeSemiBold20Gray900"
                    >
                      {sellerInfo?.username.toUpperCase()}
                    </Text>
                    <div className="flex flex-row gap-3.5 items-center justify-start w-full">
                      <div className="flex flex-row gap-1 items-start justify-start w-auto">
                        <StarIcon className="w-5 h-5 text-orange-500" />
                        <StarIcon className="w-5 h-5 text-orange-500" />
                        <StarIcon className="w-5 h-5 text-orange-500" />
                        <StarIcon className="w-5 h-5 text-orange-500" />
                        <StarIcon className="w-5 h-5 text-orange-500" />
                        <Text
                          className="text-base text-gray-900 w-auto"
                          size="txtManropeSemiBold16"
                        >
                          (5.0 rating)
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2.5 items-center justify-start w-full">
                      <EnvelopeIcon className="w-5 h-5 text-gray-600" />
                      <Text
                        className="text-base text-gray-600 w-auto"
                        size="txtManropeMedium16"
                      >
                        {sellerInfo?.email}
                      </Text>
                    </div>
                    <div className="flex flex-row gap-2.5 items-center justify-start w-full">
                      <PhoneIcon className="w-5 h-5 text-gray-600" />
                      <Text
                        className="text-base text-gray-600 w-auto"
                        size="txtManropeMedium16"
                      >
                        {sellerInfo?.phone}
                      </Text>
                    </div>
                    <div className="flex flex-row gap-2.5 items-center justify-start w-full mt-1">
                      <Link to={`/user-chat/${id}`}>
                        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900">
                          Chat With Seller
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {token && (
        <div className="mt-8 flow-root w-full px-40">
        <h2 className="mb-6 ml-1 text-xl font-semibold">Queries</h2>
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
                          Seller Reply
                        </th>
                      
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
                            <div className="text-gray-900">
                              {bid?.queryText}
                            </div>
                            {/* <div className="mt-1 text-gray-500">{person.department}</div> */}
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {bid?.replyText ? bid?.replyText : "Waiting for Seller Reply..."}
                            </div>
                            {/* <div className="mt-1 text-gray-500">{person.department}</div> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>)}
         
        <div className="bg-white  px-40 w-full flex items-center justify-end ">
          <div className="w-full">
            {token && (
              <div className="flex justify-end items-center ">
                <button
                  onClick={() => setQueryFormvisible(true)}
                  type="button"
                  className="inline-flex items-center gap-x-2 rounded-md tracking-widest bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Query to Seller
                  <PencilIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
            {queryFormvisible && (
              <form onSubmit={Query.handleSubmit}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 ">
                    {/* <div class="grid gap-6 mb-6 grid-cols-2">
                      <div>
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          class="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 bg-gray-100"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="email"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          class="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 bg-gray-100"
                          required
                        />
                      </div>
                    </div> */}

                    <div className="w-full">
                      <label
                        htmlFor="queryText"
                        className="block text-lg font-medium leading-6 text-gray-900"
                      >
                        Query
                      </label>
                      <div className="mt-2">
                        <textarea
                          type="text"
                          id="queryText"
                          name="queryText"
                          onChange={Query.handleChange}
                          value={Query.values.queryText}
                          className="block w-full rounded-md border-0 pb-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    onClick={() => setQueryFormvisible(false)}
                    className="text-sm px-6 py-1.5 font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    // onClick={() => setReviewFormvisible(!reviewFormvisible)}
                    type="submit"
                    className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
            
          </div>
        </div>

        
        <div className="w-full px-44">
        {token && ( 
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold leading-6 text-gray-900">
                  Property Bids
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the users who bids for this property.
                </p>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle px-4 rounded-md">
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
                          Bidding Amount
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Status
                        </th>
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
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                      {filterBids?.length > 0 ? (
                        filterBids?.map((bid) => (
                          <tr key={bid?._id}>
                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                              <div className="flex items-center">
                                <div className="h-11 w-11 flex-shrink-0">
                                  <img
                                    className="h-11 w-11 rounded-full"
                                    src={bid?.user?.profilePicture}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">
                                    {bid?.user?.username}
                                  </div>
                                  <div className="mt-1 text-gray-500">
                                    {bid?.user?.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                {"Rs " + bid?.biddingPrice.toLocaleString()}
                              </span>
                              {/* <div className="mt-1 text-gray-500">{person.department}</div> */}
                            </td>
                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                Active
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                {bid?.user?.role}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                {bid?.timestamp?.split("T")[0]}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                              {bid?.winInfo?.winnerUserId ? (
                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                  Win
                                </span>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <span className="text-gray-600">No Bids Yet</span>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>)}

          <div className="bg-white mt-20">
            <div>
              {token && (
                <div className="flex justify-end items-center mt-6">
                  <button
                    onClick={() => setReviewFormvisible(true)}
                    type="button"
                    className="inline-flex items-center gap-x-2 rounded-md tracking-widest bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Write Review
                    <PencilIcon
                      className="-mr-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              )}

              {reviewFormvisible && (
                <form onSubmit={formik.handleSubmit}>
                  <div class="flex justify-center flex-col sm:pt-0 pt-4 items-center gap-y-4">
                    <h2 class="text-xl font-medium text-gray-900">Score</h2>
                    <div class="flex justify-center items-start">
                      <div class="center">
                        <div class="stars">
                          <input
                            type="radio"
                            id="five"
                            name="rating"
                            checked={formik.values.rating === 5}
                            onChange={() => formik.setFieldValue("rating", 5)}
                            value="5"
                          />
                          <label for="five"></label>
                          <input
                            type="radio"
                            id="four"
                            name="rating"
                            checked={formik.values.rating === 4}
                            onChange={() => formik.setFieldValue("rating", 4)}
                            value="4"
                          />
                          <label for="four"></label>
                          <input
                            type="radio"
                            id="three"
                            checked={formik.values.rating === 3}
                            onChange={() => formik.setFieldValue("rating", 3)}
                            name="rating"
                            value="3"
                          />
                          <label for="three"></label>
                          <input
                            type="radio"
                            id="two"
                            checked={formik.values.rating === 2}
                            onChange={() => formik.setFieldValue("rating", 2)}
                            name="rating"
                            value="2"
                          />
                          <label for="two"></label>
                          <input
                            type="radio"
                            checked={formik.values.rating === 1}
                            onChange={() => formik.setFieldValue("rating", 1)}
                            id="one"
                            name="rating"
                            value="1"
                          />
                          <label for="one"></label>
                          <span class="result"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {/* <div className="sm:col-span-3">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              disabled
                              value={formik.values.username}
                              name="username"
                              id="username"
                              autoComplete="given-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div> */}

                        {/* <div className="sm:col-span-3">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email
                          </label>
                          <div className="mt-2">
                            <input
                              disabled
                              value={formik.values.email}
                              type="email"
                              name="email"
                              id="email"
                              autoComplete="family-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div> */}

                        <div className="w-full">
                          <label
                            htmlFor="review"
                            className="block text-lg font-medium leading-6 text-gray-900"
                          >
                            Review
                          </label>
                          <div className="mt-2">
                            <textarea
                              type="text"
                              onChange={formik.handleChange}
                              value={formik.values.review}
                              name="review"
                              id="review"
                              autoComplete="review"
                              className="block w-full rounded-md border-0 pb-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 bg-gray-100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      onClick={() => setReviewFormvisible(!reviewFormvisible)}
                      className="text-sm px-6 py-1.5 font-semibold leading-6 text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      // onClick={() => setReviewFormvisible(!reviewFormvisible)}
                      type="submit"
                      className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}
              <h2 className="text-xl font-semibold ml-2">Reviews</h2>
              <div className="mb-1 mt-8 h-80 overflow-y-auto ">
                {reviews?.length > 0
                  ? reviews?.map((review, reviewIdx) => (
                      <div
                        key={review._id}
                        className="flex space-x-4 text-sm text-gray-500 bg-gray-100 px-5"
                      >
                        <div className="flex-none py-4">
                          <img
                            src={review?.profilePicture}
                            alt=""
                            className="h-10 w-10 rounded-full bg-gray-900"
                          />
                        </div>
                        <div
                          className={classNames(
                            reviewIdx === 0 ? "" : "border-t border-gray-200",
                            "flex-1 py-4"
                          )}
                        >
                          <h3 className="font-medium tracking-wider text-gray-900">
                            {review.username}
                          </h3>
                          <p>
                            {/* <time dateTime={review.datetime}>{review.date}</time> */}
                          </p>

                          <div className="mt-2 flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={classNames(
                                  review.rating > rating
                                    ? "text-yellow-400"
                                    : "text-gray-300",
                                  "h-5 w-5 flex-shrink-0"
                                )}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <p className="sr-only">
                            {review.rating} out of 5 stars
                          </p>

                          <div className="prose prose-sm mt-2 max-w-none text-gray-500">
                            {review.reviewText}
                          </div>
                        </div>
                      </div>
                    ))
                  : "No Reviews Yet"}
              </div>
            </div>
          </div>
        </div>

        <LandingPageFooter className="bg-orange-50 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
};

export default PropertyDetailsPage;
