import React from "react";
import "./dashboardBox.css"
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function DashboardBox({ title, expenseValue }) {
  const percentage = 622;
  return (
    <div className="dashboardBox">
      <p>{title}</p>
      <CircularProgressbar value={expenseValue} text={expenseValue} strokeWidth="4" styles={{width:100 ,height:100,fontSize:"10px"}} />
    </div>
  );
}

export default DashboardBox;
