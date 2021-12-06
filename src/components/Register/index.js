import React, { useState } from "react";
import axios from "axios";

import "./style.css";
const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("61a6552cb604baf56847ff91");
  const [message, setMessage] = useState("");
 

  const register =async () => {
    setMessage("")
   try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/register`,{
        email, password, role
    })
    if(result.status === 201) {
        setMessage("Success")
     }
       
   } catch (error) {
    setMessage("faild")
       console.log(error);
   }

    // console.log( email, password, role);


  }
  return (
    <div className="home">
      <h1>REGISTER FORM</h1>
      <input
    
        type="email"
        name="email"
        className="form-input"
        placeholder="Email here .."
        onChange={(e) =>  setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        className="form-input"
        placeholder="Pasword here .."
        onChange={(e) =>  setPassword(e.target.value)}
      />
      {/* <input
        id="role"
        type="role"
        name="role"
        className="form-input"
        placeholder="Role here .."
        onChange={(e) => setRole(e.target.role)}
      /> */}
      <button onClick={register}>Register</button>
      {message?message:""}
    </div>
  );
};

export default Register;
