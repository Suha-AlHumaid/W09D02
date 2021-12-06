import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import User from "../User";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Reducers/login";
const ControlPanel = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/all`, {
        headers: {
          Authorization: `Bearer ${state.reducerLog.token}`,
        },
      });

      setUsers(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    dispatch(logOut({ user: null, token: "" }));
  };

  return (
    <div className="home">
      <h1>Control Panel</h1>
      {users && users.length !== 0 ? (
        <>
          {users.map((elem) => (
            <User elem={elem} getUsers={getUsers} />
          ))}
        </>
      ) : (
        <>
          <p>There is no users</p>
        </>
      )}
      <span
        className="icon"
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      >
        (logout)
      </span>
    </div>
  );
};

export default ControlPanel;
