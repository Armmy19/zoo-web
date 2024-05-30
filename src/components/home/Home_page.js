import React from "react";
import backgroundImage from '../img/bgg.png'; // นำเข้าภาพพื้นหลัง
import Logo from '../img/logo.png'; // นำเข้าภาพพื้นหลัง
import { Link } from 'react-router-dom';
export default function Homepage() {
    return (
        <div>


            <section
                className="text-center py-5"
           
            >
                <div className="container">

                    <div> <img src={Logo} style={{ width: 200, height: 200, }} /></div>
                    <div style={{}}>
                        <div style={{ textAlign: 'center', color: 'white', fontSize: 70, fontFamily: 'Kanit', fontWeight: '400', wordWrap: 'break-word' }}>ยินดีต้อนรับ</div>
                        <div style={{ textAlign: 'center', color: 'white', fontSize: 60, fontFamily: 'Kanit', fontWeight: '400', wordWrap: 'break-word' }}>Zoo e-Ticket</div>
                    </div>
                    <div style={{ textAlign: 'center', color: 'white', fontSize: 30, fontFamily: 'Kanit', fontWeight: '300' }}>การจำหน่ายบัตรเข้าชมสวนสัตว์ ผ่านช่องทางออนไลน์
                        <br />สามารถสั่งซื้อผ่านช่องทางเว็บแอปพลิเคชัน
                        <br />และแอปพลิเคชั่นมือถือ (Web Application & Mobile Application)</div>
                    {/* <Link to="/login" style={{ background: 'linear-gradient(180deg, #FFBA3F 0%, #E96100 100%)', borderRadius: 103}} type="submit" class="fadeIn fourth btn" >Sing Up</Link>
      <Link to="/regis"  style={{ background: 'linear-gradient(180deg, #02F4BD 0%, #0075F4 100%)', borderRadius: 103}} type="submit" class="fadeIn fourth btn" >Log In</Link> */}
                    <div className="container mt-2 py-2">
                        <Link to="/login" style={{ width: 300, background: 'linear-gradient(180deg, #02F4BD 0%, #0075F4 100%)', borderRadius: 103 }} data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg  mt-2" type="submit">Sing In</Link>
                        <Link to="/regis" style={{ width: 300, background: 'linear-gradient(180deg, #FFBA3F 0%, #E96100 100%)', borderRadius: 103 }} data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg  mt-2" type="submit">Sing Up</Link>

                    </div>

                </div>
            </section>
        </div>
    );
}