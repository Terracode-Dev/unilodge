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
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavigationBar />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
