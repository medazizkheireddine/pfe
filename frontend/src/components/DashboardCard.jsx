// src/components/DashboardCard.jsx
import React from 'react';

const DashboardCard = ({ title, value, icon }) => (
    <div className="dashboard-card">
        <div className="card-icon">{icon}</div>
        <div className="card-info">
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    </div>
);

export default DashboardCard;
