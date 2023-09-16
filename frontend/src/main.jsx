import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './componenets/Loginpage/LoginPage';
// import Header from './componenets/Header/Header';
import SignupPage from './componenets/SignupPage/SignupPage';
import Main from './componenets/Main/Main';

import Articles from './componenets/Articles';
import {CookiesProvider} from 'react-cookie'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:"/",
        element: <SignupPage></SignupPage>
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/articles",
        element: <Articles></Articles>,
      }
    ]
  },
 
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <CookiesProvider>
    <RouterProvider router={router}></RouterProvider>
  </CookiesProvider>
  </React.StrictMode>,
)
