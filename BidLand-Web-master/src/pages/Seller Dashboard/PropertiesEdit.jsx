import { ArrowSmallLeftIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storage } from "../../../fireabse";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Toaster, toast } from "sonner";
const PropertiesEdit = () => {
  var userId = localStorage.getItem("userId");
  var token = localStorage.getItem("JWT");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [properties, setProperties] = useState(null);
  const [show, setShow] = useState(true);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState([]);
  const [loader, setLoader] = useState(false);
  const [imgMetaData, setImgMetaData] = useState("");
  const [propertyImg, setPropertyImg] = useState([]);
  const [locationAddress, setLocationAddress] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const handleImageChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      setLoader(true);
      const uploadTasks = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const image = selectedFiles[i];
        const storageRef = ref(storage, `images/${image.name}`);
        uploadTasks.push(uploadBytes(storageRef, image));
      }
      Promise.all(uploadTasks)
        .then((snapshots) => {
          console.log("All files uploaded successfully!", snapshots);
          const downloadURLPromises = snapshots.map((snapshot) =>
            getDownloadURL(snapshot.ref)
          );
          Promise.all(downloadURLPromises)
            .then((downloadURLs) => {
              console.log("All files uploaded successfully");
              toast.success("All files uploaded successfully");
              console.log("Download URLs:", downloadURLs);
              setUrl(downloadURLs);
              setLoader(false);
            })
            .catch((error) => {
              console.error("Error getting download URLs:", error);
              setLoader(false);
            });
        })
        .catch((error) => {
          console.error("Error uploading files:", error);
          setLoader(false);
        });
    }
  };

  useEffect(() => {
    try {
      axios.get(`http://localhost:3000/property/view/${id}`).then((res) => {
        console.log(res?.data?.property);
        setPropertyImg(res?.data?.property.images);
        var Bidding = false;
        if (res?.data?.property?.isBidding == true) {
          Bidding = true;
        }
        EditProperty.setValues({
          name: res?.data?.property?.name,
          description: res?.data?.property?.description,
          fixedPrice: res?.data?.property?.fixedPrice,

          isBidding: res?.data?.property?.isBidding,
          city: res?.data?.property?.city,
          propertyType: res?.data?.property?.propertyType,
          bedrooms: res?.data?.property?.specifications[0],
          bathrooms: res?.data?.property?.specifications[1],
          square: res?.data?.property?.specifications[2],
          other: res?.data?.property?.specifications[3],
        });
        setLocationAddress({latitude:res?.data?.property?.location?.coordinates?.coordinates[1],
          longitude: res?.data?.property?.location?.coordinates?.coordinates[0],
          address:res?.data?.property?.location?.address })
        //   setProperties(res?.data?.properties);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const EditProperty = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      var json = {
        name: values.name,
        description: values.description,
        fixedPrice: values.fixedPrice,
        city: values.city,
        propertyType: values.propertyType,
        images: url ? url : propertyImg,
        specifications: [
          values.bedrooms,
          values.bathrooms,
          values.square,
          values.other,
        ],
        location: {
          coordinates: {
            type: "Point",
            coordinates: [locationAddress?.longitude, locationAddress?.latitude]  // Replace with the actual longitude and latitude values
          },
          address: locationAddress?.address
        }
      };
      console.log("json", json);
      try {
        await axios
          .put(`http://localhost:3000/property/update/${id}`, json, config)
          .then((res) => {
            console.log(res.data);
            toast.success(res?.data?.message);
          })
          .catch((err) => {
            toast.error("Updation Failed");
          });
      } catch (error) {
        toast.error("Error submitting form:", error);
      }
    },
  });


  const sendDataToParent = (latitude,longitude,formatted_address) => {
    setLocationAddress({
      latitude: latitude,
      longitude: longitude,
      address:formatted_address
    });
  };

  const handlePlaceChange = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 50.064192, lng: -130.605469 },
      zoom: 3,
    });
  
    const card = document.getElementById("pac-card");
    map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(card);
  
    const center = { lat: 50.064192, lng: -130.605469 };
    const defaultBounds = {
      north: center.lat + 0.1,
      south: center.lat - 0.1,
      east: center.lng + 0.1,
      west: center.lng - 0.1,
    };
  
    const input = document.getElementById("address");
    const options = {
      bounds: defaultBounds,
      componentRestrictions: { country: "pk" }, // Set the country to Pakistan
      fields: [
        "address_components",
        "geometry",
        "icon",
        "name",
        "formatted_address",
      ],
      strictBounds: false,
    };
  
    const autocomplete = new window.google.maps.places.Autocomplete(input, options);
    const southwest = { lat: 23.6345, lng: 60.8724 };
    const northeast = { lat: 37.0841, lng: 77.8375 };
    const newBounds = new window.google.maps.LatLngBounds(southwest, northeast);
    autocomplete.setBounds(newBounds);
  
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      let address = "";
      let postalCode = "";
  
      if (place.address_components) {
        address = place.formatted_address;
  
        const postalCodeComponent = place.address_components.find(
          (component) => component.types.includes("postal_code")
        );
  
        postalCode = postalCodeComponent ? postalCodeComponent.short_name : "";
      }
  
      console.log("Formatted Address:", address);
      console.log("Postal Code:", postalCode);
  
      // The rest of your code...
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
      sendDataToParent(latitude, longitude, address, postalCode);
    });
  };
  return (
    <>
      <Toaster richColors />
      <div>
        <div className="divide-y divide-white/5 ">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <div className="flex items-center">
                <ArrowSmallLeftIcon
                  className="w-7 h-7 cursor-pointer"
                  onClick={() => navigate(`/sellerdashboard/get-properties`)}
                />
                <h2 className="text-base font-semibold leading-7 ">
                  Edit Property
                </h2>
              </div>
              <p className="mt-1  ml-6 text-sm leading-6 text-gray-400">
                You can update property to the platform here.
              </p>
            </div>
            <form
              className="md:col-span-2"
              onSubmit={EditProperty.handleSubmit}
            >
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6 px-4">
                <div className="col-span-full flex items-center gap-x-8">
                  {loader ? (
                    <div
                      role="status"
                      className="flex items-center justify-center w-full gap-x-2 border rounded-md py-4"
                    >
                      <span className="text-gray-600 text-xl">Uploding...</span>
                      <svg
                        aria-hidden="true"
                        class="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
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
                    </div>
                  ) : (
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-100 "
                    >
                      <div class="flex flex-col items-center justify-center">
                        <svg
                          class="w-8 h-8 mb-2 text-gray-500 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>

                        {propertyImg?.length > 0 ? (
                          <span className="text-sm rounded-full px-2 text-gray-500">
                            <span class="font-semibold">Click to update</span>{" "}
                          </span>
                        ) : (
                          <span className="text-sm rounded-full px-2 text-gray-500">
                            <span class="font-semibold">Click to upload</span>{" "}
                          </span>
                        )}
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        multiple
                        class="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
                {url?.length > 0 ? (
                  <>
                    <div className="flex gap-x-2 w-full">
                      {url?.map((url) => (
                        <div className="relative" key={url}>
                          <img
                            src={url}
                            alt=""
                            className="h-40 w-40 flex-none rounded-lg bg-gray-800 object-cover relative"
                          />
                          {/* <div className="absolute top-1 right-1 cursor-pointer" onClick={() => handleDeleteImage(url)}>
                          <TrashIcon className="w-8 h-8 text-red-600 bg-white rounded-full p-1" />
                        </div> */}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex gap-x-2 w-full">
                    {propertyImg?.map((url) => (
                      <div className="relative" key={url}>
                        <img
                          src={url}
                          alt=""
                          className="h-40 w-40 flex-none rounded-lg bg-gray-800 object-cover relative"
                        />
                        {/* <div className="absolute top-1 right-1 cursor-pointer" onClick={() => handleDeleteImage(url)}>
                           <TrashIcon className="w-8 h-8 text-red-600 bg-white rounded-full p-1" />
                         </div> */}
                      </div>
                    ))}
                  </div>
                )}
                <div className="col-span-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 "
                  >
                    Property Name*
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      value={EditProperty.values.name}
                      onChange={EditProperty.handleChange}
                      type="text"
                      className="block w-full rounded-md border-0 bg-gray-100 py-1.5  shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="flex gap-x-3 mt-2">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 "
                    >
                      Choose City*
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={EditProperty.values.city}
                      onChange={EditProperty.handleChange}
                      class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                      <option value="">Choose City</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="propertyType"
                      className="block text-sm font-medium leading-6 "
                    >
                      Property Type*
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={EditProperty.values.propertyType}
                      onChange={EditProperty.handleChange}
                      class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                      <option value="">Choose Property Type</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 "
                    >
                      Location*
                    </label>
                  <div
  
    > <div id="pac-card" className="flex rounded-md gap-10 justify-center my-4">
    <input
      id="address"
      name="address"
      value={locationAddress?.address}
      required
      className="block w-full rounded-md border-0 bg-gray-100 py-1.5  shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      type="text"
      placeholder="Enter a location"
      onChange={handlePlaceChange}
      onClick={()=>setLocationAddress({})}
    />

  </div>
  <div
    id="map"
    // style={{ height: "0px", width: "0px" }}
  ></div>
                  </div></div>
                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 "
                  >
                    Property Description*
                  </label>
                  <div className="mt-2">
                    <input
                      id="description"
                      name="description"
                      type="text"
                      value={EditProperty.values?.description}
                      onChange={EditProperty.handleChange}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 bg-gray-100 py-1.5 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="fixedPrice"
                    className="block text-sm font-medium leading-6 "
                  >
                    Price*
                  </label>
                  <div className="mt-2">
                    <input
                      id="fixedPrice"
                      name="fixedPrice"
                      type="text"
                      value={EditProperty.values?.fixedPrice}
                      onChange={EditProperty.handleChange}
                      className="block w-full rounded-md border-0 bg-gray-100 py-1.5  shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {/* <div class="flex items-center">
                <input
                  id="isBidding"
                  type="checkbox"
                  checked={EditProperty.values.isBidding}
                  value={EditProperty.values.isBidding}
                  onChange={EditProperty.handleChange}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="isBidding"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  List for Bidding
                </label>
              </div> */}

                <div className="col-span-full">
                  <label
                    htmlFor="specification"
                    className="block text-sm font-medium leading-6 "
                  >
                    Specification
                  </label>
                  {EditProperty.values.propertyType === "Residential" && (
                    <div className="flex gap-x-3 mt-2">
                      <select
                        id="bedrooms"
                        name="bedrooms"
                        value={EditProperty.values.bedrooms}
                        onChange={EditProperty.handleChange}
                        class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      >
                        <option value="">Choose Beedrooms</option>
                        <option value="2 Bedrooms">2 Bedrooms</option>
                        <option value="3 Bedrooms">3 Bedrooms</option>
                      </select>
                      <select
                        id="bathrooms"
                        name="bathrooms"
                        value={EditProperty.values.bathrooms}
                        onChange={EditProperty.handleChange}
                        class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      >
                        <option value="">Choose Bathrooms</option>
                        <option value="2 Bathrooms">2 Bathrooms</option>
                        <option value="3 Bathrooms">3 Bathrooms</option>
                      </select>
                    </div>
                  )}
                  <div className="flex gap-x-3 mt-2">
                    <select
                      id="square"
                      name="square"
                      value={EditProperty.values.square}
                      onChange={EditProperty.handleChange}
                      class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                      <option value="">Choose Area</option>
                      <option value="10 Marla">10 Marla</option>
                      <option value="15 Marla">15 Marla</option>
                      <option value="1 Kannal">1 Kannal</option>
                      <option value="2 Kannal">2 Kannal</option>
                    </select>
                    {EditProperty.values.propertyType === "Residential" && (
                      <select
                        id="other"
                        name="other"
                        value={EditProperty.values.other}
                        onChange={EditProperty.handleChange}
                        class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      >
                        <option value="">Choose Other</option>
                        <option value="Swimming Pool">Swimming Pool</option>
                        <option value="Loan">Loan</option>
                        <option value="Basement">Basement</option>
                        <option value="Furnished">Furnished</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex px-4">
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 text-white px-4 py-2 text-sm font-semibold tracking-wide shadow-sm hover:bg-blue-400 "
                >
                  Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertiesEdit;
