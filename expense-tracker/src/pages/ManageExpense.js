import React, { useState, useEffect } from "react";
import { incTotal } from "../redux/ExpenseSlice";
import Navbar from "../Components/Navbar";
import { useDispatch } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./manageExpense.css"

function ManageExpense() {
  const dispatch = useDispatch();
  const [expense, setExpense] = useState([]);
  const [total, setTotal] = useState(0);
  

  useEffect(() => {
    fetch("http://localhost:3001/api/expense/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setExpense(data);
      });
  }, []);

  const handleDelete = async (id) => {
    fetch(`http://localhost:3001/api/expense/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if(res.status === 200){
          console.log("ok")
        }
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const handleUpdate = async (id) => {
    fetch(`http://localhost:3001/api/expense/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(),
    });
  };

  const handleDeleteExpense = (expense) => {
   const res = confirm("Are you Sure?");
   if(res){

     handleDelete(expense.data._id);
   }
  };
  const handleUpdateExpense = (expense) => {
    handleUpdate(expense.data._id);
  };
  const columnDefs = [
    { headerName: "Type", field: "type" },
    { headerName: "Description", field: "description" },
    { headerName: "Price", field: "price" },
    { headerName: "Date", field: "date" },
    {
      headerName: "Actions",
      field: "price",
      cellRenderer: (params) => (
        <div>
          <button className="" onClick={() => handleUpdateExpense(params)}>Update</button>
          <button className="" onClick={() => handleDeleteExpense(params)}>Delete</button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Navbar />

      <div
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <AgGridReact
          className="ag-theme-balham"
          rowData={expense}
          columnDefs={columnDefs}
          headerHeight={70}
          rowHeight={60}
        />
      </div>
    </div>
  );
}

export default ManageExpense;
