import React, { useEffect, useState } from "react";

import { Button, Img, List, Text } from "components";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, HeartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { HomeModernIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const LandingPageHeader = (props) => {
  var token = localStorage.getItem("JWT");
  var userPic = localStorage.getItem("userData");
  var userId = localStorage.getItem("userId");
  var userRole = localStorage.getItem("userRole");
  console.log(token);
  console.log(userPic);
  console.log(userId);
  // const [userPic, setUserPic] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    // setUserPic(localStorage.getItem("userData"))
  }, []);
  return (
    <>
      <header className={props.className}>
        <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
          <div className="flex items-center">
            <Link to="/">
              <div className="flex flex-row gap-x-1 items-center justify-start">
                {/* <img className="w-5 h-5" src={}/> */}
                <HomeModernIcon className="h-8 w-8 text-orange-A700" />
                <Text
                  className="text-orange-A700 text-xl mt-2.5"
                  size="txtMarkoOneRegular20"
                >
                  BidLand
                </Text>
              </div>
            </Link>
            <div className="mobile-menu">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="flex sm:flex-1 sm:flex-col flex-row sm:hidden items-center justify-between">
            <List
              className="flex gap-x-10 "
              orientation="horizontal"
            >
              <div className="flex flex-row gap-1.5 items-start justify-start ">
                <Link to="/">
                  <Text
                    className="text-base text-gray-900 w-auto"
                    size="txtManropeSemiBold16"
                  >
                    Home
                  </Text>
                </Link>
              </div>
              <div className="flex flex-row gap-1.5 items-start justify-start ">
                <Link to="/listing">
                  <Text
                    className="text-base text-gray-900 w-auto"
                    size="txtManropeSemiBold16"
                  >
                    Properties
                  </Text>
                </Link>
              </div>
              <div className="flex flex-row gap-1.5 items-start justify-start ">
                <Link to="/agentlist">
                  <Text
                    className="text-base text-gray-900 w-auto"
                    size="txtManropeSemiBold16"
                  >
                    Sellers
                  </Text>
                </Link>
              </div>
              <div className="flex flex-row gap-1.5 items-start justify-start ">
                <Link to="/biddinglisting">
                  <Text
                    className="text-base text-gray-900 w-auto"
                    size="txtManropeSemiBold16"
                  >
                    Bidding
                  </Text>
                </Link>
              </div>
            <div className="flex flex-row gap-1.5 items-start justify-start">

            <Link to="/contactpage">
              <Text
                className="text-base text-center text-gray-900 w-auto"
                size="txtManropeSemiBold16"
                >
                Contact
              </Text>
            </Link>
                </div>
                <div className="flex flex-row gap-1.5 items-start justify-start ">

            <Link to="/aboutus">
              <Text
                className="text-base text-gray-900 w-auto"
                size="txtManropeSemiBold16"
                >
                About Us
              </Text>
            </Link>
                </div>
                  </List>
          </div>
          <div className="flex flex-row gap-x-5  md:h-auto sm:hidden items-center justify-center">
            <span>
              <Link to="/wishlist">
              <HeartIcon className="w-8 h-8 text-gray-400 cursor-pointer hover:text-gray-600"/>
              </Link>
            </span>
            {!token ? (
              <Link to="/login">
                <Button className="bg-gray-800 hover:bg-gray-900 text-white cursor-pointer font-manrope font-semibold py-3 px-8 rounded-[10px]">
                  Account
                </Button>
              </Link>
            ) : (
              <>
                <Menu as="div" className="relative ml-3 font-manrope">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={
                          userPic
                            ? userPic
                            : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        }
                        alt=""
                      />
                    </Menu.Button>
                  </div>
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
                   {userRole == "seller" ?   <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              navigate(`/sellerdashboard/home`);
                            }}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex px-4 py-2 w-full text-sm text-gray-700"
                            )}
                          >
                            Dashboard
                          </button>
                        )}
                      </Menu.Item>:
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              navigate(`/userprofile/${userId}`);
                            }}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex px-4 py-2 w-full text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </button>
                        )}
                      </Menu.Item>
                      }
                       <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              navigate(`/orders`);
                            }}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex px-4 py-2 w-full text-sm text-gray-700"
                            )}
                          >
                            My Orders
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              navigate("/");
                              localStorage.removeItem("JWT");
                              localStorage.removeItem("userData");
                              localStorage.removeItem("userId");
                              localStorage.removeItem("userRole")
                              localStorage.removeItem("userName")
                              localStorage.removeItem("userEmail")
                              localStorage.removeItem("userVerify")
                              location.reload();
                            }}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex px-4 py-2 w-full text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

LandingPageHeader.defaultProps = {};

export default LandingPageHeader;
