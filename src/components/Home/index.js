import React, { useEffect, useState } from "react";
import Register from "../Register";
import Login from "../Login";
import Tasks from "../Tasks";
import "./style.css";
import ControlPanel from "../ControlPanel";
const Home = () => {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const token1 = localStorage.getItem("token");
    const admin1 = localStorage.getItem("admin");
    setToken(token1);
    setAdmin(admin1);
  }, []);
  return (
    <>
      {!token? (
         
        <div className="home">
          <Login setToken={setToken} setAdmin={setAdmin} token={token}/>
          <Register />
        </div>
      ) : (
          !admin ?
      <Tasks token={token} setToken={setToken} admin={admin}/>
      :
      <ControlPanel token={token} setToken={setToken} admin={admin}/>
      )}
    </>
  );
};

export default Home;
