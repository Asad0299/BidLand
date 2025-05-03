import React from "react";
import { Link } from "react-router-dom";

export const Success = () => {
  return (
    <div className="mx-auto h-screen flex flex-col gap-y-4 items-center justify-center">
      <div className="text-2xl font-semibold">Congratulations</div>
      <div className="text-2xl font-semibold">Payment Done Successfully</div>
      <div className="flex gap-x-3 items-center">
        <Link to="/">
          <button className="bg-blue-600 text-white rounded-lg w-44 h-11">
            Go to HomePage
          </button>
        </Link>
        <Link to="/orders">
          <button className="bg-blue-600 text-white rounded-lg w-40 h-11">
            Go to Orders
          </button>
          </Link>
      </div>
    </div>
  );
};
