import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./addExpense.css";
import Modal from "../Components/Modal";
import { AddExpenseValidation } from "../Components/Validate";

function Expense(date) {
  const history = useHistory();
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(AddExpenseValidation(data));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      fetch("http://localhost:3001/api/expense/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }).then((res) => {
        console.log(res);
        setData({});
        setIsOpen(true);
        setTimeout(() => {
          history.push("/manageexpense");
        }, 1500);
      });
    }
  }, [formErrors]);
  return (
    <div>
      <Navbar />

      <div className="addExpense">
        <div className="addExpense__inner">
          <form
            className="addExpense__form"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div >{isOpen && <Modal title="Expense Added Successfully" />}</div>
            <h1>Add Expense</h1>
            <div className="addExpense__form-group">
              <label className="addExpense__formLabel" htmlFor="date">
                Date
              </label>
              <input
                className="addExpense__formInput"
                type="date"
                name="date"
                onChange={handleChange}
              />
              <p className="addExpense__errorMessage">{formErrors?.date}</p>
            </div>
            <div className="addExpense__form-group">
              <label className="addExpense__formLabel">Type</label>
              <select
                className="addExpense__formInput"
                onChangeCapture={handleChange}
                name="type"
              >
                <option defaultValue="Choose Category">Choose Category</option>
                <option value="Food">Food</option>
                <option value="Clothes">Clothes</option>
                <option value="Rent">Rent</option>
                <option value="Movie">Movie</option>
                <option onChange={() => setIsOpen(true)} value="other">
                  Other
                </option>
              </select>
              {isOther && <input type="text" />}
              <p className="addExpense__errorMessage">{formErrors?.type}</p>
            </div>
            <div className="addExpense__form-group">
              <label className="addExpense__formLabel">Description</label>
              <input
                className="addExpense__formInput"
                type="text"
                name="description"
                onChange={handleChange}
                value={data.description || ""}
              />
              <p className="addExpense__errorMessage">
                {formErrors?.description}
              </p>
            </div>
            <div className="addExpense__form-group">
              <label className="addExpense__formLabel">Price</label>
              <input
                className="addExpense__formInput"
                type="number"
                name="price"
                onChange={handleChange}
                value={data.price || ""}
              />
              <p className="addExpense__errorMessage">{formErrors?.price}</p>
            </div>
            <input className="addExpense__formSubmitButton" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Expense;
