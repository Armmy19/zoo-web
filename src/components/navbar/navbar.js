import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logozoo from '../img/logozoo.png'; // นำเข้าภาพพื้นหลัง

function Navbar() {
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'th'); // เริ่มต้นภาษาจาก localStorage หรือเป็น 'th' หากไม่มี
  const name = localStorage.getItem('name');

  useEffect(() => {
    localStorage.setItem('lang', language); // เมื่อภาษาเปลี่ยน ให้บันทึกลงใน localStorage
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="App">
      <nav className="navbar  navbar-expand-lg navbar-light " style={{ background: 'rgba(255, 255, 255, 0.60)', boxShadow: '0px 4px 26.600000381469727px rgba(0, 0, 0, 0.25)' }}>
        <div className='container'>
          <Link className="navbar-brand" to="/">
            <img
              src={Logozoo}
              height="60"
              alt="MDB Logo"
              loading="lazy"
              style={{ marginTop: '-1px' }} 
            />
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto ">
              <li className="nav-item active">
                <Link to='/Home' style={{textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Kanit', fontWeight: '275', wordWrap: 'break-word'}} className="nav-link" href="#">หน้าหลัก <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item active">
                <Link to='/news' style={{textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Kanit', fontWeight: '275', wordWrap: 'break-word'}} className="nav-link" href="#">News <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item active">
                <Link to='/Homezoo' style={{textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Kanit', fontWeight: '275', wordWrap: 'break-word'}}  className="nav-link" href="#">จองตั๋วสวนสัตว์ <span className="sr-only">(current)</span></Link>
              </li>
              <li style={{textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Kanit', fontWeight: '275', wordWrap: 'break-word'}}  className="nav-item active">
                <Link to='/OrderList' style={{textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Kanit', fontWeight: '275', wordWrap: 'break-word'}}  className="nav-link" href="#">รายการจอง <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item active">
                <Link to='/settring' className="nav-link" href="#">ตั้งค่า <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item active">
                <Link to='/settring' className="nav-link" href="#">ชื่อผู้ใช้งาน: {name} <span className="sr-only">(current)</span></Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={() => changeLanguage('th')}>ไทย</button>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={() => changeLanguage('en')}>En</button> */}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
