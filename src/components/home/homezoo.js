import React, { useState, useEffect } from 'react';
import backgroundImage from '../img/bgg.png'; // นำเข้าภาพพื้นหลัง
import zoo002 from '../img/zoo002.png'; // นำเข้าภาพพื้นหลัง
import Navbar from '../navbar/navbar';
import './hover.css';
import { Link } from 'react-router-dom';
function Homezoo() {
    const [zoos, setZoos] = useState([]);
    const [loading, setLoading] = useState(true);
    const imgzoos = [
        {
            id: 1,
            img: "https://pbs.twimg.com/media/ETn6ifZUcAEAbZd.jpg",
            name: "สวนสัตว์เปิดเขาเขียว",

        },
        {
            id: 2,
            img: "https://chiangmai.zoothailand.org/images/article/news1099/n20200225_1099.png",
            name: "สวนสัตว์เชียงใหม่",

        },
        {
            id: 3,
            img: "https://able.co.th/wp-content/uploads/2022/09/d954160c-3d5d-4a80-9bc3-3cc6562ad6c2.png",
            name: "สวนสัตว์นครราชสีมา",

        },
        {
            id: 4,
            img: "https://img.salehere.co.th/p/1200x0/2023/04/10/uy3gpctib8hq.jpg",
            name: "สวนสัตว์อุบลราชธานี",

        },
        {
            id: 5,
            img: "https://backoffice.zoogether.me/uploads/zoo/WYDH5SXHVyfDshmGfozLGVby.png",
            name: "สวนสัตว์ขอนแก่น",

        },
        {
            id: 6,
            img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiDG-R1rupV-ithwjzK2e7LDY22-wYAGukUiOngEC-qRNdM4VfOAMT0aezwv3oWxZt2aEH3LJkxakbnUcvYDqTUSgwBm-AQJOgcgK5yJRdaDuN3PpG2Fyw6wPBr4YCN2ATPBB8IRc5xO6ha/s1600/SongkhlaZoo01.jpg",
            name: "สวนสัตว์สงขลา",

        },
        {
            id: 7,
            img: "https://backoffice.zoogether.me/uploads/zoo/WYDH5SXHVyfDshmGfozLGVby.png",
            name: "สวนสัตว์ขอนแก่น",

        },
        {
            id: 8,
            img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiDG-R1rupV-ithwjzK2e7LDY22-wYAGukUiOngEC-qRNdM4VfOAMT0aezwv3oWxZt2aEH3LJkxakbnUcvYDqTUSgwBm-AQJOgcgK5yJRdaDuN3PpG2Fyw6wPBr4YCN2ATPBB8IRc5xO6ha/s1600/SongkhlaZoo01.jpg",
            name: "สวนสัตว์สงขลา",

        },
        // เพิ่มข้อมูลอื่น ๆ ต่อไปนี้
    ];

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            mode: "cors", // กำหนดโหมดการร้องขอเป็น 'cors'
            redirect: "follow"
        };

        fetch("https://addpay.net/api/v1/zoo/e-member/all-zoo", requestOptions)
            .then((response) => response.json()) // แปลงข้อมูลเป็น JSON
            .then((data) => {
                setZoos(data); // กำหนดค่า zoos ด้วยข้อมูลที่ได้รับมา
                setLoading(false); // เมื่อโหลดเสร็จสิ้น
            })
            .catch((error) => {
                console.error(error);
                setLoading(false); // ถ้าเกิดข้อผิดพลาดก็เปลี่ยน loading เป็น false
            });
    }, []);

    return (
        <div>
            <section
                className="text-center"
                style={{
                  
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Navbar />
                <div className="mt-3" style={{ textAlign: 'center', color: 'black', fontSize: 24, fontFamily: 'Kanit', fontWeight: '275', wordWrap: 'break-word' }}>BUY ZOO TICKET</div>
                <img style={{}} src={zoo002} alt="Card image cap" />
                {loading ? (
                    <div className="containar py-5 text-center">
                        <div class="containar py-5 alert alert-danger" role="alert">
                            กำหลังโหลดข้อมมูล.....
                        </div>
                    </div>
                ) : (

                    <div className="container py-5" style={{
                        // fontFamily: 'Arial, sans-serif',
                        // fontSize: '24px',
                        color: '#333', /* สีข้อความ */

                        // padding: '10px', /* ระยะห่างของข้อความกับขอบ */
                        borderRadius: '60px', /* ทำให้มีมุมโค้ง */
                        // boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)', /* เงา */
                        // justifyContent: 'center',
                        // alignItems: 'center'
                        background: 'rgba(255, 255, 255, 0.50)', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.30)', borderRadius: 105
                    }}>

                        <div className='row mt-5'>
                            {zoos.map((zoo) => (

                                <Link
                                    key={zoo.id}
                                    to= "/addticket"   state= {{
                                        imageUrl: imgzoos.find(item => item.id === zoo.id).img,
                                        name: zoo.name,
                                        id: zoo.id
                                    }}                                   
                                   
                                >
                                    <div className="col-lg-4 col-md-4 col-sm-6 py-2 " key={zoo.id}>
                                        <div className="container card-with-shadow text-center py-5 " style={{ width: 193, height: 278, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.30)', borderRadius: 22, border: '2px #0075F4 solid' }} >
                                            <div className='card-with-shadow' style={{ width: 130, height: 139, background: 'white', borderRadius: 17, border: '1px #007DF1 solid', display: 'inline-block', }}>
                                                <img className="card-img-top" style={{ height: 120, borderRadius: '120px' }} src={imgzoos.find(item => item.id === zoo.id).img} alt="Card image cap" />
                                            </div>
                                            <div className='mt-3' style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Kanit', fontWeight: '400', wordWrap: 'break-word' }}>{zoo.name}</div>
                                            <div style={{ textAlign: 'center', color: '#17612F', fontSize: 11, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>เปิดทุกวัน เวลา 09.00 น.-17.00น.</div>
                                        </div>

                                    </div>

                                </Link>

                            ))}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Homezoo;
