import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import "./profile.css";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import Swal from "sweetalert2";
import profile from "../Components/user_profile.webp";
import {
  selectUserName,
  selectUserEmail,
  selectUserNumber,
} from "../redux/userSlice";

function Profile() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://localhost:3001/api/user/me", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setRegisterDate(data.date.substr(0, 10));
      });
  });
  const [registerDate, setRegisterDate] = useState("");
  const [changeInputValue, setChangeInputValue] = useState(true);
  const useremail = useSelector(selectUserEmail);
  const username = useSelector(selectUserName);
  const usernumber = useSelector(selectUserNumber);
  const [updateDetails, setUpdateDetails] = useState({});
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdateDetails((values) => ({ ...values, [name]: value }));
    setChangeInputValue(false);
  };

  const updateUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/user", {
        method: "PUT",
        body: JSON.stringify(updateDetails),
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        credentials: "include",
      });
      console.log(response)
      const res = await response.json();
      console.log(res);
      if (response.status === 200) {
        dispatch(
          login({
            name: res.name,
            email: res.email,
            number: res.number,
          })
        );
      }
      Swal.fire({
        title: "Registration Successfull",
        icon: "success",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserDetails();
  };
  return (
    <div>
      <Navbar />
      <section className="profile">
        <div className="profile__left">
          <img
            className="profile__left__image"
            src={profile}
            alt="user_profile"
          />
        </div>
        <div className="profile__right">
          <div className="profile__card">
            <h1 className="profile__card__heading">Profile details</h1>
            <hr />
            <form
              method="POST"
              onSubmit={handleUpdate}
              className="profile__form"
            >
              <div className="profile__form-group">
                <label className="profile__card__label">Full Name</label>
                <input
                  className="profile__card__input"
                  name="name"
                  defaultValue={username || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="profile__form-group">
                <label className="profile__card__label">Email</label>
                <input
                  name="email"
                  onChange={handleChange}
                  className="profile__card__input"
                  defaultValue={useremail || ""}
                />
              </div>
              <div className="profile__form-group">
                <label className="profile__card__label">Phone Number</label>
                <input
                  className="profile__card__input"
                  name="number"
                  defaultValue={usernumber || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="profile__form-group">
                <label className="profile__card__label">
                  Registration Date
                </label>
                <input
                  disabled
                  className="profile__card__input"
                  defaultValue={registerDate}
                />
              </div>
              <button
                disabled={changeInputValue}
                className="profile__update__btn"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
