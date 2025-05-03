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

const buttonmediumOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const Profile = () => {
  const landingPageCardPropList = [
    {},
    { image: "images/img_image_1.png" },
    { image: "images/img_image_2.png" },
    { image: "images/img_image_3.png" },
    { image: "images/img_image_4.png" },
    { image: "images/img_image_5.png" },
  ];

  function handleNavigate() {
    window.location.href = "www.abc.com";
  }
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

  //   useEffect(() => {
  //     const handleSellerProperties = () => {
  //       try {
  //         axios
  //           .get(`http://localhost:3000/property/${id}/properties`)
  //           .then((res) => {
  //             console.log(res?.data?.properties);
  //             setSellerProperties(res?.data?.properties);
  //           });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     handleSellerProperties();
  //   }, [seller]);

  //   const handlePropertyDetails = (id) =>{
  //     navigate(`/propertydetails/${id}`)
  //   }

  return (
    <>
      <div className="bg-white flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-center justify-center mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col items-start justify-start w-full">
          <LandingPageHeader className="bg-orange-50  flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
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
                    <Link to={`/editprofile/${user?._id}`}>
                      <button className="bg-gray-900 cursor-pointer font-semibold min-w-[112px] py-3 rounded-[10px] text-base text-center text-white">
                        Edit Profile
                      </button>
                    </Link>
                    {user?.verification?.isVerified === false && (
                      <Link to={`/verify-profile/${user?._id}`}>
                        <button className="bg-gray-900 cursor-pointer font-semibold min-w-[112px] py-3 px-5 rounded-[10px] text-base text-center text-white">
                          Verify Profile
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-col items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
                <div className="flex flex-col gap-12 justify-center w-full">
                 <h2 className="mt-4 text-2xl font-semibold ml-3">My Lising</h2>
                  <div className="flex flex-col items-center justify-center w-full">
                    <div className="md:gap-5 gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center min-h-[auto] w-full">
                      {sellerProperties.length > 0 ?
                      sellerProperties?.map((property) => (
                        <div className="bg-white border border-red-101 border-solid flex items-start justify-start rounded-lg w-full">
                          <div className="flex flex-col gap-[27px] items-start justify-start w-full">
                            <div className="flex flex-col">
                              <Img
                                className="h-96 w-full object-center object-cover rounded-t-lg"
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
                                className="bg-gray-900 cursor-pointer flex-1 font-manrope font-semibold py-[13px] rounded-[10px] text-base text-center text-white w-full"
                                onClick={() =>
                                  handlePropertyDetails(property?._id)
                                }
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      )): <span className="text-xl font-semibold  text-gray-500 ml-3">No Properties Added...</span>}
                    </div>
                  </div>
                 
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col font-manrope items-start justify-start md:px-10 sm:px-5 px-[120px] w-full">
          <div className="bg-orange-50  border border-bluegray-100 border-solid flex flex-col items-center justify-center max-w-[1200px] mx-auto p-[42px] md:px-5 rounded-[10px] w-full">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex md:flex-col flex-row md:gap-10 gap-[65px] items-start justify-center w-full">
                <div className="flex flex-1 flex-col gap-[57px] items-start justify-start w-full">
                  <div className="flex flex-col gap-6 items-start justify-start w-full">
                    <div className="flex sm:flex-col flex-row gap-[30px] items-center justify-start w-full">
                      <Img
                        className="h-[182px] md:h-auto object-cover rounded-[10px] w-[182px]"
                        src="images/img_rectangle5599.png"
                        alt="rectangle5616"
                      />
                      <div className="flex flex-1 flex-col gap-[7px] items-start justify-start w-full">
                        <Text
                          className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-0.48px] w-full"
                          size="txtManropeBold24Gray900"
                        >
                          Bruno Fernandes
                        </Text>
                        <div className="flex flex-row gap-3.5 items-center justify-start w-full">
                          <div className="flex flex-row items-center justify-evenly w-[31%]">
                            <Img
                              className="h-4 w-4"
                              src="images/img_star.svg"
                              alt="star_Five"
                            />
                            <Img
                              className="h-4 w-4"
                              src="images/img_star.svg"
                              alt="star_Six"
                            />
                            <Img
                              className="h-4 w-4"
                              src="images/img_star.svg"
                              alt="star_Seven"
                            />
                            <Img
                              className="h-4 w-4"
                              src="images/img_star.svg"
                              alt="star_Eight"
                            />
                            <Img
                              className="h-4 w-4"
                              src="images/img_star_gray_600.svg"
                              alt="star_Nine"
                            />
                          </div>
                          <Text
                            className="flex-1 text-base text-gray-900 w-auto"
                            size="txtManropeSemiBold16"
                          >
                            4.5 review
                          </Text>
                        </div>
                        <div className="flex flex-row gap-3 items-center justify-start w-full">
                          <Img
                            className="h-6 w-6"
                            src="images/img_call_gray_900.svg"
                            alt="call_One"
                          />
                          <Text
                            className="flex-1 text-gray-900 text-lg w-auto"
                            size="txtManropeSemiBold18"
                          >
                            (123) 456-7890
                          </Text>
                        </div>
                        <div className="flex flex-row gap-3 items-center justify-start w-full">
                          <Img
                            className="h-6 w-6"
                            src="images/img_mail_gray_900.svg"
                            alt="mail_One"
                          />
                          <Text
                            className="text-gray-900 text-lg w-auto"
                            size="txtManropeSemiBold18"
                          >
                            bruno@relasto .com
                          </Text>
                        </div>
                      </div>
                    </div>
                    <Text
                      className="leading-[180.00%] text-gray-600 text-lg"
                      size="txtManropeRegular18Gray600"
                    >
                      <>
                        A slider is great way to display a slideshow featuring
                        images or videos, usually on your homepage.Adding
                        sliders to your site is no longer difficult. You don’t
                        have to know coding anymore. Just use a slider widget
                        and it will automatically insert the slider on your web
                        page.
                        <br />
                        One of the best ways to add beautiful sliders with
                        excellent responsiveness and advanced options.{" "}
                      </>
                    </Text>
                  </div>
                  <Button className="bg-gray-900 cursor-pointer font-semibold min-w-[525px] sm:min-w-full py-[13px] rounded-[10px] text-base text-center text-white">
                    Contact
                  </Button>
                </div>
                <div className="flex flex-1 flex-col gap-6 items-start justify-start w-full">
                  <div className="flex flex-col gap-1 items-start justify-start w-full">
                    <Text
                      className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                      size="txtManropeSemiBold20Gray900"
                    >
                      Experiences
                    </Text>
                    <Text
                      className="text-gray-600 text-lg w-full"
                      size="txtManropeSemiBold18Gray600"
                    >
                      15+ years experience
                    </Text>
                  </div>
                  <div className="flex flex-col gap-1 items-start justify-start w-full">
                    <Text
                      className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                      size="txtManropeSemiBold20Gray900"
                    >
                      Property Types
                    </Text>
                    <Text
                      className="text-gray-600 text-lg w-full"
                      size="txtManropeSemiBold18Gray600"
                    >
                      Private House, Villa, Townhouse, Apartment
                    </Text>
                  </div>
                  <div className="flex flex-col gap-1 items-start justify-start w-full">
                    <Text
                      className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                      size="txtManropeSemiBold20Gray900"
                    >
                      Area
                    </Text>
                    <Text
                      className="text-gray-900 text-lg w-full"
                      size="txtManropeSemiBold18"
                    >
                      California, San Jose, Miami
                    </Text>
                  </div>
                  <div className="flex flex-col gap-1 items-start justify-start w-full">
                    <Text
                      className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                      size="txtManropeSemiBold20Gray900"
                    >
                      Address
                    </Text>
                    <Text
                      className="text-gray-600 text-lg w-full"
                      size="txtManropeSemiBold18Gray600"
                    >
                      59 Orchard, NY 5005, US
                    </Text>
                  </div>
                  <div className="flex sm:flex-col flex-row sm:gap-10 gap-[60px] items-start justify-start w-full">
                    <div className="flex flex-1 flex-col gap-1 items-start justify-start w-full">
                      <Text
                        className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                        size="txtManropeSemiBold20Gray900"
                      >
                        License No
                      </Text>
                      <Text
                        className="text-gray-600 text-lg w-full"
                        size="txtManropeSemiBold18Gray600"
                      >
                        BF-0535
                      </Text>
                    </div>
                    <div className="flex flex-1 flex-col gap-1 items-start justify-start w-full">
                      <Text
                        className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                        size="txtManropeSemiBold20Gray900"
                      >
                        Website
                      </Text>
                      <Text
                        className="common-pointer text-gray-600 text-lg underline w-full"
                        size="txtManropeSemiBold18Gray600"
                        onClick={handleNavigate}
                      >
                        www.abc.com
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[13px] items-start justify-start w-full">
                    <Text
                      className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                      size="txtManropeSemiBold20Gray900"
                    >
                      Social
                    </Text>
                    <div className="flex flex-row gap-4 items-start justify-start w-full">
                      <Img
                        className="h-[30px] w-[30px]"
                        src="images/img_clock_gray_600.svg"
                        alt="clock"
                      />
                      <Img
                        className="h-[30px] w-[30px]"
                        src="images/img_linkedin_gray_600.svg"
                        alt="linkedin"
                      />
                      <Img
                        className="h-[30px] w-[30px]"
                        src="images/img_twitter_gray_600.svg"
                        alt="twitter"
                      />
                      <Img
                        className="h-[30px] w-[30px]"
                        src="images/img_play.svg"
                        alt="play"
                      />
                      <Img
                        className="h-[30px] w-[30px]"
                        src="images/img_signal.svg"
                        alt="signal"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="flex flex-col font-manrope items-start justify-start md:px-10 sm:px-5 px-[120px] w-full">
          <div className="bg-orange-50  border border-bluegray-100 border-solid flex flex-col items-start justify-start max-w-[1200px] mx-auto md:px-5 py-[30px] rounded-[10px] w-full">
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex flex-col gap-10 items-start justify-start w-full">
                <div className="flex flex-col gap-[22px] items-center justify-start w-full">
                  <div className="flex sm:flex-col flex-row gap-5 items-center justify-between md:px-10 sm:px-5 px-[42px] w-full">
                    <Text
                      className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-auto"
                      size="txtManropeExtraBold28"
                    >
                      Clients Review
                    </Text>
                    <Button
                      className="bg-gray-900 cursor-pointer flex items-center justify-center min-w-[190px] px-4 py-[17px] rounded-[10px]"
                      rightIcon={
                        <Img
                          className="h-5 mt-px mb-[3px] ml-2.5"
                          src="images/img_plus_white_a700.svg"
                          alt="plus"
                        />
                      }
                    >
                      <div className="font-bold text-left text-lg text-white">
                        Write a Reveiw
                      </div>
                    </Button>
                  </div>
                  <Line className="bg-bluegray-100 h-px w-full" />
                </div>
                <div className="flex flex-col gap-[25px] items-start justify-center sm:px-5 px-[25px] w-full">
                  <List
                    className="flex flex-col gap-[25px] items-center w-full"
                    orientation="vertical"
                  >
                    <div className="bg-orange-50  border border-bluegray-100 border-solid flex flex-1 flex-col items-start justify-start sm:px-5 px-[30px] py-[39px] rounded-[20px] w-full">
                      <div className="flex flex-col gap-10 items-start justify-start w-full">
                        <Text
                          className="leading-[165.00%] max-w-[1090px] md:max-w-full text-2xl md:text-[22px] text-gray-600 sm:text-xl"
                          size="txtManropeSemiBold24Gray600"
                        >
                          Eget eu massa et consectetur. Mauris donec. Leo a, id
                          sed duis proin sodales. Turpis viverra diam porttitor
                          mattis morbi ac amet. Euismod commodo. We get you
                          customer relationships that last.{" "}
                        </Text>
                        <div className="flex flex-col gap-[25px] items-start justify-start w-full">
                          <div className="flex sm:flex-col flex-row gap-[50px] items-start justify-start md:pr-10 sm:pr-5 pr-[552px] w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="flex flex-row gap-2 items-center justify-between w-1/2">
                                <Img
                                  className="h-6 w-6"
                                  src="images/img_star_gray_900.svg"
                                  alt="star"
                                />
                                <Img
                                  className="h-6 w-6"
                                  src="images/img_star_gray_900.svg"
                                  alt="star_One"
                                />
                                <Img
                                  className="h-6 w-6"
                                  src="images/img_star_gray_900.svg"
                                  alt="star_Two"
                                />
                                <Img
                                  className="h-6 w-6"
                                  src="images/img_star_gray_900_24x24.svg"
                                  alt="star_Three"
                                />
                              </div>
                              <Text
                                className="flex-1 text-gray-600 text-xl tracking-[-0.40px] w-auto"
                                size="txtManropeSemiBold20Gray600"
                              >
                                4.5 review
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-600 text-xl tracking-[-0.40px] w-auto"
                              size="txtManropeSemiBold20Gray600"
                            >
                              02 June 2022
                            </Text>
                          </div>
                          <div className="flex md:flex-col flex-row gap-4 items-center justify-start w-full">
                            <Img
                              className="h-20 md:h-auto rounded-[50%] w-20"
                              src="images/img_ellipse2695.png"
                              alt="ellipse2695"
                            />
                            <div className="flex flex-1 flex-col gap-1 items-start justify-start w-full">
                              <Text
                                className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full"
                                size="txtManropeExtraBold28"
                              >
                                Taylor Wilson
                              </Text>
                              <Text
                                className="text-gray-900 text-lg w-full"
                                size="txtManropeSemiBold18"
                              >
                                Product Manager - Static Mania
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-orange-50  border border-bluegray-100 border-solid flex flex-1 flex-col items-start justify-start sm:px-5 px-[30px] py-[39px] rounded-[20px] w-full">
                      <div className="flex flex-col gap-10 items-start justify-start w-full">
                        <Text
                          className="leading-[165.00%] max-w-[1090px] md:max-w-full text-2xl md:text-[22px] text-gray-600 sm:text-xl"
                          size="txtManropeSemiBold24Gray600"
                        >
                          Eget eu massa et consectetur. Mauris donec. Leo a, id
                          sed duis proin sodales. Turpis viverra diam porttitor
                          mattis morbi ac amet. Euismod commodo. We get you
                          customer relationships that last.{" "}
                        </Text>
                        <div className="flex flex-col gap-[25px] items-start justify-start w-full">
                          <div className="flex sm:flex-col flex-row gap-[50px] items-start justify-start md:pr-10 sm:pr-5 pr-[552px] w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="flex flex-row gap-2 items-center justify-between w-1/2">
                                <Img
                                  className="h-6 w-6"
                                  src="images/img_star_gray_900.svg"
                                  alt="star"
                                />
                                <Img
                                  className="h-6 w-6"
                                  src="images/img_star_gray_900.svg"
                                  alt="star_One"
                                />
                                <Img
                                  className="h-6 w-6"
                                  src="images/img_star_gray_900.svg"
                                  alt="star_Two"
                                />
                                <Img
                                  className="h-6 w-6"
                                  src="images/img_star_gray_900_24x24.svg"
                                  alt="star_Three"
                                />
                              </div>
                              <Text
                                className="flex-1 text-gray-600 text-xl tracking-[-0.40px] w-auto"
                                size="txtManropeSemiBold20Gray600"
                              >
                                4.5 review
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-600 text-xl tracking-[-0.40px] w-auto"
                              size="txtManropeSemiBold20Gray600"
                            >
                              02 June 2022
                            </Text>
                          </div>
                          <div className="flex md:flex-col flex-row gap-4 items-center justify-start w-full">
                            <Img
                              className="h-20 md:h-auto rounded-[50%] w-20"
                              src="images/img_ellipse2695.png"
                              alt="ellipse2695"
                            />
                            <div className="flex flex-1 flex-col gap-1 items-start justify-start w-full">
                              <Text
                                className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full"
                                size="txtManropeExtraBold28"
                              >
                                Taylor Wilson
                              </Text>
                              <Text
                                className="text-gray-900 text-lg w-full"
                                size="txtManropeSemiBold18"
                              >
                                Product Manager - Static Mania
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-orange-50  border border-bluegray-100 border-solid flex flex-1 flex-col items-start justify-start sm:px-5 px-[30px] py-[39px] rounded-[20px] w-full">
                      <div className="flex flex-col gap-10 items-start justify-start w-full">
                        <Text
                          className="leading-[165.00%] max-w-[1090px] md:max-w-full text-2xl md:text-[22px] text-gray-600 sm:text-xl"
                          size="txtManropeSemiBold24Gray600"
                        >
                          Eget eu massa et consectetur. Mauris donec. Leo a, id
                          sed duis proin sodales. Turpis viverra diam porttitor
                          mattis morbi ac amet. Euismod commodo. We get you
                          customer relationships that last.{" "}
                        </Text>
                        <div className="flex flex-col gap-[25px] items-start justify-start w-full">
                          <div className="flex sm:flex-col flex-row gap-[50px] items-start justify-start md:pr-10 sm:pr-5 pr-[552px] w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="flex flex-row gap-2 items-center justify-between w-1/2">
                                <Img
                                  className="h-6 w-6"
                                  src="images/img_star_gray_900.svg"
                                  alt="star"
                                />
                                <Img
                                  className="h-6 w-6"
                                  src="images/img_star_gray_900.svg"
                                  alt="star_One"
                                />
                                <Img
                                  className="h-6 w-6"
                                  src="images/img_star_gray_900.svg"
                                  alt="star_Two"
                                />
                                <Img
                                  className="h-6 w-6"
                                  src="images/img_star_gray_900_24x24.svg"
                                  alt="star_Three"
                                />
                              </div>
                              <Text
                                className="flex-1 text-gray-600 text-xl tracking-[-0.40px] w-auto"
                                size="txtManropeSemiBold20Gray600"
                              >
                                4.5 review
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-600 text-xl tracking-[-0.40px] w-auto"
                              size="txtManropeSemiBold20Gray600"
                            >
                              02 June 2022
                            </Text>
                          </div>
                          <div className="flex md:flex-col flex-row gap-4 items-center justify-start w-full">
                            <Img
                              className="h-20 md:h-auto rounded-[50%] w-20"
                              src="images/img_ellipse2695.png"
                              alt="ellipse2695"
                            />
                            <div className="flex flex-1 flex-col gap-1 items-start justify-start w-full">
                              <Text
                                className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full"
                                size="txtManropeExtraBold28"
                              >
                                Taylor Wilson
                              </Text>
                              <Text
                                className="text-gray-900 text-lg w-full"
                                size="txtManropeSemiBold18"
                              >
                                Product Manager - Static Mania
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </List>
                  <SelectBox
                    className="border border-gray-600 border-solid font-semibold px-[18px] py-3 rounded-[10px] text-base text-gray-900 text-left w-[12%] sm:w-full"
                    placeholderClassName="text-gray-900"
                    indicator={
                      <Img
                        className="h-4 w-4"
                        src="images/img_arrowdown_gray_900.svg"
                        alt="arrow_down"
                      />
                    }
                    isMulti={false}
                    name="buttonmedium"
                    options={buttonmediumOptionsList}
                    isSearchable={false}
                    placeholder="See more"
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <LandingPageFooter className="bg-orange-50  flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
};

export default Profile;
