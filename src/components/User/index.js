import axios from "axios";
import React, { useState } from "react";

import "./style.css";
const User = ({ elem, getUsers, token }) => {
  const [tasks, setTasks] = useState([]);
  const [bool, setBool] = useState(false);
  const deletUser = async () => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/user/${elem._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      if (typeof result.data === "object") {
        console.log(typeof result.data);
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userTasks = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/tasksByAdmin/${elem._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result.data);
      setTasks(result.data);
     
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (task_id) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/taskByAdmin/${elem._id}`, {
            task_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (typeof result.data === "object") {
        console.log(typeof result.data);
        userTasks();
      }
    } catch (error) {
      console.log(error);
      // getTasks()
    }
  };
  return (
    <div>
 
      {bool ? (
        <>
          {tasks && (
            <>{tasks.length !== 0 ? tasks.map((elem) =>
            <div>{elem.task} 
            <p 
            
            onClick=
            {()=>{deleteTask(elem._id)}}

            className="icon"
            
            >X</p>
            
        
            
            </div>
            )
            : 
            
            <p>no task</p>
        
        }




            <button onClick={(e)=>{
                e.preventDefault();
                setBool(false)
            }}>done</button></>
          )}
        </>
      ) : (
        <div className="task">
               <p>{elem.email}</p>
        <div className="flex">
              
          <span
            className="icon"
            onClick={(e) => {
              e.preventDefault();
              deletUser();
            }}
          >
            X
          </span>
          <span className="icon" onClick={(e) =>{

                  e.preventDefault();
                  setBool(true)
                  userTasks()
          } }>
            Tasks
          </span>
        </div>
        </div>
      )}
    </div>
  );
};

export default User;
