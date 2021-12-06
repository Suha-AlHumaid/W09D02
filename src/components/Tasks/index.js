import React, { useEffect, useState } from "react";
import { useDispatch ,useSelector} from "react-redux";

import axios from "axios";
import Task from "../Task";
import "./style.css";
import Home from "../Home";

const Tasks = ({admin}) => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState([]);
 const dispatch = useDispatch();
 const state= useSelector((state)=>{
   return{
    reducerLog: state.reducerLog
   }
 })
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
      setTasks(result.data);
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
    // localStorage.removeItem("token");
    // setToken("");
    
    dispatch(logout1({user:null, token:""}))
  };
  return (
    !admin && state.reducerLog.token?
  
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
      {tasks.length !== 0 ? (
        <>
          {tasks.map((elem) => (
            <Task
              key={elem._id}
              elem={elem}
              token={token}
              getTasks={getTasks}
            />
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
    :
<Home />
  );
};

export default Tasks;
