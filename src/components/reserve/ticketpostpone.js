
import React, { useState, useEffect } from 'react';
import backgroundImage from '../img/bgg.png'; // นำเข้าภาพพื้นหลัง
import Navbar from '../navbar/navbar';
import imgtikket from '../img/imgticket.png';
import QRCode from 'react-qr-code';
import imgzoos from '../model/imgmodel';
import Zpotlogo from '../img/ZPOT_LOGO.png';
import Calendar from 'react-calendar';
import '../ticket/cder.css';
import { useLocation, Link } from 'react-router-dom';
function Ticketpostpone() {
    const [date, setDate] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const location = useLocation();
    const { state } = location;
    const [idzoo, setidzoo] = useState([]);
    const [onlineoder, setonlineoder] = useState([]);
    const [amount, setamount] = useState([]);
    const [qrData, setontqrData] = useState([]);
    const [onDate, setonDate] = useState([]);
    const [idbill, setidbill] = useState([]);
    const [status, setstatus] = useState([]);
    const [idticket, setidticket] = useState([]);
    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "id": state.id
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://addpay.net/api/v1/zoo/e-member/online-order", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setonlineoder(result.online_tickets);
                setontqrData(result.ref1);
                setidzoo(result.zoo_id);
                setamount(result.amount);
                setstatus(result.status);
                setonDate(result.onDate);
                setidbill(result.ref1);
            })
            .catch((error) => console.error(error));
    }, []); // ให้ useEffect ทำงานเมื่อ filterStatus เปลี่ยนแปลง
    let zooImg;
    let zooname;
    if (idzoo !== null) {
        const foundZoo = imgzoos.find(item => item.id === idzoo);
        zooImg = foundZoo ? foundZoo.img : null;
        zooname = foundZoo ? foundZoo.name : null;
    } else {
        // กำหนดรูปภาพเริ่มต้นในกรณีที่ zoo_id เป็น null
        zooImg = Zpotlogo;
        zooname = 'องค์การสวนสัตว์แห่งประเทศไทย';
    }
    const handleCheckboxChange = (id) => {
        setIsChecked(id);
        setidticket(id);
        console.log(id);
    };
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

    return (
        <div>
            <section
                className=" text-center"

            >
                <Navbar />


                <div className="mt-2" style={{ textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Kanit', fontWeight: '275', wordWrap: 'break-word' }}>BUY ZOO TICKET</div>
                <div style={{ textAlign: 'center', color: 'black', fontSize: 48, fontFamily: 'Kanit', fontWeight: '400', wordWrap: 'break-word' }}>จองตั๋วสวนสัตว์</div>
                <div className="container py-2 " style={{ background: 'rgba(255, 255, 255, 0.80)', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.30)', borderRadius: 72 }}>
                    <div className="row">
                        <div className="col-md-6 mt-5">

                            <div className='container py-5' style={{ background: 'white', borderRadius: 72, border: '3px #02F4BD solid' }} >

                                <div style={{ textAlign: 'center', color: '#0C9331', fontSize: 36, fontFamily: 'Kanit', fontWeight: '400' }}>แสกน QR <br />เพื่อเข้าชมสวนสัตว์   </div>
                                <div className='container mt-5'>
                                    <QRCode value={qrData} />
                                </div>

                            </div>

                        </div>
                        <div className="col-md-6 py-5">
                            <div className="row mt-2">
                                <div className="col-md-3 col-sm-12 text-center">
                                    <div style={{ width: 130, height: 139, background: 'white', borderRadius: 17, border: '3px #02F4BD solid' }}>
                                        <img style={{ width: 100, height: 120 }} src={zooImg} alt="Ticket" />
                                    </div>
                                </div>
                                <div className="col-md-9 col-sm-12 ">
                                    <div style={{ textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Kanit', fontWeight: '400' }}>รหัสอ้างอิง : {idbill}</div>
                                    <div style={{ textAlign: 'center', color: 'black', fontSize: 30, fontFamily: 'Kanit', fontWeight: '400' }}>บัตรเข้าชม{zooname}</div>
                                    <div style={{ color: 'black', fontSize: 24, fontFamily: 'Kanit', fontWeight: '275' }}>วันที่ : {date.toString() != '' ? date.toString() : onDate} </div>

                                </div>
                            </div>
                            <div className="overflow-scroll">
                                <div className='row'>
                                    {onlineoder.map(items => (
                                        <div className="col-md-12 py-2">
                                            <div className="container py-2" style={{ background: 'white', boxShadow: '0px 0px 7.699999809265137px rgba(0, 0, 0, 0.25)', borderRadius: 15, border: '2px #02F4BD solid' }}>
                                                <div className="row align-items-center">
                                                    <div className="col-1">
                                                        <input
                                                            type="radio"
                                                            checked={isChecked === items.id}
                                                            id={`flexRadioDefault${items.id}`}
                                                            name="flexRadioDefault"
                                                            onChange={() => handleCheckboxChange(items.id)}
                                                        />
                                                    </div>
                                                    <div className="col-2"><img src={imgtikket} alt="Ticket" /></div>
                                                    <div className="col-5">
                                                        <div style={{ textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>ticket.name</div>
                                                        <div style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>รายการ : ticket.name</div>
                                                        <div style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>ราคา : ticket.price ฿</div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div style={{ textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>ticket.id</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>



                            <div className="col-md-12 mt-2">
                                <div className='row'>

                                    <div className="container col-4">
                                        <button data-toggle="modal" data-target="#staticBackdrop" style={{ width: 150, height: 58, background: 'linear-gradient(180deg, #FFBA3F 0%, #E96100 63%)', borderRadius: 124, border: '2px #FFBA3F solid' }} type="button" className="btn btn-primary">เลือกวันที่</button>
                                    </div>
                                    <div className="container col-4">


                                        <button className='btn btn-primary mt-2' data-toggle="modal" data-target="#exampleModal" style={{ width: 155, height: 58, background: 'linear-gradient(180deg, #144AEA 0%, #1459EE 63%)', borderRadius: 124, border: '2px #1B59E1 solid' }} type="button">
                                            <Link to='/OrderList' style={{ color: 'white', textDecoration: 'none' }}>ย้อนกลับ</Link>
                                        </button>

                                    </div>
                                    <div className="container col-4">
                                        <button className={`btn btn-primary mt-2 ${date.toString() != '' ? '' : 'disabled'}`} data-toggle="modal" data-target="#exampleModal" style={{ width: 150, height: 58, background: 'linear-gradient(180deg, #0ACC37 0%, #05CF19 63%)', borderRadius: 124, border: '2px #1BE164 solid' }} type="button" >บันทึกรายการ</button>
                                    </div>

                                </div>




                            </div>
                        </div>
                    </div>
                </div>


            </section>
            < div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog  modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">เลื่อนบัตรวันที่เข้าชมสวนสัตว์</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="calendar-container">
                                {date.toString()}
                                <Calendar
                                    onChange={onChange}
                                    value={date}
                                />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal">เลือก</button>
                        </div>
                    </div>
                </div>
            </div>

            \
        </div>
    )
}

export default Ticketpostpone








