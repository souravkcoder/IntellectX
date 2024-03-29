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
import Home from './componenets/Home/Home';
import SearchDetails from './componenets/SearchDetails/SearchDetails';

import Articles from './componenets/Articles';
import {CookiesProvider} from 'react-cookie'
import Profile from './componenets/Profile/Profile';
import ProfileHome from './componenets/ProfileHome/ProfileHome';
import MyLearning from './componenets/MyLearning/MyLearning';
//import Search from './componenets/Search/Search';
import StartLearning from './componenets/StartLearning/StartLearning';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:"/",
        element: <Home></Home>
      },
      {
        path:"/signup",
        element: <SignupPage></SignupPage>
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path:"/search",
        element: <SearchDetails></SearchDetails>,
        // loader: ({param}) => fetch(`http://127.0.0.1:8000/api/course/`)
      },
      {
        path:"/account",
        element: <Profile></Profile>,
        children:[
          {
            path:"/account/pHome",
            element: <ProfileHome></ProfileHome>,
            children:[
              
            ]
          },
          {
            path:"/account/mylearning",
            element: <MyLearning></MyLearning>,
          }
        ]
      },
      {
        path:"/startlearning",
        element:<StartLearning></StartLearning>
      },
      // {
      //   path:"/pHome",
      //   element: <ProfileHome></ProfileHome>
      // },
      // {
      //   path:"/mylearning",
      //   element: <MyLearning></MyLearning>,
      // },
      {
        path:"/articles",
        element:<Articles></Articles>
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
