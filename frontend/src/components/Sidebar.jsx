// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
    <aside className="sidebar">
        <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/assets">Assets</Link></li>
            <li><Link to="/purchases">Purchases</Link></li>
            <li><Link to="/faulty-reports">Faulty Reports</Link></li>
            <li><Link to="/material-requests">Material Requests</Link></li>
            <li><Link to="/stock">Stock</Link></li>
            <li><Link to="/asset-trace">Asset Trace</Link></li>
            <li><Link to="/chat">Chat</Link></li>
        </ul>
    </aside>
);

export default Sidebar;
