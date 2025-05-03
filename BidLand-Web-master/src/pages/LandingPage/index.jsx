import React from "react";

import { useNavigate } from "react-router-dom";

import { Button, CheckBox, Img, Input, List, Slider, Text } from "components";
import LandingPageCard from "components/LandingPageCard";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

const LandingPagePage = () => {
  const navigate = useNavigate();

  const landingPageCardPropList = [
    {},
    { image: "images/img_image_1.png" },
    { image: "images/img_image_2.png" },
    { image: "images/img_image_3.png" },
    { image: "images/img_image_4.png" },
    { image: "images/img_image_5.png" },
  ];
  const sliderRef = React.useRef(null);
  const [sliderState, setsliderState] = React.useState(0);

  return (
    <>
      <div className="bg-orange-50 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-center justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col items-start justify-start w-full">
          <LandingPageHeader className="bg-orange-50 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
          <div className="bg-white flex flex-col font-manrope w-full">
            {/* <div className="flex md:flex-col flex-row md:gap-10 gap-[100px] items-center justify-start w-full"> */}
              <div
                className="relative overflow-hidden  bg-cover bg-no-repeat p-12 text-center"
                style={{ backgroundImage: "url('https://wallpapers.com/images/hd/real-estate-miniature-house-model-zcovmnik4h0l5s7k.jpg')", height: "760px" }}
              >
                <div
                  className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                >
                  <div className="flex h-full items-center justify-center">
                    <div className="text-white">
                      <h2 className="mb-4 text-4xl font-semibold">Heading</h2>
                      <h4 className="mb-6 text-xl font-semibold">Subheading</h4>
                      <button
                        type="button"
                        className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                      >
                        Call to action
                      </button>
                    </div>
                  </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-manrope items-start justify-start md:px-10 sm:px-5 px-[120px] w-full">
          <div className="flex md:flex-col flex-row gap-6 items-center justify-center max-w-[1200px] mx-auto w-full">
            <div className="bg-red-100 flex flex-1 flex-col h-[424px] md:h-auto items-start justify-center md:px-10 sm:px-5 px-[50px] py-[46px] rounded-[20px] w-full">
              <div className="flex flex-col gap-[50px] items-start justify-start w-full">
                <div className="flex flex-col gap-4 items-start justify-start w-full">
                  <Text
                    className="leading-[140.00%] max-w-[488px] md:max-w-full text-4xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px]"
                    size="txtManropeExtraBold36"
                  >
                    Simple & easy way to find your dream Appointment
                  </Text>
                  <Text
                    className="leading-[180.00%] max-w-[488px] md:max-w-full text-gray-900 text-lg"
                    size="txtManropeRegular18"
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.{" "}
                  </Text>
                </div>
                <Button className="bg-white cursor-pointer font-semibold min-w-[138px] py-[13px] rounded-[10px] text-base text-center text-white-A700">
                  Get Started
                </Button>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-start justify-start w-full">
              <div className="sm:gap-5 gap-6 grid sm:grid-cols-1 grid-cols-2 justify-center min-h-[auto] w-full">
                <div className="bg-deep_orange-50 flex flex-1 flex-col h-[200px] md:h-auto items-start justify-center sm:px-5 px-[30px] py-6 rounded-[20px] w-full">
                  <div className="flex flex-col gap-5 items-start justify-start w-full">
                    <Img
                      className="h-[30px] w-[30px]"
                      src="images/img_refresh.svg"
                      alt="refresh"
                    />
                    <Text
                      className="leading-[135.00%] max-w-[222px] md:max-w-full sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px]"
                      size="txtManropeExtraBold28"
                    >
                      <>
                        Search <br />
                        your location
                      </>
                    </Text>
                  </div>
                </div>
                <div className="bg-deep_orange-50 flex flex-1 flex-col h-[200px] md:h-auto items-start justify-center sm:px-5 px-[30px] py-6 rounded-[20px] w-full">
                  <div className="flex flex-col gap-5 items-start justify-start w-full">
                    <Img
                      className="h-[30px] w-[30px]"
                      src="images/img_instagram.svg"
                      alt="instagram"
                    />
                    <Text
                      className="leading-[135.00%] max-w-[222px] md:max-w-full sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px]"
                      size="txtManropeExtraBold28"
                    >
                      <>
                        Visit <br />
                        Appointment
                      </>
                    </Text>
                  </div>
                </div>
                <div className="bg-deep_orange-50 flex flex-1 flex-col h-[200px] md:h-auto items-start justify-center sm:px-5 px-[30px] py-6 rounded-[20px] w-full">
                  <div className="flex flex-col gap-5 items-start justify-start w-full">
                    <Img
                      className="h-[30px] w-[30px]"
                      src="images/img_camera.svg"
                      alt="camera"
                    />
                    <Text
                      className="leading-[135.00%] max-w-[222px] md:max-w-full sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px]"
                      size="txtManropeExtraBold28"
                    >
                      <>
                        Get your <br />
                        dream house
                      </>
                    </Text>
                  </div>
                </div>
                <div className="bg-deep_orange-50 flex flex-1 flex-col h-[200px] md:h-auto items-start justify-center sm:px-5 px-[30px] py-6 rounded-[20px] w-full">
                  <div className="flex flex-col gap-5 items-start justify-start w-full">
                    <Img
                      className="h-[30px] w-[30px]"
                      src="images/img_instagram_orange_a700.svg"
                      alt="instagram"
                    />
                    <Text
                      className="leading-[135.00%] max-w-[222px] md:max-w-full sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px]"
                      size="txtManropeExtraBold28"
                    >
                      <>
                        Enjoy your <br />
                        Appointment
                      </>
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full bg-white py-10 pt-20">
          <div className="flex flex-col md:gap-10 gap-[60px] md:h-auto items-start justify-start  w-full">
            <div className="flex flex-col gap-6 items-start justify-start w-full">
              <div className="flex sm:flex-col flex-row md:gap-10 items-center justify-between w-full">
                <div>
                  <Text
                    className="text-4xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-auto"
                    size="txtManropeExtraBold36"
                  >
                    Featured Properties
                  </Text>
                </div>
                <div>
                  <Button
                    className="common-pointer bg-transparent cursor-pointer flex items-center justify-center min-w-[124px]"
                    onClick={() => navigate("/listing")}
                  >
                    <div className="flex items-center gap-x-2 font-bold text-left text-lg text-orange-A700">
                      Explore All
                      <span>
                        <ArrowRightIcon className="w-6 h-6" />
                      </span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start w-full">
              <div className="md:gap-5 gap-6 grid md:grid-cols-1 grid-cols-3 justify-center  w-full">
                <LandingPageCard className="flex  items-start justify-start w-full" />
              </div>
            </div>
          </div>
        </div>
        <LandingPageFooter className="bg-orange-50 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
};

export default LandingPagePage;
