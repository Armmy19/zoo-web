import React, { useState, useEffect } from 'react';
import backgroundImage from '../img/bgg.png'; // นำเข้าภาพพื้นหลัง
import Logo010 from '../img/img010.png'; // นำเข้าภาพพื้นหลัง
import Group from '../img/Group.png'; // นำเข้าภาพพื้นหลัง
import News from '../img/news.png'; // นำเข้าภาพพื้นหลัง
import Navbar from '../navbar/navbar';
import './hover.css';
import imgzoos from '../model/imgmodel';
import { Link, useNavigate } from 'react-router-dom';
function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [zoos, setZoos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newsData, setNewsData] = useState(null);

    // useEffect(() => {
    //     const news = {
    //         method: "GET",
    //         redirect: "follow"
    //     };

    //     fetch("https://addpay.net/e-member/public/api/news", news)
    //         .then(response => response.json())
    //         .then(result => {
    //          console.log(result);
    //             setNewsData(result);
    //         })
    //         .catch(error => console.error(error));
    // }, []); // useEffect จะถูกเรียกใช้เมื่อคอมโพเนนต์ถูกโหลดครั้งแรกเท่านั้น
    // useEffect(() => {
    //     const isLoggedIn = localStorage.getItem('token');
    //     if (isLoggedIn) {
    //         setIsLoggedIn(true);
    //     }
    // }, []);

    // useEffect(() => {

    //     const requestOptions = {
    //         method: "GET",
    //         mode: "cors", // เพิ่มโหมด 'no-cors' เข้าไป
    //         redirect: "follow"
    //     };


    //     fetch("https://addpay.net/api/v1/zoo/e-member/all-zoo", requestOptions)
    //         .then((response) => response.json()) // แปลงข้อมูลเป็น JSON
    //         .then((data) => {
    //             setZoos(data); // กำหนดค่า zoos ด้วยข้อมูลที่ได้รับมา
    //             setLoading(false); // เมื่อโหลดเสร็จสิ้น
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             setLoading(false); // ถ้าเกิดข้อผิดพลาดก็เปลี่ยน loading เป็น false
    //         });
    // }, []);


    useEffect(() => {
        const isLoggedIn = localStorage.getItem('token');
        if (isLoggedIn) {
            setIsLoggedIn(true);
        }
        const fetchData = async () => {
            try {
                const newsResponse = await fetch("https://addpay.net/e-member/public/api/news");
                const zoosResponse = await fetch("https://addpay.net/api/v1/zoo/e-member/all-zoo");

                if (!newsResponse.ok || !zoosResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const newsData = await newsResponse.json();
                const zoosData = await zoosResponse.json();

                console.log(newsData);
                console.log(zoosData);

                setNewsData(newsData);
                setZoos(zoosData);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (!isLoggedIn) {
        navigate('/');
        return null;
    } else {



        return (
            <div>
                <section
                    className="text-center"
                    style={{
                        // height: '100vh', // ความสูงเท่ากับขนาดหน้าจอ
                        backgroundImage: `url(${backgroundImage})`, // ใช้ backgroundImage เพื่อกำหนดพื้นหลัง
                        backgroundSize: 'cover', // ปรับขนาดรูปภาพให้เต็มพื้นที่
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Navbar />
                    {loading ? (
                        <div className="containar py-5 text-center">
                            <div className="containar py-5 alert alert-danger" role="alert">
                                กำหลังโหลดข้อมมูล.....
                            </div>
                        </div>
                    ) : (

                        // <div className="container text-center py-5 mt-5" style={{
                        // }}>
                        //     <div className='row'>
                        //         {zoos.map((zoo) => (
                        //             <div className=' py-2' key={zoo.id}>
                        //                 <div className="container py-2" style={{ width: 500.69, height: 637, background: 'linear-gradient(180deg, white 38%, #7ED3F9 76%, #00A7F4 100%)', boxShadow: '0px 0px 23px rgba(0, 0, 0, 0.25)', borderRadius: 48, border: '3px #0075F4 solid' }} >
                        //                     <img className="" style={{ height: 300, borderRadius: '100px' }} src={imgzoos.find(item => item.id === zoo.id).img} alt="Card image cap" />
                        //                     <div style={{}}>
                        //                         <div style={{ textAlign: 'center', color: '#17612F', fontSize: 36, fontFamily: 'Kanit', fontWeight: '400', wordWrap: 'break-word' }}>สวนสัตว์เปิดเขาเขียว ฉลอง
                        //                             <br />“วันอนุรักษ์แรดโลก”</div>
                        //                         <div style={{ textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Kanit', fontWeight: '275', wordWrap: 'break-word' }}>สวนสัตว์เปิดเขาเขียว ฉลอง”วันอนุรักษ์แรดโลก” <br />เปิดตัวสมชิกใหม่
                        //                             “ลูกแรดขาว”</div>

                        //                     </div>

                        //                     <a style={{width: 264.25, height: 55.86,  background: 'linear-gradient(180deg, #02F4BD 0%, #0075F4 100%)', borderRadius: 103, border: '2px white solid'}} href="#" className="btn btn-primary mt-3">รายละเอียด</a>
                        //                 </div>

                        //             </div>
                        //         ))}
                        //     </div>
                        // </div>

                        <div id="zooCarousell" className="carousel slide " data-ride="carousel">
                            <img className="mt-5" style={{}} src={News} alt="Card image cap" />
                            <div className="carousel-inner">
                                {newsData && (
                                    <div className="row">
                                        {/* วนลูปเพื่อแสดงข้อมูลทั้งหมด */}
                                        {Object.values(newsData).map(news => (

                                            <div className="col-lg-4 col-md-4 py-3" key={news.id}>
                                                <div className="py-3 card-with-shadow1" style={{ background: 'linear-gradient(180deg, white 38%, #7ED3F9 76%, #00A7F4 100%)', boxShadow: '0px 0px 23px rgba(0, 0, 0, 0.25)', borderRadius: 48, border: '3px #0075F4 solid' }} >
                                                    <img className="" style={{ height: 300, borderRadius: '50px' }} src={`${newsData.img_path}${news.thumbnail}`}  onError={(e) => {
                                        e.target.src = Group;
                                    }} alt="Card image cap" />
                                                    <div style={{}}>
                                                        <div style={{ textAlign: 'center', color: '#17612F', fontSize: 30, fontFamily: 'Kanit', fontWeight: '400', wordWrap: 'break-word' }}>{news.title}
                                                        </div>
                                                        {news.detail && (
                                                            <div style={{ textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Kanit', fontWeight: '275', wordWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: news.detail.slice(0, 500) }} />
                                                        )}



                                                    </div>

                                                    <Link key={news.id}
                                                        to='/NewsDetail' state={{

                                                            imgurl: `${newsData.img_path}${news.thumbnail}`,
                                                            title: news.title,
                                                            detail: news.detail,
                                                            updatedat: news.updated_at,
                                                            id: news.id
                                                        }} style={{ width: 264.25, height: 55.86, background: 'linear-gradient(180deg, #02F4BD 0%, #0075F4 100%)', borderRadius: 103, border: '2px white solid' }} href="#" className="btn btn-primary mt-3">รายละเอียด</Link>
                                                </div>

                                            </div>

                                        ))}
                                    </div>
                                )}
                                {/* {zoos.map((zoo, index) => (
                                    <div className={`carousel-item  ${index === 0 ? 'active' : ''}`} key={zoo.id}>
                                        <div className="row py-5">
                                            {zoos.slice(index, index + 3).map(zoo => (
                                                <div className="col-lg-4 col-md-4 py-3" key={zoo.id}>
                                                    <div className="py-3 card-with-shadow1" style={{ background: 'linear-gradient(180deg, white 38%, #7ED3F9 76%, #00A7F4 100%)', boxShadow: '0px 0px 23px rgba(0, 0, 0, 0.25)', borderRadius: 48, border: '3px #0075F4 solid' }} >
                                                        <img className="" style={{ width: 300.69, height: 300, borderRadius: '50px' }} src={imgzoos.find(item => item.id === zoo.id).img} alt="Card image cap" />
                                                        <div style={{}}>
                                                            <div style={{ textAlign: 'center', color: '#17612F', fontSize: 30, fontFamily: 'Kanit', fontWeight: '400', wordWrap: 'break-word' }}>สวนสัตว์เปิดเขาเขียว ฉลอง
                                                                <br />“วันอนุรักษ์แรดโลก”</div>
                                                            <div style={{ textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Kanit', fontWeight: '275', wordWrap: 'break-word' }}>สวนสัตว์เปิดเขาเขียว ฉลอง”วันอนุรักษ์แรดโลก” <br />เปิดตัวสมชิกใหม่
                                                                “ลูกแรดขาว”</div>

                                                        </div>

                                                        <a style={{ width: 264.25, height: 55.86, background: 'linear-gradient(180deg, #02F4BD 0%, #0075F4 100%)', borderRadius: 103, border: '2px white solid' }} href="#" className="btn btn-primary mt-3">รายละเอียด</a>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))} */}
                            </div>
                            <a className="carousel-control-prev" href="#zooCarousell" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">ก่อนหน้า</span>
                            </a>
                            <a className="carousel-control-next" href="#zooCarousell" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">ถัดไป</span>
                            </a>
                        </div>

                    )}
                    <div className=" py-5 text-center mt-5" style={{
                        // height: '100vh', // ความสูงเท่ากับขนาดหน้าจอ
                        backgroundColor: 'white', /* สีพื้นหลังโปร่งใส */
                        backgroundSize: 'cover', // ปรับขนาดรูปภาพให้เต็มพื้นที่
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '80px 80px 0px 0px',
                        padding: '60px', /* ระยะห่างของข้อความกับขอบ */

                    }}>
                        <div style={{ textAlign: 'center', color: 'black', fontSize: 40, fontFamily: 'Kanit', fontWeight: '400', wordWrap: 'break-word' }}>เลือกสถานที่ท่องเที่ยวสำหรับคุณ</div>
                        <div className="text-center py-5 mt-5" style={{
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '24px',
                            color: '#333', /* สีข้อความ */
                            backgroundImage: `url(${Logo010})`, // ใช้ backgroundImage เพื่อกำหนดพื้นหลัง

                            padding: '60px', /* ระยะห่างของข้อความกับขอบ */
                            borderRadius: '60px', /* ทำให้มีมุมโค้ง */
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)', /* เงา */
                            border: '3px #0075F4 solid'
                        }}>
                            <div id="zooCarousel" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">

                                    {zoos.map((zoo, index) => (

                                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={zoo.id}>
                                            <div className="row">
                                                {zoos.slice(index, index + 6).map(zoo => (

                                                    <div className="col-lg-2 col-md-2 " key={zoo.id}>
                                                        <Link
                                                            key={zoo.id}
                                                            to="/addticket" state={{
                                                                imageUrl: imgzoos.find(item => item.id === zoo.id).img,
                                                                name: zoo.name,
                                                                id: zoo.id
                                                            }}>


                                                            <div className="container card-with-shadow text-center py-5" style={{ borderRadius: 22, border: '2px #0075F4 solid' }} >
                                                                <div className='card-with-shadow' style={{ width: 114, height: 122, background: 'white', borderRadius: 17, border: '1px #007DF1 solid', display: 'inline-block', marginRight: 10 }}>
                                                                    <img className="card-img-top" style={{ height: 120, borderRadius: '120px' }} src={imgzoos.find(item => item.id === zoo.id).img} alt="Card image cap" />
                                                                </div>
                                                                <div className='mt-3' style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Kanit', fontWeight: '400', wordWrap: 'break-word' }}>{zoo.name}</div>
                                                                <div style={{ textAlign: 'center', color: '#17612F', fontSize: 11, fontFamily: 'Kanit', fontWeight: '300', wordWrap: 'break-word' }}>เปิดทุกวัน เวลา 09.00 น.-17.00น.</div>
                                                            </div></Link>

                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    ))}
                                </div>
                                <a className="carousel-control-prev" href="#zooCarousel" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">ก่อนหน้า</span>
                                </a>
                                <a className="carousel-control-next" href="#zooCarousel" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">ถัดไป</span>
                                </a>
                            </div>
                        </div>

                    </div>

                </section>









            </div>
        );
    }
}

export default Home;
