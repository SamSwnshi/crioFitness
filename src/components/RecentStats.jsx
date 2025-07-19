import React from 'react';

const RecentStats = ({ children }) => (
  <div className="recent-stats">
    <h2>Recent Health Statistics</h2>
    {children || <div>No data yet.</div>}
  </div>
);

export default RecentStats; 