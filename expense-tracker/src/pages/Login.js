import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { IoIosLock } from "react-icons/io";
import Navbar from "../Components/Navbar";
import {LoginDetailsValidation} from "../Components/Validate";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [deatils, setDetails] = useState({});
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDetails((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(LoginDetailsValidation(deatils));
    setIsSubmit(true);
  };
  const onLogin = async () => {
    const res = await fetch("http://localhost:3001/api/auth", {
      method: "POST",
      redirect: "follow",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deatils),
    });
    const response = await res.json();
    if (res.status === 200) {
      successAlert();
      dispatch(
        login({
          name: response.name,
          email: response.email,
          number: response.number,
        })
      );
      history.push("/dashboard");
    } else {
      setError(deatils);
      setError(response);
    }
  };
  useEffect(() => {
    const ac = new AbortController();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      onLogin();
    }
    return () => ac.abort();
  }, [formErrors]);
  
  const successAlert = () => {
    Swal.fire({
      title: "Login Successfull",
      icon: "success",
    });
  };
  return (
    <>
    <Navbar/>
    <div className="login">
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h1 className="form-title">Sign In</h1>
              <form
                className="register-form"
                method="POST"
                onSubmit={handleSubmit}
                >
                <div className="form-group">
                  <label className="register__label" htmlFor="email">
                    <MdEmail />
                  </label>
                  <input
                    className="register__input"
                    name="email"
                    placeholder="Your Email"
                    onChange={handleChange}
                    value={deatils.email || ""}
                    type="email"
                    />
                  {formErrors.email  ? (
                    <p className="error__message">{formErrors.email}</p>
                    ) : (
                      <p className="error__message">{error.Emailmessage}</p>
                      )}
                </div>
                <div className="form-group">
                  <label className="register__label" htmlFor="password">
                    <IoIosLock />
                  </label>
                  <input
                    className="register__input"
                    name="password"
                    placeholder="Your Password"
                    onChange={handleChange}
                    value={deatils.password || ""}
                    type="password"
                    />
                  {formErrors.password ? (
                    <p className="error__message">{formErrors.password}</p>
                    ) : (
                      <p className="error__message">{error.Passwordmessage}</p>
                      )}
                </div>
                <div className="form-group form-button">
                  <input className="form-submit" type="submit" />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img
                  src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"
                  alt="logo"
                  />
              </figure>
              <Link to="/" className="signup-image-link">
                Not registerd yet?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
                  </>
  );
}

export default Login;
