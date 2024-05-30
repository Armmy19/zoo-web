
import './login.css';
import backgroundImage from '../img/bgg.png'; // นำเข้าภาพพื้นหลัง
import Logo from '../img/logo.png'; // นำเข้าภาพพื้นหลัง
import React ,{ useState,useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';



function RegisterPage() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  

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
    formdata.append("name", inputs.name);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    fetch("https://addpay.net/e-member/public/api/register", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result.message === "User Created ") {
          console.log(result);
          setErrorMessage("Invalid Credentials");
          setShowErrorMessage(true);
        } else {
          console.log(result);
          setErrorMessage("User Created successful");
          setShowErrorMessage(true);
        }
      })
      .catch((error) => console.error(error));

    // alert(inputs);
  }
  

  return (
    <section className="bg-section">

      <div className='py-5' ></div>
      <div className="container py-5  r">
        <div className="container py-5 box-input fadeInDown" style={{  position: 'relative', borderRadius:  '6em' }}>
          <img className=" fadeIn first" style={{ width: '10em', height: '10em', position: 'absolute', top: '-0.2%', left: '50%', transform: 'translate(-50%, -50%)'}} src={Logo} id="icon" alt="User Icon"/>
              <br />
          <div className="container py-3 py-md-3 px-md-5 fadeIn second text-center" id="formContent">

            <div style={{textAlign: 'center', color: '#17612F', fontSize: 35, fontWeight: '400', wordWrap: 'break-word'}}>สมัครสมาชิก</div>
            <div style={{textAlign: 'center', color: '#17612F', fontSize: 25, fontWeight: '275', wordWrap: 'break-word'}}>Zoo E-Ticket</div>
            {showErrorMessage && (
              <div className='container'>  <div className={`alert ${errorMessage === "Invalid Credentials" ? "alert-danger" : "alert-success"}`} role="alert">
                {errorMessage}
              </div></div>

            )}

            <form onSubmit={handleSubmit} className="px-md-5 py-2">
              <div className="row px-md-5 ">
                <div className="input-group mt-3 px-md-4  box-input" style={{borderRadius:  '3em'}}>
                    <input style={{  color: 'black', fontSize: 25 ,fontWeight:'275',border: 'none',backgroundColor:'transparent' }}  type="text" id="name" className="form-control fadeIn third pl-4 pl-md-0 py-3" name="name" placeholder="ชื่อ" value={inputs.name || ""}
                onChange={handleChange}/>   
                </div>
              </div>

              <div className="row px-md-5 ">
                <div className="input-group mt-3 px-md-4  box-input" style={{borderRadius:  '3em'}}>
                    <input style={{  color: 'black', fontSize: 25 ,fontWeight:'275',border: 'none',backgroundColor:'transparent' }}  type="email" id="email" className="form-control fadeIn third pl-4 pl-md-0 py-3" name="email"  placeholder="อีเมล" value={inputs.email || ""}
                onChange={handleChange}/>   
                </div>
              </div>

              <div className="row px-md-5 ">
                <div className="input-group mt-3 px-md-4  box-input" style={{borderRadius:  '3em'}}>
                    <input style={{  color: 'black', fontSize: 25 ,fontWeight:'275',border: 'none',backgroundColor:'transparent' }}  type="password" id="password" className="form-control fadeIn third pl-4 pl-md-0 py-3" name="password"  placeholder="รหัสผ่าน"  value={inputs.password || ""}
                onChange={handleChange}/>   
                </div>
              </div>

              <button  style={{borderRadius: 103, fontSize: 26}} className="btn btn-primary col-12 col-md-5 box-button mt-3 p-1 p-md-2 fadeIn third" type="submit" value="Sing Up">สมัครสมาชิก</button>

            </form>
            <div id="formFooter" className="fadeIn fourth" style={{ fontSize: 25 ,fontWeight:'275',}}>
              มีบัญชีผู้ใช้งานแล้ว?
              <Link  to="/login"  style={{ fontSize: 25 ,fontWeight:'275',border: 'none', color: '#17612F'}} >เข้าสู่ระบบ!!</Link>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}

export default RegisterPage;
