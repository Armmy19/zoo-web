import React, { useState } from "react";
import './settring.css';
import Navbar from "../navbar/navbar";
import backgroundImage from '../img/bgg.png'; // นำเข้าภาพพื้นหลัง
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, } from '@fortawesome/free-solid-svg-icons';

export default function Editprofile() {
    const Name = localStorage.getItem('name')
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
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


        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);


        const raw = JSON.stringify({
            "name": inputs.Name
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://addpay.net/e-member/public/api/update-profile", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setErrorMessage(result.message);
                setShowErrorMessage(true)
                localStorage.setItem('name', result.name)
            })
            .catch((error) => console.error(error));
        console.log(inputs);
    }
    return (
        <section className="bg-section">
            <Navbar />
            <div className="container py-5">
    
                <div className="container py-5">
                    <div className="container py-5 box-input" style={{ position: 'relative', borderRadius: '6em' }}>

                        <img className="box-input rounded-circle" style={{ width: '10em', height: '10em', position: 'absolute', top: '-0.2%', left: '50%', transform: 'translate(-50%, -50%)' }}
                            src="https://t3.ftcdn.net/jpg/05/79/55/26/360_F_579552668_sZD51Sjmi89GhGqyF27pZcrqyi7cEYBH.jpg" />
                        <br />
                        <div className="container mt-3 " style={{ textAlign: 'center', color: '#17612F', fontSize: 30, fontFamily: 'Kanit', fontWeight: '400', wordWrap: 'break-word' }}>{email}</div>
                        <div className="container" style={{ textAlign: 'center', color: '#17612F', fontSize: 20, fontFamily: 'Kanit', fontWeight: '275', wordWrap: 'break-word' }}>{Name}</div>

                        {showErrorMessage && (
                            <div className='container'>  <div class="alert alert-success" role="alert">
                                {errorMessage}
                            </div></div>

                        )}
                        <div className="container py-md-3 px-md-5  text-center">
                            <form onSubmit={handleSubmit} className="px-md-5 mt-4">
                                <div className="row px-md-5">
                                    <div className="input-group mt-3 px-md-4  box-input" style={{ borderRadius: '3em' }}>
                                        <div className="input-group-prepend ">
                                            <span className="input-group-text" style={{ border: 'none', backgroundColor: 'transparent' }}>
                                                <FontAwesomeIcon icon={faUserEdit} className="icon" size="2x" /></span>
                                        </div>
                                        <input style={{ color: 'black', fontSize: 26, border: 'none', backgroundColor: 'transparent' }} type="text" className="form-control mx-0 px-0" placeholder="Name" name="Name" value={inputs.Name || Name}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <button style={{ borderRadius: 103, fontSize: 26 }} className="btn btn-primary col-12 col-md-5 box-button mt-3 p-1 p-md-2" type="submit">บันทึก</button>
                            </form>


                        </div>


                    </div>
                </div>
            </div>




        </section>
    );
}