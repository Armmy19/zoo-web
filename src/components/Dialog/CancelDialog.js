import React from 'react'

function CancelDialog() {
  return (
    <div>
      <div className="container text-center py-5 mt-5">
        <div className="container py-5" style={{ background: 'rgba(255, 255, 255, 0.80)', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.30)', borderRadius: 72, border: '3px #02F4BD solid' }}>
          <div className='container text-center'>
            <img style={{ width: 250, height: 250, background: 'white', borderRadius: 9999, border: '3px #02F4BD solid' }} src="https://cdn-icons-png.flaticon.com/512/4406/4406755.png" className="img-thumbnail" alt="Cinque Terre" />
          </div>
          <div style={{ color: '#FF0000', fontSize: 40, fontFamily: 'Kanit', fontWeight: '400' }}>ยืนยันการยกเลิก<br />รายการจองบัตรเข้าชมสวนสัตว์</div>
          <div style={{ color: 'black', fontSize: 20, fontFamily: 'Kanit', fontWeight: '275' }}>รายการจองนี้ของท่านจะถูกยกเลิกและไม่สมารถใช้ได้อีก<br />ท่านต้องการทำรายการต่อหรือไม่?</div>
          <div className='row'>
            <div className='col-6 col-md-6' >      <button  style={{width: 292, height: 58,  background: 'linear-gradient(180deg, #02F4BD 0%, #0075F4 100%)', borderRadius: 124, border: '2px #0075F4 solid'}} type="button" class="btn btn-primary">ยืนยัน</button></div>
            <div className='col-6 col-md-6'>      <button style={{width: 292, height: 58, background: 'linear-gradient(180deg, #FFBA3F 0%, #E96100 63%)', borderRadius: 124, border: '2px #FFBA3F solid'}} type="button" class="btn btn-primary">ยกลิก</button></div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default CancelDialog