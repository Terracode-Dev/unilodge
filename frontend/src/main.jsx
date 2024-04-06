import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/Home.jsx';
import NavigationBar from './components/Navbar.jsx';
import SigninPage from './pages/Signin.jsx';
import ErrorPage from './pages/Error_page.jsx';
import LandlordDash from './pages/LandlordDash.jsx';
import StudentDash from './pages/StudentDash.jsx';
import Blog from './pages/Blog.jsx';
import AdminDash from './pages/AdminDash.jsx';
import SignupPage from './pages/Signup.jsx';
import WardenDash from './pages/WardenDash.jsx';
import MoreDetails from './pages/MoreDetails.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <SigninPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/landlord",
    element: <LandlordDash />,
  },
  {
    path: '/student',
    element: <StudentDash />,
  },
  {
    path:"/warden",
    element: <WardenDash />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/admin",
    element: <AdminDash />,
  },
  {
    path: "/more",
    element: <MoreDetails/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavigationBar />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
