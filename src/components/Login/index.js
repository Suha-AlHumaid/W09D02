import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login1 } from "../../Reducers/login";
import "./style.css";

const Login = ({ setAdmin, admin }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });

  const login = async () => {
    setMessage("");
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        {
          email,
          password,
        }
      );

      if (result.data.token) {
        setMessage("Success");

        dispatch(
          login1({ user: result.data.result, token: result.data.token })
        );
        if (result.data.result.role === "61a6551bb604baf56847ff8f") {
          console.log("Admin");
          dispatch(
            login1({ user: result.data.result, token: result.data.token })
          );
          localStorage.setItem("admin", true);
          setAdmin(true);
        } else {
          dispatch(
            login1({ user: result.data.result, token: result.data.token })
          );
          setAdmin(false);
        }
      }

    } catch (error) {
      console.log(error);
      setMessage("faild");
    }
  };

  return (
    <>
      <div className="home">
        <h1>LOGIN FORM</h1>
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
        <button onClick={login}>Login</button>
        {message ? message : ""}
      </div>
    </>
  );
  
};

export default Login;
