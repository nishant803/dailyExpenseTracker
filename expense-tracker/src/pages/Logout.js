import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../redux/userSlice";

function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(res);
      if (res.status === 200) {
        history.push("/login", { replace: true });
        dispatch(logout());
      } else {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    onLogout();
  });
  return <div>Logout</div>;
}

export default Logout;
