import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddExpense from "./pages/AddExpenses";
import ManageExpense from "./pages/ManageExpense";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { useSelector } from "react-redux";
import { selectUserName } from "./redux/userSlice";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import GenerateReport from "./pages/GenerateReport";
import Profile from "./pages/Profile";

export default function App() {
  const userName = useSelector(selectUserName);
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            {userName ? <Dashboard /> : <Register />}
          </Route>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/logout" component={Logout} />
          <ProtectedRoute exact path="/addexpense" component={AddExpense} />
          <ProtectedRoute
            exact
            path="/manageexpense"
            component={ManageExpense}
          />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/generatereport" component={GenerateReport}/>
          <ProtectedRoute exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}
