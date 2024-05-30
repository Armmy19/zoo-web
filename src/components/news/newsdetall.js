import React, { useState, useEffect } from 'react';
import './news.css'
import Navbar from "../navbar/navbar";
import KKlogo from '../img/KK-zoo.png';
import Zpotlogo from '../img/ZPOT_LOGO.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

export default function NewsDetail() {
    const location = useLocation();
    const { state } = location;
    const isoDateString = "2024-04-04T10:30:25.000000Z";
const isoDateWithoutTime = isoDateString.split("T")[0];
const isoDate = new Date(isoDateWithoutTime);
const thaiDate = `${isoDate.getDate()} ${getThaiMonth(isoDate.getMonth() + 1)} ${isoDate.getFullYear()}`;

function getThaiMonth(month) {
    const thaiMonths = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม",
        "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน",
        "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    return thaiMonths[month - 1];
}

console.log(thaiDate);

    return (
        <div className="bg-white">
            <section className="bg-section">
                <Navbar />

            </section>
            {/* ตรวจสอบว่าข้อมูลมีค่าหรือไม่ก่อนแสดงผล */}
            <div className="container-fluid">
                <div className="row">
                    <div style={{ width: '100%', boxShadow: '0px 0px 35px rgba(0, 0, 0, 0.50)' }}>
                        <div className="cover-news ">
                            <div className="cover-img" >
                                {/* <img src="https://www.seub.or.th/seubweb/wp-content/uploads/2024/01/33.jpg" 
                                /> */}
                                <img
                                    src=  {state.imgurl}
                                    onError={(e) => {
                                        e.target.src = 'https://www.seub.or.th/seubweb/wp-content/uploads/2024/01/33.jpg';
                                    }}
                                    alt="Alternative text"
                                />

                            </div>

                          
                            <div className="col-12 col-md-6 col-xl-4 p-5 text-cont" >
                                <div className="row img-title">
                                    <img src={Zpotlogo} />
                                    {/* <img  src={KKlogo} /> */}

                                </div>
                                <div className="text-pa mt-4 px-3 px-md-4">
                                    <p className="title " >{state.title}</p>

                                    <p className="mt-3 mt-lg-4  detail">
                                        <FontAwesomeIcon icon={faCalendarDays} className="icon" />{thaiDate}</p>
                                </div>



                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div className="container mt-5 bg-white sect-news pb-5 pb-md-5">

                <p className="title text-center">{state.title}</p>

                <p className="detail mt-3 mt-md-5" >

                    &emsp;      <p dangerouslySetInnerHTML={{ __html: state.detail }}></p>
                </p>





                <p className="mt-5 mt-lg-5 detail ">
                    <FontAwesomeIcon icon={faCalendarDays} className="icon" />{thaiDate}
                </p>
            </div>
        </div>
    );
}

