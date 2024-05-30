import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './cder.css';
import backgroundImage from '../img/bgg.png'; // นำเข้าภาพพื้นหลัง
import Navbar from '../navbar/navbar';
import imgtikket from '../img/imgticket.png';
import { useLocation, Link, Navigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
function Addticket() {
  const [Ticket, setTicket] = useState([]);
  const [selectedTickets, setselectedTickets] = useState([]);
  const [date, setDate] = useState('');
  const [qrData, setqrData] = useState('');
  const [ticketCounts, setTicketCounts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const location = useLocation();
  const { state } = location;
  const handlePayLater = () => {
    // ซ่อน modal โดยใช้ id ของ modal
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
    // นำผู้ใช้ไปยังหน้า home
    window.location.href = '/home';
  };
  // const onChange = (newDate) => {
  //   setDate(newDate);
  // };

  const onChange = (newDate) => {
    // สร้างวันที่ปัจจุบัน
    const currentDate = new Date();

    // หาความแตกต่างระหว่างวันที่ที่เลือกกับวันที่ปัจจุบัน
    const timeDifference = newDate.getTime() - currentDate.getTime();

    // ถ้าวันที่ที่เลือกมากกว่าหรือเท่ากับวันที่ปัจจุบัน ให้ทำการตั้งค่าวันที่ใหม่
    if (timeDifference >= 0) {
      // ดึงข้อมูลวันที่, เดือน, และปี
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, '0'); // เพิ่ม 1 เพราะเดือนเริ่มนับจาก 0
      const day = String(newDate.getDate()).padStart(2, '0');

      // สร้างรูปแบบใหม่ "YYYY-MM-DD"
      const formattedDate = `${year}-${month}-${day}`;

      // ตรวจสอบว่าเป็นวันปัจจุบันหรือไม่
      if (timeDifference === 0) {
        alert('กรุณาเลือกวันถัดไป');
      } else {
        // ตั้งค่าวันที่ใหม่
        setDate(formattedDate);
      }
    } else {
      alert('กรุณาเลือกวันที่ถัดไปหรือวันในอนาคต');
    }
  };




  const decreaseCount = (ticketId) => {
    setTicketCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      if (updatedCounts[ticketId] > 0) {
        updatedCounts[ticketId]--;
      }
      return updatedCounts;
    });
  };

  const increaseCount = (ticketId) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [ticketId]: (prevCounts[ticketId] || 0) + 1,
    }));

  };
  useEffect(() => {
    handleProceed();
  }, [ticketCounts]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      mode: "cors", // เพิ่มโหมด 'no-cors' เข้าไป
    };

    fetch(`https://addpay.net/api/v1/zoo/e-member/ticket-zoo/${state.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setTicket(result);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleProceed = () => {
    const selectedTickets = Ticket.filter((ticket) => ticketCounts[ticket.id] > 0);
    const totalPrice = selectedTickets.reduce((acc, ticket) => acc + (ticketCounts[ticket.id] * ticket.price), 0);
    setTotalPrice(totalPrice);
    setselectedTickets(selectedTickets);
    console.log(selectedTickets);
    // ทำอะไรกับ selectedTickets เช่น ส่งไปยังหน้าต่อไป
  };

  const saveSelectedTickets = () => {
    // สร้างชุดข้อมูลของบัตรที่เลือก

    const selectedTicketsData = {
      tickets: selectedTickets.map(ticket => ({
        id: ticket.id,
        name: ticket.name,
        price: ticket.price,
        amount: ticketCounts[ticket.id]
      })),
      // คำนวณผลรวมราคาทั้งหมด
      amount: totalPrice,
      // กำหนดหมายเลขไอดีผู้ทำการสั่งซื้อ (ให้แทนด้วยค่าคงที่สำหรับตอนนี้)
      member: 1,
      // กำหนดวันที่เข้ามาใช้งาน
      onDate: date // ใช้ตัวแปรที่เก็บวันที่ที่เลือกมาก่อนหน้านี้
    };
    // ทำการบันทึกข้อมูลที่ได้เป็น JSON
    // console.log(JSON.stringify(selectedTicketsData));

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(selectedTicketsData),
      redirect: "follow"
    };

    fetch("https://addpay.net/api/v1/zoo/e-member/onlinePayment", requestOptions)
      .then(response => response.json())
      .then(result => {
        // ตรวจสอบความถูกต้องของข้อมูลที่ได้รับ
        console.log(result);

        // เข้าถึงข้อมูล tqrc_qr และเก็บไว้ในตัวแปร qrCodeData
        const qrCodeData = result.order.tqrc_qr;

        // นำข้อมูล QR code ไปใช้งานต่อได้ตามต้องการ เช่น แสดง QR code บนหน้าเว็บ
        console.log(qrCodeData);
        setqrData(qrCodeData);
      })
      .catch(error => console.error(error));
  };


  // const qrData = "00020101021230760016A0000006770101120115099400016486604021599112705670000203142024052713230153037645406400.005802TH6304D63C";
  return (
    <div style={{ height: '100%' }}>
      {/* <PaymentList datas={JSON.stringify(selectedTicketsData)}/> */}
      <section
        className="text-center"

      >
        <Navbar />
        <div className="mt-2" style={{ textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Kanit', fontWeight: '275', wordWrap: 'break-word' }}>BUY ZOO TICKET </div>
        <div style={{ textAlign: 'center', color: 'black', fontSize: 48, fontFamily: 'Kanit', fontWeight: '400', wordWrap: 'break-word' }}>จองตั๋วสวนสัตว์</div>
        <div className="container py-2 " style={{ background: 'rgba(255, 255, 255, 0.80)', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.30)', borderRadius: 72 }}>
          <div className="row">
            <div className="col-md-4 mt-5">
              <div className="calendar-container">
                {date.toString()}
                <Calendar
                  onChange={onChange}
                  value={date}
                />
              </div>

              <div className="col-md-12 mt-2">
                <div className="container">
                  <button data-toggle="modal" data-target="#exampleModal" style={{ width: 150, height: 40, background: 'linear-gradient(180deg, #02F4BD 0%, #0075F4 100%)', borderRadius: 124, border: '2px #0075F4 solid' }} type="button" className="btn btn-primary">รายการที่เลือก</button>

                  <button data-toggle="modal" data-target={selectedTickets.length === 0 ? '' : '#exampleModalp'}
                    // key={1}
                    // to="/paymentlist" state={{
                    //   selectedTickets: selectedTickets,

                    // }}
                    onClick={saveSelectedTickets}
                    style={{ width: 150, height: 40, background: 'linear-gradient(180deg, #02F4BD 0%, #12AC27 100%)', borderRadius: 124, border: '2px #11BB27 solid' }} type="button" data-dismiss="modal" className={`btn btn-primary mt-2 ${selectedTickets.length === 0 ? 'disabled' : ''}`}>ชำระเงิน</button>

                </div>  </div>
            </div>
            <div className="col-md-8 py-5">
              <div className="row mt-2">
                <div className="col-md-3 col-sm-12 text-center">
                  <div style={{ width: 130, height: 139, background: 'white', borderRadius: 17, border: '2px #007DF1 solid' }}>
                    <img style={{ width: 100, height: 120 }} src={state.imageUrl} alt="Ticket" />
                  </div>
                </div>
                <div className="col-md-9 col-sm-12 ">
                  <div style={{ color: 'black', fontSize: 40, fontFamily: 'Kanit', fontWeight: '400' }}>{state.name}</div>
                  <div style={{ color: 'black', fontSize: 30, fontFamily: 'Kanit', fontWeight: '300' }}>เปิดทุกวัน เวลา 09.00 น.-17.00น.</div>
                </div>
              </div>
              <div className=" overflow-scroll">
                {Ticket.map((Tickets) => (
                  <div key={Tickets.id} className="col-md-12 py-2">
                    <div className="container py-1" style={{ background: 'white', boxShadow: '0px 0px 7.699999809265137px rgba(0, 0, 0, 0.25)', borderRadius: 15, border: '2px #02F4BD solid' }}>
                      <div className="row">
                        <div className="col-4">
                          <img src={imgtikket} alt="Ticket" />
                        </div>
                        <div className="col-4 py-3">
                          <div style={{ textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Kanit', fontWeight: '300' }}>{Tickets.name}</div>
                          <div style={{ textAlign: 'center', color: '#0C9331', fontSize: 13, fontFamily: 'Kanit', fontWeight: '300' }}>ราคา {Tickets.price} บาท</div>
                        </div>
                        <div className="col-4 mt-4">
                          <div className="row">
                            <div className="col-4" onClick={() => decreaseCount(Tickets.id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                              </svg>
                            </div>
                            <div className="col-4">{ticketCounts[Tickets.id] || 0}</div>
                            <div className="col-4" onClick={() => increaseCount(Tickets.id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>





      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" >
          <div class="modal-content" style={{ background: 'white', boxShadow: '0px 0px 7.699999809265137px rgba(0, 0, 0, 0.25)', borderRadius: 50, border: '2px #02F4BD solid' }}>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">รายการบัตรเข้าชม วันที่        {date.toString()}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="row py-5">

                {selectedTickets.map((tickets) => (
                  <div key={tickets.id} className="col-md-6 py-2">
                    <div className="container py-2" style={{ background: 'white', boxShadow: '0px 0px 7.699999809265137px rgba(0, 0, 0, 0.25)', borderRadius: 15, border: '2px #02F4BD solid' }}>
                      <div className="row">
                        <div className="col-3"><img src={imgtikket} alt="Ticket" /></div>
                        <div className="col-6">
                          <div style={{ textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>{state.name}</div>
                          <div style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>รายการ : {tickets.name}</div>
                          <div style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>ราคา : {tickets.price} ฿</div>

                        </div>
                        <div className="col-3">

                          <div style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>x{ticketCounts[tickets.id]}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  // <li key={tickets.id}>
                  //   {tickets.name}: {tickets.price} บาท {ticketCounts[tickets.id]} ใบ

                  // </li>
                ))}

              </div>
            </div>
            <div class="modal-footer">
              <div className="col-md-12 ">
                <div style={{ textAlign: 'center' }}>
                  <span style={{ color: 'black', fontSize: 20, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>ยอดทั้งหมด </span>
                  <span style={{ color: '#FF0000', fontSize: 36, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>{totalPrice} ฿</span>
                </div>
              </div>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="exampleModalp" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" >
          <div class="modal-content" style={{ background: 'white', boxShadow: '0px 0px 7.699999809265137px rgba(0, 0, 0, 0.25)', borderRadius: 50, border: '2px #02F4BD solid' }}>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">รายการบัตรเข้าชม วันที่        {date.toString()}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="row">



                <div className="container " >
                  <div className="">
                    <div className="col-md-12 text-center mt-5">

                      <div className='container' style={{ height: 670, background: 'white', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.30)', borderRadius: 72 }}>
                        <div className='container ' style={{ textAlign: 'center', color: '#0C9331', fontSize: 25, fontFamily: 'Kanit', fontWeight: '400', }}>แสกน QR เพื่อชำระเงิน</div>

                        <div className='container mt-5'>
                          <QRCode value={qrData} />
                        </div>
                        <div className='container mt-5' style={{ textAlign: 'center', color: '#7C7C7C', fontSize: 30, fontFamily: 'Kanit', fontWeight: '400', wordWrap: 'break-word' }}>ยอดชำระเงินทั้งหมด {totalPrice} บาท</div>
                        <div style={{ textAlign: 'center' }}>
                          <span style={{ color: '#FF0000', fontSize: 20, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>หมายเหตุ </span><span style={{ color: 'black', fontSize: 20, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>: ท่านสามารถทำรายการชำระในภายหลัง<br /> ได้ที่หน้าเมนูรายการจอง (Booking List)</span>
                        </div>
                      </div>

                    </div>
                    <div className="col-md-12 py-5">
                      <div className=" mt-2">
                        <div className="col-12 text-center">
                          <div style={{ width: 130, height: 139, background: 'white', borderRadius: 17, border: '2px #007DF1 solid' }}>
                            <img style={{ width: 100, height: 120 }} src={state.imageUrl} alt="Ticket" />
                          </div>
                        </div>
                        <div className="col-12 ">


                        </div>
                      </div>
                      <div className="overflow-scroll">
                        <div className='row'>
                          {selectedTickets.map((tickets) => (
                            <div key={Ticket.id} className="col-md-12 py-2">
                              <div className="container py-2" style={{ background: 'white', boxShadow: '0px 0px 7.699999809265137px rgba(0, 0, 0, 0.25)', borderRadius: 15, border: '2px #02F4BD solid' }}>
                                <div className="row">
                                  <div className="col-3"><img src={imgtikket} alt="Ticket" /></div>
                                  <div className="col-6">
                                    <div style={{ textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>{tickets.name}</div>
                                    <div style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>รายการ : {tickets.name}</div>
                                    <div style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>ราคา : {tickets.price} ฿</div>

                                  </div>
                                  <div className="col-3">

                                    <div style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>x{ticketCounts[tickets.id]}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>



                      <div className="col-md-12 mt-2">
                        <div className="container">
                          <div style={{ textAlign: 'center' }}><span style={{ color: 'black', fontSize: 20, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>ยอดชำระเงินทั้งหมด  </span><span style={{ color: '#FF0000', fontSize: 36, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>{totalPrice}   ฿</span></div>
                        </div>

                      </div>
                      <div className="col-md-12 mt-2 text-center">
                        <div className="container">
                          <Link to="/home" onClick={handlePayLater} style={{ width: 292, height: 58, background: 'linear-gradient(180deg, #02F4BD 0%, #0075F4 100%)', borderRadius: 124, border: '2px #0075F4 solid' }} type="button" className="btn btn-primary">ชำระภายหลัง</Link>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
                {/* // <div key={tickets.id} className="col-md-6 py-2">
                  //   <div className="container py-2" style={{ background: 'white', boxShadow: '0px 0px 7.699999809265137px rgba(0, 0, 0, 0.25)', borderRadius: 15, border: '2px #02F4BD solid' }}>
                  //     <div className="row">
                  //       <div className="col-3"><img src={imgtikket} alt="Ticket" /></div>
                  //       <div className="col-6">
                  //         <div style={{ textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>{state.name}</div>
                  //         <div style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>รายการ : {tickets.name}</div>
                  //         <div style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>ราคา : {tickets.price} ฿</div>

                  //       </div>
                  //       <div className="col-3">

                  //         <div style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>x{ticketCounts[tickets.id]}</div>
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div> */}




              </div>
            </div>
            <div class="modal-footer">

              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Addticket;




// import { useLocation } from 'react-router-dom';

// const NextPage = () => {
//   const location = useLocation();
//   const { selectedTickets } = location.state;

//   return (
//     <div>
//       <h1>Selected Tickets</h1>
//       <ul>
//         {selectedTickets.map(ticket => (
//           <li key={ticket.id}>
//             {ticket.name}: {ticketCounts[ticket.id]} ใบ
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// import { Link } from 'react-router-dom';

// <Link
// to={{
//   pathname: '/next-page',
//   state: { selectedTickets: selectedTickets }
// }}
// >
//   Go to Next Page
// </Link>
