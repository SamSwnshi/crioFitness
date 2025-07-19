import React from 'react';

const AddDataCard = ({ onAdd }) => (
  <div className="add-data-card">
    <h2>Update Today's Data</h2>
    <button onClick={onAdd} className="add-data-btn">+ Add data</button>
  </div>
);

export default AddDataCard; 