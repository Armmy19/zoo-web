import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../img/bgg.png'; // นำเข้าภาพพื้นหลัง
import Logo from '../img/logo.png'; // นำเข้าภาพพื้นหลัง


function LoginForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // เพิ่มสถานะ isLoggedIn เพื่อเก็บสถานะการล็อกอินของผู้ใช้
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');
    if (isLoggedIn) {
      setIsLoggedIn(true);
      navigate('/Home'); // นำทางไปยังหน้าหลักโดยตรงหากผู้ใช้ล็อกอินอยู่แล้ว
    }
  }, [navigate]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("email", inputs.email);
    formdata.append("password", inputs.password);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    fetch("https://addpay.net/e-member/public/api/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Invalid Credentials") {
          console.log(result);
          setErrorMessage("Invalid Credentials");
          setShowErrorMessage(true);
        } else {
          console.log(result);
          setErrorMessage("Login successful");
          setShowErrorMessage(true);
          setIsLoggedIn(true); // ตั้งค่า isLoggedIn เป็น true เมื่อล็อกอินสำเร็จ
          localStorage.setItem('email', result.email)
          localStorage.setItem('userid', result.user_id)
          localStorage.setItem('name', result.name)
          localStorage.setItem('token', result.access_token)
          navigate('/Home');
        }
      })
      .catch((error) => console.error(error));

  }

  return (
    <section className="bg-section">
      <div className='py-5' ></div>



      <div className="container py-5   ">
        <div className="container py-5 box-input fadeInDown" style={{  position: 'relative', borderRadius:  '6em' }}>
          <img className=" fadeIn first" style={{ width: '10em', height: '10em', position: 'absolute', top: '-0.2%', left: '50%', transform: 'translate(-50%, -50%)'}} src={Logo} id="icon" alt="User Icon"/>
              <br />


          <div className="container py-3 py-md-3 px-md-5 fadeIn second  text-center" id="formContent">
            <div className='' style={{textAlign: 'center', color: '#17612F', fontSize: 35, fontWeight: '400', wordWrap: 'break-word'}}>เข้าสู่ระบบ</div>
            <div style={{textAlign: 'center', color: '#17612F', fontSize: 25, fontWeight: '275', wordWrap: 'break-word'}}>Zoo E-Ticket</div>

            {showErrorMessage && (
              <div className='container'>  <div className={`alert ${errorMessage === "Invalid Credentials" ? "alert-danger" : "alert-success"}`} role="alert">
                {errorMessage}
              </div></div>

            )}


            <form onSubmit={handleSubmit} className="px-md-5 py-2">
              <div className="row px-md-5 ">
                <div className="input-group mt-3 px-md-4  box-input" style={{borderRadius:  '3em'}}>
                    <input style={{  color: 'black', fontSize: 25 ,fontWeight:'275',border: 'none',backgroundColor:'transparent' }}  type="email" id="email" name="email"  className="form-control fadeIn third pl-4 pl-md-0 py-3" placeholder="อีเมล" value={inputs.email || ""}
                onChange={handleChange}  />   
                </div>

              </div>
              <div className="row px-md-5 ">
                <div className="input-group mt-3 px-md-4  box-input" style={{borderRadius:  '3em'}}>
                    <input style={{  color: 'black', fontSize: 25 ,fontWeight:'275',border: 'none',backgroundColor:'transparent' }}  type="password" id="password" name="password" className="form-control fadeIn third pl-4 pl-md-0 py-3"   placeholder="รหัสผ่าน" value={inputs.password || ""}
                onChange={handleChange}/>   
                </div>

              </div>
              <button  style={{borderRadius: 103, fontSize: 26}} className="btn btn-primary col-12 col-md-5 box-button mt-3 p-1 p-md-2 fadeIn third" type="submit" value="Log In">เข้าสู่ระบบ</button>

            </form>
            <div id="formFooter" className="fadeIn fourth" style={{ fontSize: 25 ,fontWeight:'275',}}>
                  ยังไม่มีบัญชีผู้ใช้งาน?
                  <Link  to="/regis"  style={{ fontSize: 25 ,fontWeight:'275',border: 'none', color: '#17612F'}} >สมัครสมาชิก!!</Link>
                </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
