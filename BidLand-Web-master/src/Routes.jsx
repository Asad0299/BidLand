import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import Spinner from "components/Spinner/Spinner";
import ForgetPassword from "pages/Auth/ForgetPassword";
import ResetPassword from "pages/Auth/ResetPassword";
import Profile from "pages/Auth/Profile";
import SellerDashboard from "pages/Seller Dashboard/SellerDashboard";
import EditProfile from "pages/Auth/EditProfile";
import BiddingListing from "pages/Bidding/BiddingListing";
import Wishlist from "pages/WishList/Wishlist";
import AdminDashboard from "pages/Admin Dashboard/AdminDashboard";
import Chat from "pages/chat/Chat";
import VerifyProfile from "pages/Auth/VerifyProfile";
import { Success } from "pages/PropertyDetails/Success";
import { Orders } from "pages/Orders/Orders";
const License = React.lazy(() => import("pages/License"));
const PrivacyPolicy = React.lazy(() => import("pages/PrivacyPolicy"));
const FAQ = React.lazy(() => import("pages/FAQ"));
const Error = React.lazy(() => import("pages/Error"));
const BlogDetails = React.lazy(() => import("pages/BlogDetails"));
const BlogPage = React.lazy(() => import("pages/BlogPage"));
const ContactPage = React.lazy(() => import("pages/ContactPage"));
const AgentProfile = React.lazy(() => import("pages/AgentProfile"));
const AgentList = React.lazy(() => import("pages/AgentList"));
const PropertyDetails = React.lazy(() => import("pages/PropertyDetails"));
const ListingMapView = React.lazy(() => import("pages/ListingMapView"));
const Listing = React.lazy(() => import("pages/Listing"));
const AboutUs = React.lazy(() => import("pages/AboutUs"));
const LandingPage = React.lazy(() => import("pages/LandingPage"));
const ProjectRoutes = () => {
  return (
    <React.Suspense
      fallback={
        <>
          <Spinner/>
        </>
      }
    >
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/biddinglisting" element={<BiddingListing />} />
          <Route path="/success" element={<Success />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sellerdashboard/*" element={<SellerDashboard />} />
          <Route path="/admindashboard/*" element={<AdminDashboard />} />
          <Route path="/user-chat/:propertyId" element={<Chat />} />
          <Route path="/userprofile/:id" element={<Profile />} />
          <Route path="/editprofile/:id" element={<EditProfile />} />
          <Route path="/verify-profile/:id" element={<VerifyProfile />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword/:id" element={<ResetPassword />} />
          <Route path="/listingmapview" element={<ListingMapView />} />
          <Route path="/propertydetails/:id" element={<PropertyDetails />} />
          <Route path="/agentlist" element={<AgentList />} />
          <Route path="/agentprofile/:id" element={<AgentProfile />} />
          <Route path="/contactpage" element={<ContactPage />} />
          <Route path="/blogpage" element={<BlogPage />} />
          <Route path="/blogdetails" element={<BlogDetails />} />
          <Route path="/error" element={<Error />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/license" element={<License />} />
          <Route path="/dhiwise-dashboard" element={<Home />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
