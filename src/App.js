import RegisterPage from './components/login/register';
import LoginForm from './components/login/login';
import Homezoo from './components/home/homezoo';
import Homepage from './components/home/Home_page';
import Settring from './components/settring/settring';
import Home from './components/home/home';
import News from './components/news/news';
import Addticket  from './components/ticket/add_ticket';
import Paymentlist from './components/ticket/payment_list';
import Makepayment from './components/reserve/makepayment';
import Ticketpostpone from './components/reserve/ticketpostpone';
import ReservationCancellation from './components/Dialog/ReservationCancellation';
import OrderList from './components/reserve/OrderItem';
import CancelDialog from './components/Dialog/CancelDialog';
import IntroHomepage from './components/home/IntroHomepage';
import Editprofile from './components/settring/editprofile';
import Editpass from './components/settring/editpassword';
import NewsDetail from './components/news/newsdetall';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');
    if (isLoggedIn) {
        setIsLoggedIn(true);
    }
}, []);
if (!isLoggedIn) {
  return (
    <div>
    <Routes>
      <Route path='/'  element={<IntroHomepage/>}></Route>
      <Route path='/homepage'  element={<Homepage/>}></Route>
      <Route path='/login'  element={<LoginForm/>}></Route>
      <Route path='/regis'  element={<RegisterPage/>}></Route>
      <Route path='/home'  element={<Home/>}></Route>
    </Routes>
   </div>
  );
} else {
  return (
 <div>
  <Routes>
    <Route path='/homepage'  element={<Homepage/>}></Route>
    <Route path='/home'  element={<Home/>}></Route>
    <Route path='/homezoo'  element={<Homezoo/>}></Route>
    <Route path='/login'  element={<LoginForm/>}></Route>
    <Route path='/regis'  element={<RegisterPage/>}></Route>
    <Route path='/settring'  element={<Settring/>}></Route>
    <Route path='/news'  element={<News/>}></Route>
    <Route path='/addticket'  element={<Addticket/>}></Route>
    <Route path='/paymentlist'  element={<Paymentlist/>}></Route>
    <Route path='/makepayment'  element={<Makepayment/>}></Route>
    <Route path='/ticketpostpone'  element={<Ticketpostpone/>}></Route>
    <Route path='/ReservationCancellation'  element={<ReservationCancellation/>}></Route>
    <Route path='/OrderList'  element={<OrderList/>}></Route>
    <Route path='/CancelDialog'  element={<CancelDialog/>}></Route>
    <Route path='/'  element={<IntroHomepage/>}></Route>
    <Route path='/Editprofile'  element={<Editprofile/>}></Route>
    <Route path='/Editpass'  element={<Editpass/>}></Route>
    <Route path='/NewsDetail'  element={<NewsDetail/>}></Route>
  </Routes>
 </div>
  );
}
}

export default App;
