import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import RegisterPage from './login/register';
// import LoginForm from './login/login';
// import Homezoo from './home/homezoo';
// import Homepage from './home/Home_page';
// import Settring from './settring/settring';
// import Home from './home/home';
// import News from './news/news';
// import Addticket  from './ticket/add_ticket';
import reportWebVitals from './reportWebVitals';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element:<Homepage />,
//   },
//   {
//     path: "/home",
//     element:<Home />,
//   },
//   {
//     path: "homezoo",
//     element:<Homezoo />,
//   },
//   {
//     path: "login",
//     element:<LoginForm />,
//   },
//   {
//     path: "regis",
//     element: <RegisterPage />,
//   },
//   {
//     path: "settring",
//     element: <Settring />,
//   },
//   {
//     path: "news",
//     element: <News />,
//   },
//   {
//     path: "addticket",
//     element: <Addticket />,
//   },
// ]);
document.body.style.background = 'linear-gradient(to right, #0075F4, #02F4BD)';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App/>

  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
