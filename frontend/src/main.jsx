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
import WardenDash from './pages/WardenDash.jsx';
import MoreDetails from './pages/MoreDetails.jsx';
import About from './pages/about.jsx';
import ContactUs from './pages/Contact.jsx';

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
    path: "/landlord",
    element: <LandlordDash />,
  },
  {
    path: '/student',
    element: <StudentDash />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/admin",
    element: <AdminDash/>,
  },
  {
    path: "/warden",
    element: <WardenDash/>,
  },
  {
    path: "/more",
    element: <MoreDetails/>,
  },
  {
    path: "/blog",
    element: <MoreDetails/>,
  },
  {
    path: "/about",
    element: <About/>,
  },
  {
    path: "/contact",
    element: <ContactUs/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavigationBar />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
