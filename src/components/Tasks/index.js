import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Reducers/login";
import { allTasks } from "../../Reducers/tasks";
import axios from "axios";
import Task from "../Task";
import Home from "../Home";
import "./style.css";

const Tasks = ({ admin }) => {

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState([]);

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
      reducerTasks: state.reducerTasks
    };
  });

  console.log(state.reducerTasks);
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${state.reducerLog.token}`,
          },
        }
      );
      // setTasks(result.data);
      console.log(result.data);
      dispatch(allTasks(result.data))
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/task`,
        {
          task,
        },
        {
          headers: {
            Authorization: `Bearer ${state.reducerLog.token}`,
          },
        }
      );

      if (typeof result.data === "object") {
        console.log(typeof result.data);
        getTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    dispatch(logOut({ user: null, token: "" }));
  };

  return !admin && state.reducerLog.token ? (
    <div className="home">
      <h1>Todos List</h1>
      <div>
        <input
          className="form-input"
          type="text"
          placeholder="Type your task here ..."
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>ADD NEW</button>
      </div>
      {state.reducerTasks&& 
      state.reducerTasks.length? (
        <>
          {state.reducerTasks.map((elem) => (
            <Task key={elem._id} elem={elem} getTasks={getTasks} />
          ))}
        </>
      ) : (
        <>
          <p>you don't have any task yet ..</p>
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
  ) : (
    <Home />
  );
};

export default Tasks;
