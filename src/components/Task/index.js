import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./style.css";

const Task = ({ elem, getTasks }) => {
  const [editor, setEditor] = useState(false);
  const [task, setTask] = useState("");
  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });
  const deleteTask = async () => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/task/${elem._id}`,
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

  const editTask = async () => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/task/${elem._id}`,
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
      setEditor(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      {editor ? (
        <>
          <input
            className="form-input"
            type="text"
            defaultValue={elem.task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={editTask}>Done</button>
        </>
      ) : (
        <div className="task">
          <h2>{elem.task}</h2>{" "}
          <div className="flex">
            <span
              className="icon"
              onClick={(e) => {
                e.preventDefault();
                deleteTask();
              }}
            >
              X
            </span>
            <span
              className="icon"
              onClick={(e) => {
                e.preventDefault();
                setEditor(true);
              }}
            >
              Edit
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
