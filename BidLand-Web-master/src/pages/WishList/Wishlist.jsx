import React, { useEffect, useState } from "react";

import {
  Button,
  GoogleMap,
  Img,
  Input,
  List,
  SelectBox,
  Text,
} from "components";
import LandingPageCard from "components/LandingPageCard";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import axios from "axios";
import { Fragment } from "react";
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Transition,
} from "@headlessui/react";
import { HeartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

const sortOptions = [
  { name: "Most Popular", href: "#" },
  { name: "Best Rating", href: "#" },
  { name: "Newest", href: "#" },
];
const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "tees", label: "Tees" },
      { value: "crewnecks", label: "Crewnecks" },
      { value: "hats", label: "Hats" },
    ],
  },
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "clothing-company", label: "Clothing Company" },
      { value: "fashion-inc", label: "Fashion Inc." },
      { value: "shoes-n-more", label: "Shoes 'n More" },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "black", label: "Black" },
      { value: "grey", label: "Grey" },
    ],
  },
  {
    id: "sizes",
    name: "Sizes",
    options: [
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Wishlist = () => {
  const [listing, setListing] = useState(JSON.parse(localStorage.getItem("wishlist")));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()


  
 

  const handlePropertyDetails = (id) => {
    navigate(`/propertydetails/${id}`);
  };

  return (
    <>
      <div className="bg-white flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col md:gap-10 gap-y-10 items-center justify-center w-full">
          <LandingPageHeader className="bg-orange-50 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
          <div className="w-full sm:px-6 px-32 font-manrope">
            <section aria-labelledby="filter-heading">
              <h2 id="filter-heading" className="text-4xl font-bold mb-10">
                WishList Properties
              </h2>
            </section>
          </div>

          <div className="flex flex-row font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full ">
            <div className="flex  flex-row gap-6 items-start justify-center mx-auto w-full">
              <div className="flex flex-row items-start justify-start w-full">
                <div className="md:gap-5 gap-x-10 grid md:grid-cols-1 grid-cols-3 justify-center  w-full">
                  {listing?.length > 0 ?
                  listing?.map((property) => (
                    <div className="border border-solid flex items-start justify-start rounded-lg w-full">
                      <div className="flex flex-col gap-[27px] items-start justify-start w-full">
                        <div className="flex flex-col relative">
                          <img
                            className="h-96 w-full object-center object-cover rounded-t-lg "
                            src={property?.images[0]}
                            alt="eye"
                          />
                          <div className="flex w-full items-center justify-between pr-2 pl-2">
                            <h2 className="text-xl font-semibold px-4 pt-4 font-manrope">
                              {property?.name}
                            </h2>
                            <h2 className="text-xl font-semibold px-4 pt-4 font-manrope">
                              {"Rs " + property?.fixedPrice}
                            </h2>
                          </div>
                        </div>

                        <div className="flex flex-col gap-[21px] items-start justify-start w-full px-4">
                          <div className="flex flex-row gap-10 items-center justify-between w-full px-4">
                            <div className="flex flex-1 flex-row gap-3 items-center justify-start w-full">
                              <Img
                                className="h-5 w-5"
                                src="images/img_bookmark.svg"
                                alt="bookmark"
                              />
                              <Text
                                className="flex-1 text-base text-gray-700 w-auto"
                                size="txtManropeSemiBold16Gray700"
                              >
                                {property?.specifications[0]}
                              </Text>
                            </div>
                            <div className="flex flex-1 flex-row gap-3 items-center justify-start w-full">
                              <Img
                                className="h-5 w-5"
                                src="images/img_ticket.svg"
                                alt="ticket"
                              />
                              <Text
                                className="text-base text-gray-700 w-auto"
                                size="txtManropeSemiBold16Gray700"
                              >
                                {property?.specifications[1]}
                              </Text>
                            </div>
                          </div>
                          <div className="flex flex-row gap-10 items-center justify-between w-full px-4">
                            <div className="flex flex-1 flex-row gap-3 items-center justify-start w-full">
                              <Img
                                className="h-5 w-5"
                                src="images/img_icon.svg"
                                alt="icon"
                              />
                              <Text
                                className="flex-1 text-base text-gray-700 w-auto"
                                size="txtManropeSemiBold16Gray700"
                              >
                                {property?.specifications[2]}
                              </Text>
                            </div>
                            <div className="flex flex-1 flex-row gap-3 items-center justify-start w-full">
                              <Img
                                className="h-5 w-5"
                                src="images/img_settings.svg"
                                alt="settings"
                              />
                              <Text
                                className="text-base text-gray-700 w-auto"
                                size="txtManropeSemiBold16Gray700"
                              >
                                {property?.specifications[3]}
                              </Text>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-start w-full">
                          <button
                            className="bg-gray-900 cursor-pointer text-white flex-1 font-manrope font-semibold py-5 rounded-[10px] text-base text-center  w-full"
                            onClick={() => handlePropertyDetails(property?._id)}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  )): "No Properties Added"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <LandingPageFooter className="bg-orange-50 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
};

export default Wishlist;
