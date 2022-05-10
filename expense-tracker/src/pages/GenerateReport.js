import React from 'react'
import Navbar from '../Components/Navbar'

function GenerateReport() {
  const date = new Date();
  date.setDate(date.getDate() - 6);
  console.log(date.toISOString());
  const todayDate = new Date();
  console.log(todayDate.toISOString());
  return (
    <div>
        <Navbar/>
    </div>
  )
}

export default GenerateReport