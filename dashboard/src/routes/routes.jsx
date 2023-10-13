import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import DashboardLayout from "../dashboard/DashboardLayout/DashboardLayout";
import Overview from "../dashboard/Outlets/Overview/Overview";
import Packages from "../dashboard/Outlets/Packages/Packages";
import Category from "../dashboard/Outlets/Category/Category";
import Users from "../dashboard/Outlets/Users/Users";
import Orders from "../dashboard/Outlets/Orders/Orders";
import Payments from "../dashboard/Outlets/Payments/Payments";
import Recommended from "../dashboard/Outlets/recommended/Recommended";
import Products from "../dashboard/Outlets/Product/Product";
import Gigs from "../dashboard/Outlets/Gigs/Gigs";
import Post from "../dashboard/Outlets/Post/Post";
import UserCategory from "../dashboard/Outlets/UserCategory/UserCategory";
import Verified from "../dashboard/Outlets/Verified/Verified";
import Proposal from "../dashboard/Outlets/proposal/Proposal";
import Payment from "../dashboard/Outlets/Payment/Payment";
import ActiveCardUser from "../dashboard/Outlets/ActiveCardUser/ActiveCardUser";

export const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export const privateRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "/dashboard/packages",
        element: <Packages />,
      },
      {
        path: "/dashboard/recommended",
        element: <Recommended />,
      },
      {
        path: "/dashboard/category",
        element: <Category />,
      },
      {
        path: "/dashboard/usercategory",
        element: <UserCategory />,
      },
      {
        path: "/dashboard/products",
        element: <Products />,
      },
      {
        path: "/dashboard/users",
        element: <Users />,
      },
      {
        path: "/dashboard/gigs",
        element: <Gigs />,
      },
      {
        path: "/dashboard/orders",
        element: <Orders />,
      },
      {
        path: "/dashboard/payments",
        element: <Payments />,
      },
      {
        path: "/dashboard/post",
        element: <Post />,
      },
      {
        path: "/dashboard/verify",
        element: <Verified />,
      },
      {
        path: "/dashboard/proposal",
        element: <Proposal />,
      },
      {
        path: "/dashboard/payment",
        element: <Payment />,
      },
      {
        path: "/dashboard/active-card-users",
        element: <ActiveCardUser />,
      },
    ],
  },
]);
