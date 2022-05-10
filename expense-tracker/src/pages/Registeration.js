import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function Registeration() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {isRegister ? <Login /> : <Register />}
      <button onClick={() => setIsRegister(false)}>Register</button>
      <button onClick={() => setIsRegister(true)}>Login</button>
    </div>
  );
}

export default Registeration;
