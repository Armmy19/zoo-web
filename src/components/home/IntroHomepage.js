import React from 'react';
import ZOO from '../img/imgwel.png'; // นำเข้าภาพพื้นหลัง
import h002 from '../img/h002.png'; // นำเข้าภาพพื้นหลัง
import logo from '../img/logo.png'; // นำเข้าภาพพื้นหลัง

import KKlogo from '../img/KK-zoo.png';
import CMlogo from '../img/CM-zoo.png';
import NMlogo from '../img/NM-zoo.png';
import UBlogo from '../img/UB-zoo.png';
import KNlogo from '../img/KN-zoo.png';
import SKlogo from '../img/SK-zoo.png';

import KKanimal from '../img/00kk-animal.png';
import CManimal from '../img/00cm-animal.png';
import NManimal from '../img/00nm-animal.png';
import UBanimal from '../img/00ub-animal.png';
import KNanimal from '../img/00kn-animal.png';
import SKanimal from '../img/00sk-animal.png';

import Logozoo from '../img/logozoo.png';
import { Link } from 'react-router-dom';
import './IntroHomepage.css';
function IntroHomepage() {
    return (
        <div>
            <div className="App">
                <nav className="navbar  navbar-expand-lg navbar-light " style={{ background: 'rgba(255, 255, 255, 0.60)', boxShadow: '0px 4px 26.600000381469727px rgba(0, 0, 0, 0.25)' }}>
                    <div className='container'>

                    <a className="navbar-brand">  
                    <img src={Logozoo} height="70" alt="Logo" loading="lazy"
                        style={{ marginTop: '-1px' }} // Use JSX syntax for inline styles
                    /></a>
                    </div>
                </nav>
            </div>

            <div className="carousel-item active " 
            style={{ backgroundImage: `url(${ZOO})` }}>
                <div className="carousel-caption">
                    <Link to='/homepage' style={{borderRadius: 103}} type="button" class="btn btn-primary box-button col-12 col-sm-6 col-sm-6 col-lg-4  py-2  py-lg-3 ">เข้าสู่เว็บไซต์</Link>
                </div>
            </div>

            <div className="carouseliteme active text-white " style={{ backgroundImage: `url(${h002})` }}>
              
                    <img  src={logo} />
                    <h5 className=" mt-2">เกี่ยวกับ Zoo e-Ticket</h5>
                    <p>การจำหน่ายบัตรเข้าชมสวนสัตว์ ผ่านช่องทางออนไลน์
                        <br />สามารถสั่งซื้อผ่านช่องทางเว็บแอปพลิเคชัน
                        <br />และแอปพลิเคชั่นมือถือ (Web Application & Mobile Application)</p>
               
            
            </div>  

            <div className="container-fluid">
                {/* kk */}
                <div className="zoodetail row">
                    <div id="KK" className="zooimg text-center col-12 col-sm-6 p-2 p-md-5 text-white" style={{backgroundColor:'#17612F',}} >
                            <img src={KKlogo} />
                            <p className="zooname m-0 p-0 mt-0 mt-md-3">สวนสัตว์เปิดเขาเขียว</p>
                            <p className="address m-0 p-0 mt-2 mt-md-3">ที่อยู่: 235 ม.7 ต.บางพระ อ.ศรีราชา จ.ชลบุรี 20110</p>
                            <p className="tel m-0 p-0 mt-1 mt-md-2" >โทร: 038 318 444</p>
                            <p className="open m-0 p-0 mt-1 mt-md-2" style={{fontWeight:'260'}}>เปิดทุกวัน เวลา 08.00น. - 18.00น.</p>
                    </div>
                    <div className="zooanimal col-12 col-sm-6 p-0 m-0" >
                        <img src={KKanimal} 
                        />
                    </div>
                </div>
                {/* cm */}
                <div className="zoodetail row">
                    <div className="zooanimal col-12 col-sm-6 p-0 m-0" >
                        <img src={CManimal} 
                        />
                    </div>
                    <div id="CM" className="zooimg text-center col-12 col-sm-6 p-2 p-md-5 text-black" style={{backgroundColor:'#DDF3DE',}} >
                            <img src={CMlogo} />
                            <p className="zooname m-0 p-0 mt-0 mt-md-3">สวนสัตว์เชียงใหม</p>
                            <p className="address m-0 p-0 mt-2 mt-md-3">ที่อยู่: 100 ถ.ห้วยแก้ว ต.เชียงใหม่ อ.เมืองเชียงใหม่ จ.เชียงใหม่ 50200</p>
                            <p className="tel m-0 p-0 mt-1 mt-md-2" >โทร: 053 221 179</p>
                            <p className="open m-0 p-0 mt-1 mt-md-2" style={{fontWeight:'275'}}>เปิดทุกวัน เวลา 08.00น. - 17.00น.</p>
                    </div>
                </div>
                
                {/* kn */}
                <div className="zoodetail row">
                    <div id="KN" className="zooimg text-center col-12 col-sm-6 p-2 p-md-5 text-black" style={{backgroundColor:'#BEE3C9',}} >
                            <img src={KNlogo} />
                            <p className="zooname m-0 p-0 mt-0 mt-md-3">สวนสัตว์ขอนแก่น</p>
                            <p className="address m-0 p-0 mt-2 mt-md-3">ที่อยู่: 88 ม. 8 ต.คำม่วง อ.เขาสวนกวาง จ.ขอนแก่น 40280</p>
                            <p className="tel m-0 p-0 mt-1 mt-md-2" >โทร: 086 459 4192</p>
                            <p className="open m-0 p-0 mt-1 mt-md-2" style={{fontWeight:'275'}}>เปิดทุกวัน เวลา 08.00น. - 16.30น.</p>
                    </div>
                    <div className="zooanimal col-12 col-sm-6 p-0 m-0" >
                        <img src={KNanimal} 
                        />
                    </div>
                </div>
                {/* nm */}
                <div className="zoodetail row">
                    <div className="zooanimal col-12 col-sm-6 p-0 m-0" >
                        <img src={NManimal} 
                        />
                    </div>
                    <div id="NM" className="zooimg text-center col-12 col-sm-6 p-2 p-md-5 text-white" style={{backgroundColor:'#0069CA',}} >
                            <img src={NMlogo} />
                            <p className="zooname m-0 p-0 mt-0 mt-md-3">สวนสัตว์นครราชสีมา</p>
                            <p className="address m-0 p-0 mt-2 mt-md-3">ที่อยู่: 111 ม.1 ต.ไชยมงคล อ.เมืองนครราชสีมา จ.นครราชสีมา 30000</p>
                            <p className="tel m-0 p-0 mt-1 mt-md-2" >โทร: 083 372 0404</p>
                            <p className="open m-0 p-0 mt-1 mt-md-2" style={{fontWeight:'260'}}>เปิดทุกวัน เวลา 08.00น. - 17.00น.</p>
                    </div>
                </div>
                {/* ub */}
                <div className="zoodetail row">
                    <div id="UB" className="zooimg text-center col-12 col-sm-6 p-2 p-md-5 text-black" style={{backgroundColor:'#60C5FE',}} >
                            <img src={UBlogo} />
                            <p className="zooname m-0 p-0 mt-0 mt-md-3">สวนสัตว์อุบลราชธานี</p>
                            <p className="address m-0 p-0 mt-2 mt-md-3">ที่อยู่: 112 ม.17 ต.ขามใหญ่ อ.เมืองอุบลราชธานี จ.อุบลราชธานี 34000</p>
                            <p className="tel m-0 p-0 mt-1 mt-md-2" >โทร: 045 252 761</p>
                            <p className="open m-0 p-0 mt-1 mt-md-2" style={{fontWeight:'275'}}>เปิดทุกวัน เวลา 08.00น. - 16.30น.</p>
                    </div>
                    <div className="zooanimal col-12 col-sm-6 p-0 m-0" >
                        <img src={UBanimal} 
                        />
                    </div>
                </div>
                {/* sk */}
                <div className="zoodetail row">
                    <div className="zooanimal col-12 col-sm-6 p-0 m-0" >
                        <img src={SKanimal} 
                        />
                    </div>
                    <div id="SK" className="zooimg text-center col-12 col-sm-6 p-2 p-md-5 text-white" style={{backgroundColor:'#004086',}} >
                            <img src={SKlogo} />
                            <p className="zooname m-0 p-0 mt-0 mt-md-3">สวนสัตว์สงขลา</p>
                            <p className="address m-0 p-0 mt-2 mt-md-3">ที่อยู่: 189 ม.5 ถ.สงขลา-นาทวี ต.เขารูปช้าง อ.เมืองสงขลา จ.สงขลา  90000</p>
                            <p className="tel m-0 p-0 mt-1 mt-md-2" >โทร: 074 598 555</p>
                            <p className="open m-0 p-0 mt-1 mt-md-2" style={{fontWeight:'260'}}>เปิดทุกวัน เวลา 08.00น. - 16.30น.</p>
                    </div>
                </div>
            </div> 
                    
            <footer class="py-5 bg-dark d-none">
                <div class="container text-white " >
                    <p style={{fontSize:16,fontWeight:280}} >
                    © 2016 <a className="text-white text-decoration-none" href="#" >Addpay Service Point Co., Ltd. All rights reserved..</a> All Rights Reserved.
                    <br/>
                    บริษัท แอดเพย์ เซอร์วิสพอยท์ จำกัด เลขที่ 406 หมู่ 18 ต.ขามใหญ่ อ.เมือง จ.อุบลราชธานี 34000 <br/>โทร. 045-317123,061-8182888 Fax.045-317678
            
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default IntroHomepage;
