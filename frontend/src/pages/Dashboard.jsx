// src/pages/DashboardPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
// import Chart from '../components/Chart'; // Optional

const DashboardPage = () => {
    // Sample data for demonstration
    const metrics = [
        { title: 'Total Assets', value: 120, icon: '📦' },
        { title: 'Pending Requests', value: 15, icon: '📝' },
        { title: 'Low Stock Items', value: 5, icon: '⚠️' },
        { title: 'Faulty Equipment', value: 3, icon: '🔧' },
    ];

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-main">
                <Sidebar />
                <main className="dashboard-content">
                    <h1>Dashboard</h1>
                    <div className="dashboard-cards">
                        {metrics.map((metric, index) => (
                            <DashboardCard
                                key={index}
                                title={metric.title}
                                value={metric.value}
                                icon={metric.icon}
                            />
                        ))}
                    </div>
                    {/* <Chart /> */}
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
