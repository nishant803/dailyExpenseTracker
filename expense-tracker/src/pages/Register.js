import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { IoMdContact } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import Swal from "sweetalert2";
import {RegisterDetailsValidation} from "../Components/Validate";
import Navbar from "../Components/Navbar";

function Register() {
  const history = useHistory();
  const [deatils, setDetails] = useState({});
  const [error, setError] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDetails((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(RegisterDetailsValidation(deatils));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      fetch("http://localhost:3001/api/user", {
        method: "POST",
        body: JSON.stringify(deatils),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((data) => {
          if (data.status === 400) {
            setError(true);
          } else {
            successAlert();
          }
        })
        .catch((err) => console.log(err));
    }
  }, [formErrors]);

  const successAlert = () => {
    history.push("/login");
    Swal.fire({
      title: "Registration Successfull",
      icon: "success",
    });
  };
  return (
    <>
    <Navbar/>
    <div className="register">
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h1 className="form-title">Sign up</h1>
              <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="register__label" htmlFor="name">
                    <IoMdContact />
                  </label>
                  <input
                    className="register__input"
                    name="name"
                    placeholder="Your Name"
                    value={deatils.name || ""}
                    onChange={handleChange}
                    type="text"
                    />
                  <p className="error__message">{formErrors.name}</p>
                </div>
                <div className="form-group">
                  <label className="register__label" htmlFor="email">
                    <MdEmail />
                  </label>
                  <input
                    className="register__input"
                    placeholder="Your Email"
                    name="email"
                    onChange={handleChange}
                    value={deatils.email || ""}
                    type="email"
                    />
                  <p className="error__message">{formErrors.email}</p>
                </div>
                <div className="form-group">
                  <label className="register__label" htmlFor="number">
                    <FaPhoneSquareAlt />
                  </label>
                  <input
                    className="register__input"
                    placeholder="Your Phone No."
                    name="number"
                    onChange={handleChange}
                    value={deatils.number || ""}
                    type="number"
                    />
                  <p className="error__message">{formErrors.number}</p>
                </div>
                <div className="form-group">
                  <label className="register__label" htmlFor="password">
                    <IoIosLock />
                  </label>
                  <input
                    className="register__input"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={deatils.password || ""}
                    type="password"
                    />
                  <p className="error__message"> {formErrors.password}</p>
                </div>
                <div className="form-group form-button">
                  <input className="form-submit" type="submit" />
                </div>
              </form>
              {error && <p className="error__message">User already exist</p>}
            </div>
            <div className="signup-image">
              <figure>
                <img
                  src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"
                  alt="logo"
                  />
              </figure>
              <Link to="/login" className="signup-image-link">
                I am already a member
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
                  </>
  );
}

export default Register;
