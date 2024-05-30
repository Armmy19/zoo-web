// ConfirmationDialog.js
import React from 'react';

const ConfirmationDialog = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="confirmation-dialog">
      <p>{message}</p>
      <button onClick={onCancel}>ยกเลิก</button>
      <button onClick={onConfirm}>ยืนยัน</button>
    </div>
  );
};

export default ConfirmationDialog;
