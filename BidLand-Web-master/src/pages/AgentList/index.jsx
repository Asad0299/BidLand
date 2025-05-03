import React, { useEffect, useState } from "react";

import { Button, Img, Input, List, SelectBox, Text } from "components";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import axios from "axios";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";

const dropdownlargeOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const AgentListPage = () => {
  const [allSellers, setAllSellers] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleSellersList = () => {
      try {
        axios.get("http://localhost:3000/auth/get-all-sellers").then((res) => {
          console.log(res?.data?.sellers);
          setAllSellers(res?.data?.sellers);
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleSellersList();
  }, []);

  const handleClick = (id) => {
    navigate(`/agentprofile/${id}`);
  };
  return (
    <>
      <div className="bg-white flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col gap-14 items-start justify-start w-full">
          <LandingPageHeader className="bg-orange-50  flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
          <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
            <div className="flex flex-col gap-6 items-center justify-center max-w-[1200px] mx-auto w-full">
              <Text
                className="text-4xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-full"
                size="txtManropeExtraBold36"
              >
                Sellers Profile
              </Text>
              {/* <div className="flex md:flex-col flex-row gap-4 items-center justify-start w-full">
                <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-1 flex-col items-start justify-start px-4 py-3.5 rounded-[10px] w-full">
                  <Input
                    name="frame1000001612"
                    placeholder="Enter your address"
                    className="font-semibold p-0 placeholder:text-gray-600 text-gray-600 text-left text-lg w-full"
                    wrapClassName="flex pt-1 w-full"
                    suffix={
                      <Img
                        className="mt-auto mb-[3px] h-6 ml-3"
                        src="images/img_search_gray_600.svg"
                        alt="search"
                      />
                    }
                  ></Input>
                </div>
                <SelectBox
                  className="bg-white-A700 border border-bluegray-100 border-solid md:flex-1 font-bold pl-5 pr-4 py-[17px] rounded-[10px] text-gray-600 text-left text-lg w-[12%] md:w-full"
                  placeholderClassName="text-gray-600"
                  indicator={
                    <Img
                      className="h-6 w-6"
                      src="images/img_arrowdown_gray_600_24x24.svg"
                      alt="arrow_down"
                    />
                  }
                  isMulti={false}
                  name="dropdownlarge"
                  options={dropdownlargeOptionsList}
                  isSearchable={false}
                  placeholder="Review"
                />
                <Button
                  className="bg-gray-900 cursor-pointer flex items-center justify-center min-w-[128px] pl-5 pr-4 py-[17px] rounded-[10px]"
                  rightIcon={
                    <Img
                      className="h-5 mt-px mb-[3px] ml-2.5"
                      src="images/img_search_white_a700.svg"
                      alt="search"
                    />
                  }
                >
                  <div className="font-bold text-left text-lg text-white-A700">
                    Search
                  </div>
                </Button>
              </div> */}
            </div>
          </div>
          <div className="flex flex-col font-manrope md:gap-10 gap-[60px] items-start justify-start md:px-10 sm:px-5 px-[120px] w-full">
            <div className="flex flex-col items-center justify-center max-w-[1200px] mx-auto w-full">
              <div className="md:gap-5 gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 justify-center min-h-[auto] w-full">
                {allSellers?.map((sellers) => (
                  <div className="flex flex-1 flex-col h-[431px] md:h-auto items-start justify-start w-full">
                    <img
                      src={
                        sellers?.profilePicture
                          ? sellers?.profilePicture
                          : "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                      }
                      className="h-60 border rounded-t-lg w-full object-cover object-center"
                    />
                    <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start px-5 py-3.5 rounded-bl-[10px] rounded-br-[10px] w-full">
                      <div className="flex flex-col gap-2 items-start justify-start w-full">
                        <Text
                          className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                          size="txtManropeSemiBold20Gray900"
                        >
                          {sellers?.username}
                        </Text>
                        <div className="flex flex-row gap-3.5 items-center justify-start w-full">
                          <div className="flex flex-row items-center justify-evenly w-2/5">
                            <StarIcon className="w-5 h-5 text-orange-500" />
                            <StarIcon className="w-5 h-5 text-orange-500" />
                            <StarIcon className="w-5 h-5 text-orange-500" />
                            <StarIcon className="w-5 h-5 text-orange-500" />
                            <StarIcon className="w-5 h-5 text-orange-500" />
                          </div>
                          <Text
                            className="flex-1 text-base text-gray-900 w-auto"
                            size="txtManropeSemiBold16"
                          >
                            5.0 review
                          </Text>
                        </div>

                        <button
                          onClick={() => handleClick(sellers?._id)}
                          className="border w-full border-bluegray-100 border-solid cursor-pointer font-semibold py-[13px] rounded-[10px] text-base text-center text-gray-900 "
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <LandingPageFooter className="bg-orange-50  flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
};

export default AgentListPage;
