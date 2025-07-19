import React from 'react';

const StatItem = ({ description, intake, burned, date, onEdit, onDelete }) => (
  <div className="stat-item-row">
    <div className="stat-desc"><b>{description}</b></div>
    <div className="stat-cals">Calories Intake = {intake} <span style={{ color: '#bbb' }}>|</span> Calories Burned = {burned}</div>
    <div className="stat-date">{date}</div>
    <div className="stat-actions">
      <button onClick={onEdit} title="Edit" className="stat-edit-btn">✏️</button>
      <button onClick={onDelete} title="Delete" className="stat-delete-btn">🗑️</button>
    </div>
  </div>
);

export default StatItem; 