import React, { useState, useEffect } from 'react';
import './listbooking.css';
import Navbar from '../navbar/navbar';
import Zpotlogo from '../img/ZPOT_LOGO.png';
import Addpay from '../img/addpay.png';
import imgzoos from '../model/imgmodel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
function OrderItem({ order }) {
  const getStatusLink = (status) => {
    switch (order.status) {
      case 'approved':
        return <Link key={order.id} to='/ticketpostpone' state={{

          id: order.id
        }} className="status text-primary">ดูรายการ<FontAwesomeIcon icon={faAngleRight} className="icon mx-0 px-0 mx-md-0 px-md-0 d-none d-sm-inline" /></Link>;
      case 'pending':
        return <Link key={order.id} to='/makepayment' state={{
    
          id: order.id
        }} className="status text-primary">ดูรายการ<FontAwesomeIcon icon={faAngleRight} className="icon mx-0 px-0 mx-md-0 px-md-0 d-none d-sm-inline" /></Link>;
      case 'cancle':
        return null;
      default:
        return null; // หรือค่าอื่น ๆ ที่คุณต้องการ
    }
  };


  let zooImg;
  let zooname;
  if (order.zoo_id !== null) {
    const foundZoo = imgzoos.find(item => item.id === order.zoo_id);
    zooImg = foundZoo ? foundZoo.img : null;
    zooname = foundZoo ? foundZoo.name : null;
  } else {
    // กำหนดรูปภาพเริ่มต้นในกรณีที่ zoo_id เป็น null
    zooImg = 'https://placeholder.com/150';
    zooname = 'องค์การสวนสัตว์แห่งประเทศไทย';
  }
  return (
    <div>

      <div className="cardContent">
        <div className="row box-card px-2 py-1" style={{ borderRadius: 15 }} >
          <div className="col-9 col-sm-12 col-md-9 p-1">
            <div className="row imgcard pl-2 pb-2">
              <img src={Zpotlogo} />
              <img src={Addpay} />
            </div>
            <h5>{zooname}</h5>
            <h5>รหัสอ้างอิง: {order.ref1}</h5>
            <p>วันที่: {order.onDate}</p>
            <p>ราคา: {order.amount} บาท</p>
          </div>
          <div className="col-3 col-sm-12 col-md-3 ">
            <div className="container" style={{ width: '80px', height: '80px' }}>
              <img style={{ width: '50px', height: '50px' }} src={zooImg} />
            </div>
          </div>
          <div className="col-12 mt-2 border-dark border-top py-2">
            <div className="d-flex justify-content-between">
              <span className={` ${order.status === "approved" ? "text-success" : order.status === "cancle" ? "text-ganger" : "text-primary"}`} >สถานะ: {order.status}</span>
              {getStatusLink(order.status)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null); // เพิ่ม state สำหรับเก็บสถานะที่ถูกเลือก

  useEffect(() => {
    const fetchData = async () => {
      const formdata = new FormData();
      formdata.append("user_id", "1");

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
      };

      try {
        const response = await fetch("https://addpay.net/api/v1/zoo/e-member/orderList", requestOptions);
        const result = await response.json();
        const filteredResults = result.filter((item) => {
          return filterStatus ? item.status === filterStatus : true; // กรองรายการคำสั่งซื้อตามสถานะที่เลือก
        });
        setOrders(filteredResults);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [filterStatus]); // ให้ useEffect ทำงานเมื่อ filterStatus เปลี่ยนแปลง

  const handleFilterStatus = (status) => {
    setFilterStatus(status); // ตั้งค่าสถานะที่ถูกเลือกเมื่อคลิกปุ่มเลือกดูสถานะ
  };

  return (
    <div>
      <section className="bg-section">
        <Navbar />
        <div className="container py-4 py-md-4 py-lg-5">
          <div className=" py-4 py-md-4 py-lg-5">
            <div className="toplist box-card py-2  py-md-4 py-lg-5 px-4" style={{ position: 'relative', borderRadius: '4em' }}>
              {/* tabs Nav */}
              {error && <p>{error}</p>}

              <ul className="nav nav-pills mb-3 d-flex justify-content-center" id="pills-tab" role="tablist" style={{ width: '100%', position: 'absolute', top: '-0.2%', left: '50%', transform: 'translate(-50%, -50%)' }} >
                <li className="nav-item pr-1 pr-md-3">
                  <a className="nav-link active " id="st-panding-tab" data-toggle="pill" role="tab" aria-selected="true" style={{ borderRadius: 26 }}
                    onClick={() => handleFilterStatus(null)}>ทั้งหมด</a>
                </li>
                <li className="nav-item pr-1 pr-md-3">
                  <a className="nav-link" id="st-panding-tab" data-toggle="pill" role="tab" aria-selected="true" style={{ borderRadius: 26 }}
                    onClick={() => handleFilterStatus("pending")}>รอชำระเงิน</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false" style={{ borderRadius: 26 }}
                    onClick={() => handleFilterStatus("approved")}>ชำระเงินแล้ว</a>
                </li>
                <li className="nav-item pl-1 pl-md-3">
                  <a className="nav-link" data-toggle="pill" role="tab" aria-selected="false" style={{ borderRadius: 26 }}
                    button onClick={() => handleFilterStatus("cancel")}>รายการยกเลิก</a>
                </li>
              </ul>

              {/* Tabs Content */}
              <div className="tab-content mt-3" id="pills-tabContent">
                <div className="tab-pane fade show active" id="st-panding" role="tabpanel" aria-labelledby="-tab">



                  <div className="row ">
                    {orders.map(order => (
                      <div key={order.id} className="col-12 col-sm-6  col-lg-4">

                        <OrderItem order={order} />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}

export default OrderList;
