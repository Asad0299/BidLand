import axios from "axios";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];
export const Orders = () => {
  var userId = localStorage.getItem("userId");
  var token = localStorage.getItem("JWT");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [orders, setOrders] = useState([])
  useEffect(() => {
    try {
      axios.get(`http://localhost:3000/orders/getallorders/${userId}`).then((res) => {
        console.log("orders", res?.data?.orders);
        setOrders(res?.data?.orders)
      });
    } catch (error) {}
  }, []);
  return (
    <>
      <Toaster richColors />
      {/* {loader && <Spinner/>} */}
      <div className="bg-white flex flex-col font-markoone  items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col  items-center justify-center w-full">
          <LandingPageHeader className="bg-orange-50 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
          <div class="w-full h-screen  flex  flex-col items-center pt-40 font-manrope ">
            <h2 className="text-3xl font-semibold text-center">My Orders</h2>
            <div className="px-28 sm:px-6 lg:px-8 w-full ">
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mb-10">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300 border">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                          >
                            User Id
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Property Id
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Stripe Id
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
                            Payment
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
                           Date 
                          </th>
                         
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {orders?.length > 0 ?
                        orders?.map((order) => (
                          <tr key={order._id}>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {order.userId}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {order.propertyId}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {order.sessionId}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {order.totalPrice}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {order.paymentMethod.toUpperCase()}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {order.status}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {order.createdAt.split('T')[0]}
                            </td>
                          </tr>
                        )): "No Orders"}
                      </tbody>
                    </table>
                  </div>
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
