import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import DashboardBox from "../Components/Dashboard/DashboardBox";
import "./dashboard.css";


import DashboardCalculations from "../Components/Dashboard/DashboardCalculations";

function Dashboard() {
  const { todayExpense, yesterdayExpense, totalExpense, pieChartData,weekExpense,monthExpense,yearExpense } =
    DashboardCalculations();
  // console.log(pieChartData);
  const dashboardData = [
    {
      id: 1,
      title: "Today",
      expenseValue: todayExpense ? todayExpense : "0",
    },
    {
      id: 2,
      title: "Yesterday",
      expenseValue: yesterdayExpense ? yesterdayExpense : "0",
    },
    {
      id: 3,
      title: "Last week",
      expenseValue: weekExpense ? weekExpense : "0",
    },
    {
      id: 4,
      title: "Last Month"  ,
      expenseValue: monthExpense ? monthExpense : "0",
    },
    {
      id: 5,
      title: "Last year",
      expenseValue: yearExpense ? yearExpense : "0",
    },
    {
      id: 6,
      title: "Total Expense",
      expenseValue: totalExpense ? totalExpense : "0",
    },
  ];
  return (
    <div>
      <Navbar />

      <div className="dashboard__container">
        <h1 className="dashboard__heading">Dashboard</h1>
        <svg
          className="dashboard__wave__svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#12232E"
            fillOpacity="1"
            d="M0,256L60,229.3C120,203,240,149,360,154.7C480,160,600,224,720,240C840,256,960,224,1080,181.3C1200,139,1320,85,1380,58.7L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="dashboard__boxes">
        {dashboardData.map((items) => (
          <DashboardBox
            key={items.id}
            title={items.title}
            expenseValue={items?.expenseValue}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
