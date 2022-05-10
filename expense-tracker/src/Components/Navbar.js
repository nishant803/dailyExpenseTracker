import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "react-avatar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { selectUserName } from "../redux/userSlice";
import "./Navbar.css";
function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const userName = useSelector(selectUserName);
  const history = useHistory();
  return (
    <div className="navbar">
      <div
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <GiHamburgerMenu />
      </div>
      <h2 className="navbar__heading">
        Daily Expense
        <span>Tracker</span>
      </h2>
      <div className="navbar__right">
        <ul
          className={isNavExpanded ? "navbar__items expanded" : "navbar__items close"}
        >
          <li onClick={() => history.push("/dashboard")}>Dashboard</li>
          <li onClick={() => history.push("/profile")}>Profile</li>
          <li onClick={() => history.push("/generatereport")}>
            Generate Report
          </li>
          <li onClick={() => history.push("/addexpense")}>Add Expense</li>
          <li onClick={() => history.push("/manageexpense")}>Manage Expense</li>
          {userName && <li onClick={() => history.push("/logout")}>logout</li>}
        </ul>
        {userName && (
          <Avatar
            round={true}
            style={{ marginLeft: "1rem" }}
            size={40}
            name={userName}
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
