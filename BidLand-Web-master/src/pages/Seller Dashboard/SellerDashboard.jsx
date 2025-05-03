/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowRightOnRectangleIcon,
  ArrowTrendingUpIcon,
  ChatBubbleBottomCenterIcon,
  ChevronDownIcon,
  HomeModernIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import ViewAllUsers from "./ViewAllUsers";
import Properties from "./Properties";
import PropertiesEdit from "./PropertiesEdit";
import EditProfile from "./EditProfile";
import Bids from "./Bids";
import Chat from "./Chat";
import Profile from "./Profile";
import VerifySellerProfile from "./VerifyProfile";
import Queries from "./Queries";

const navigation = [
  // { name: "Dashboard", href: "home", icon: HomeIcon, current: true },
  { name: "Users", href: "get-all-users", icon: UsersIcon, current: true },
  {
    name: "Properties",
    href: "get-properties",
    icon: HomeModernIcon,
    current: false,
  },
  { name: "Bids", href: "bids", icon: ArrowTrendingUpIcon, current: false },
  { name: "Queries", href: "queries", icon: ArrowTrendingUpIcon, current: false },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const navigate = useNavigate();
  var token = localStorage.getItem("JWT");
  var userPic = localStorage.getItem("userData");
  var userId = localStorage.getItem("userId");
  var userName = localStorage.getItem("userName");

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        {/* Static sidebar for desktop */}
        <div className="fixed inset-y-0 z-50 flex w-72 flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white-A700 px-6 pb-4 border-r shadow-md">
            <div className="flex h-16 shrink-0 items-center gap-x-1.5">
              <HomeModernIcon className="h-8 w-8 text-orange-A700" />
              <span className="text-orange-A700 text-xl mt-2.5">BidLand</span>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2.5 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.href}
                          className={`group flex gap-x-3 text-gray-700 rounded-md p-2 hover:text-indigo-600 hover:bg-[#F4F7FF]  text-sm leading-6 font-semibold ${
                            location.pathname.includes(`${item.href}`)
                              ? "border-l-4 border-indigo-600"
                              : ""
                          }`}
                        >
                          <item.icon
                            className={`h-6 w-6 text-gray-400 group-hover:text-indigo-600 shrink-0 ${
                              location.pathname.includes(`${item.href}`)
                                ? "text-indigo-600"
                                : ""
                            }`}
                            aria-hidden="true"
                          />

                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="mt-auto">
                  <button
                   onClick={() => {
                    navigate("/");
                    localStorage.removeItem("JWT");
                    localStorage.removeItem("userData");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("userRole")
                    localStorage.removeItem("userName")
                    localStorage.removeItem("userEmail")
                    localStorage.removeItem("userVerify");
                    location.reload();
                  }}
                    className="group -mx-2 cursor-pointer flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    <ArrowRightOnRectangleIcon
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                    Log out
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 shadow-md">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                </button>

                {/* Separator */}
                <div
                  className="block h-6 w-px bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src={
                        userPic
                          ? userPic
                          : "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                      }
                      alt=""
                    />
                    <span className="flex items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        {userName}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
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
                              navigate(`profile/${userId}`);
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

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              navigate("/");
                              localStorage.removeItem("JWT");
                              localStorage.removeItem("userData");
                              localStorage.removeItem("userId");
                              localStorage.removeItem("userRole");
                              localStorage.removeItem("userName");
                              localStorage.removeItem("userEmail");
                              localStorage.removeItem("userVerify");
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
              </div>
            </div>
          </div>

          <main className="py-10 ">
            <div className="px-4 sm:px-6  lg:px-3">
              <Routes>
                <Route path="/get-all-users" element={<ViewAllUsers />} />
                <Route path="/get-properties" element={<Properties />} />
                <Route
                  path="/edit-properties/:id"
                  element={<PropertiesEdit />}
                />
                <Route path="profile/:id" element={<Profile />} />
                <Route path="/edit-profile/:id" element={<EditProfile />} />
                <Route path="/verify-profile/:id" element={<VerifySellerProfile />} />
                <Route path="/bids" element={<Bids />} />
                <Route path="/queries" element={<Queries />} />
                <Route path="/seller-chat/:propertyId" element={<Chat />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
