import React from "react";
import './settring.css';
import Navbar from "../navbar/navbar";
import backgroundImage from '../img/bgg.png'; // นำเข้าภาพพื้นหลัง
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faKey,faSignOutAlt, faTrash,faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link,useNavigate } from "react-router-dom";
export default function Settring() {
    const Name = localStorage.getItem('name')
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const navigate = useNavigate();

    const handleLogout = () => {
      // ลบข้อมูลใน localStorage
      localStorage.clear();
      // นำผู้ใช้ไปยังหน้า /login
      navigate('/');
    };
    return (
        <section
            className=" text-center"
       
            >
            <Navbar />
            <div className="container py-5">
                <div className="container py-5">
                    <div className="container py-5 box-input" style={{  position: 'relative', borderRadius: '6em'}}>

                        <img className="box-input rounded-circle" style={{ width: '10em', height: '10em', position: 'absolute', top: '-0.2%', left: '50%', transform: 'translate(-50%, -50%)'}} 
                        src="https://t3.ftcdn.net/jpg/05/79/55/26/360_F_579552668_sZD51Sjmi89GhGqyF27pZcrqyi7cEYBH.jpg" />
                        <br />
                        <div className="container mt-3" style={{ textAlign: 'center', color: '#17612F', fontSize: 20, fontFamily: 'Kanit', fontWeight: '275', wordWrap: 'break-word' }}>
                            {Name}</div>
                        <div className="container  " style={{ textAlign: 'center', color: '#17612F', fontSize: 30, fontFamily: 'Kanit', fontWeight: '400', wordWrap: 'break-word' }}>
                            {email}</div>
                        
                        <div className="container  mt-md-4 px-md-5"  >
                            <div className="px-md-5 "  >
                                <div className="container p-4 p-md-4 pb-4 pb-md-4 box-input " style={{borderRadius: '3em'}}>

                                    <div className="col-md-12 col-lg-12 px-0 px-md-4 "  >
                                        <Link to='/Editprofile' className="menu-item border-bottom border-success d-flex justify-content-center justify-content-sm-between " style={{ color: 'black' }}>
                                            <span><FontAwesomeIcon icon={faUserEdit} className="icon d-none d-sm-inline" />แก้ไขข้อมูลส่วนตัว</span>
                                            <span ><FontAwesomeIcon icon={faAngleRight} className="icon mx-0 px-0 mx-md-0 px-md-0 d-none d-sm-inline" /></span>
                                        </Link>
                                    </div>
                                    <div className="col-md-12 col-lg-12 px-0 px-md-4"  >
                                        <Link to='/Editpass' className="menu-item border-bottom border-success d-flex justify-content-center justify-content-sm-between" style={{ color: 'black' }}>
                                            <span><FontAwesomeIcon icon={faKey} className="icon d-none d-sm-inline" />เปลี่ยนรหัสผ่าน</span>
                                            <span ><FontAwesomeIcon icon={faAngleRight} className="icon mx-0 px-0 mx-md-0 px-md-0 d-none d-sm-inline" /></span>
                                        </Link>
                                    </div>
                                    <div className="col-md-12 col-lg-12 px-0 px-md-4"  >
                                        <a  onClick={handleLogout} to='' className="menu-item border-bottom border-success d-flex justify-content-center justify-content-sm-between" style={{ color: 'red' }}>
                                            <span><FontAwesomeIcon icon={faSignOutAlt} className="icon d-none d-sm-inline" />ออกจากระบบ</span>
                                            <span ><FontAwesomeIcon icon={faAngleRight} className="icon mx-0 px-0 mx-md-0 px-md-0 d-none d-sm-inline" /></span>
                                        </a>
                                    </div>
                                    <div className="col-md-12 col-lg-12 px-0 px-md-4"  >
                                        <Link to='' className="menu-item border-bottom border-success d-flex justify-content-center justify-content-sm-between" style={{ color: 'red' }}>
                                            <span><FontAwesomeIcon icon={faTrash} className="icon d-none d-sm-inline" />ลบบัญชีผู้ใช้</span>
                                            <span ><FontAwesomeIcon icon={faAngleRight} className="icon mx-0 px-0 mx-md-0 px-md-0 d-none d-sm-inline" /></span>
                                        </Link>
                                    </div>
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}