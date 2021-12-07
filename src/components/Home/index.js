import React, { useEffect, useState } from "react";
import Register from "../Register";
import Login from "../Login";
import Tasks from "../Tasks";
import ControlPanel from "../ControlPanel";
import { useSelector } from "react-redux";
import "./style.css";

const Home = () => {

  const [admin, setAdmin] = useState(false);
  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
      reducerTasks: state.reducerTasks,
    };
  });
  console.log(state);
  useEffect(() => {
    const admin1 = localStorage.getItem("admin");

    setAdmin(admin1);
  }, []);

  return (
    <>
      {!state.reducerLog.token ? (
        <div className="home">
          <Login setAdmin={setAdmin} />
          <Register />
        </div>
      ) : !admin ? (
        <Tasks admin={admin} />
      ) : (
        <ControlPanel admin={admin} />
      )}
    </>
  );

};

export default Home;
