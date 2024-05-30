// ReservationCancellation.js
import React, { useState } from 'react';
import ConfirmationDialog from './ConfirmationDialog';

const ReservationCancellation = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => {
    setShowConfirmation(true);
  };

  const handleConfirmCancellation = () => {
    // ทำการยกเลิกการจอง
    // รีเซ็ตค่าหรือทำอย่างอื่นตามที่คุณต้องการ
    setShowConfirmation(false);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="reservation-cancellation">
      <h2>ยกเลิกการจอง</h2>
      <button onClick={handleCancel}>ยกเลิกการจอง</button>
      {showConfirmation && (
        <ConfirmationDialog
          message="คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการจอง?"
          onCancel={handleCancelConfirmation}
          onConfirm={handleConfirmCancellation}
        />
      )}
    </div>
  );
};

export default ReservationCancellation;
