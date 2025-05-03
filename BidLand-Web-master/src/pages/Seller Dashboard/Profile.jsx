import React, { useEffect, useState } from "react";

import { Button, Img, Line, List, SelectBox, Text } from "components";
import LandingPageCard from "components/LandingPageCard";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  CheckBadgeIcon,
  CheckCircleIcon,
  PhoneIcon,
  StarIcon,
  TicketIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";


const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  //   const [sellerProperties, setSellerProperties] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const handleUserProfile = () => {
      try {
        axios.get(`http://localhost:3000/auth/user/${id}`).then((res) => {
          console.log(res?.data?.user);
          setUser(res?.data?.user);
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleUserProfile();
  }, []);


  return (
    <>
      <div className="bg-white flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-center justify-center mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col font-manrope md:px-5 relative w-full">
            <div className="flex flex-1 flex-col items-center justify-start mx-auto w-full">
              <img
                className="h-[250px] sm:h-auto object-cover w-full"
                src="https://similarworlds.com/facebookcovers/facebook-cover-photos-timeline/fb/quotes/Inspirational-I-Have-a-Dream-Facebook-Cover.jpg"
                alt="coverimage"
              />
            </div>
            <div className="flex flex-1 flex-col gap-[58px] items-center justify-start mt-[-46px] mx-auto w-full z-[1]">
              <div className="flex md:flex-col flex-row gap-[30px] items-end justify-start md:px-10 sm:px-5 px-[140px] w-full">
                <img
                  className="h-[170px] md:h-auto object-cover rounded-full w-[170px] bg-gray-100"
                  src={
                    user?.profilePicture
                      ? user?.profilePicture
                      : "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                  }
                  alt="rectangle5599"
                />
                <div className="flex flex-1 md:flex-col flex-row md:gap-10 gap-[60px] items-center justify-start w-full">
                  <div className="flex flex-1 md:flex-col flex-row gap-8 items-start justify-start w-full">
                    <div className="flex flex-1 flex-col gap-2 items-start justify-start w-full">
                      <div className="flex gap-x-3 items-center">
                        <span className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-0.48px] ">
                          {user?.username}
                        </span>
                        {user?.verification?.isVerified === true ? (
                          <span className="text-green-500 font-semibold flex gap-x-2 items-center">
                            <CheckBadgeIcon className="w-5 h-5" />
                              Verified
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold flex gap-x-2 items-center">
                            <XCircleIcon className="w-5 h-5" />
                            Not Verified
                          </span>
                        )}
                      </div>
                      <div className="flex flex-row gap-3.5 items-center justify-start w-full">
                        <div className="flex flex-row items-center justify-evenly w-1/4">
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
                    </div>
                    <div className="flex flex-1 flex-col gap-2 items-start justify-start w-full">
                      <div className="flex flex-row gap-3 items-center justify-start w-full">
                        <PhoneIcon className="w-5 h-5 text-gray-700" />
                        <Text
                          className="flex-1 text-gray-900 text-lg w-auto"
                          size="txtManropeSemiBold18"
                        >
                          {user?.phone}
                        </Text>
                      </div>
                      <div className="flex flex-row gap-3 items-center justify-start w-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-700"
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
                        <Text
                          className="text-gray-900 text-lg w-auto"
                          size="txtManropeSemiBold18"
                        >
                          {user?.email}
                        </Text>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Link to={`/sellerdashboard/edit-profile/${user?._id}`}>
                      <button className="bg-gray-900 cursor-pointer font-semibold min-w-[112px] py-3 rounded-[10px] text-base text-center text-white">
                        Edit Profile
                      </button>
                    </Link>
                    {user?.verification?.isVerified === false && (
                      <Link to={`/sellerdashboard/verify-profile/${user?._id}`}>
                        <button className="bg-gray-900 cursor-pointer font-semibold min-w-[112px] py-3 px-5 rounded-[10px] text-base text-center text-white">
                          Verify Profile
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
