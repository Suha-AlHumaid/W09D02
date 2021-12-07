import React, { useState } from "react";
import axios from "axios";
import "./style.css";

const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const register = async (e) => {

    setMessage("");
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/register`,
        {
          email,
          password,
          role,
        }
      );
      if (result.status === 201) {
        setMessage("Success");
      }
    } catch (error) {
      setMessage("faild");
      console.log(error);
    }

  };
  return (

    <div className="home">
      <h1>REGISTER FORM</h1>
      <input
        type="email"
        name="email"
        className="form-input"
        placeholder="Email here .."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        className="form-input"
        placeholder="Pasword here .."
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <p>Please select your Role:</p>
         {" "}
        <input
          type="radio"
          id="Admin"
          name="role"
          value="61a6551bb604baf56847ff8f"
          onChange={(e) => {
            e.preventDefault();
            setRole("61a6551bb604baf56847ff8f");
          }}
        />
          <label for="Admin">Admin</label>
         {" "}
        <input
          type="radio"
          id="User"
          name="role"
          value="61a6552cb604baf56847ff91"
          onChange={(e) => {
            e.preventDefault();
            setRole("61a6552cb604baf56847ff91");
          }}
        />
          <label for="User">User</label>
      </div>
      <button onClick={register}>Register</button>
      {message ? message : ""}
    </div>

  );
};

export default Register;
