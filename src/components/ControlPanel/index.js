
import React, { useState ,useEffect} from "react";
import axios from "axios";
import "./style.css";
import User from "../User";
const ControlPanel = ({token}) => {

    const [users, setUsers] = useState([]);
    // const [user, setuser] = useState([]);
  
    useEffect(() => {
      getUsers();
    }, []);
    const getUsers = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(result.data);
        setUsers(result.data);
      } catch (error) {
        console.log(error);
      }
    };
  

 
  return (
      <div className="home">
<h1>Control Panel</h1>
{users && users.length!==0 ?
<>
{users.map(elem =>(
  <User elem={elem} getUsers={getUsers} token={token}/>
))}

</>:<>
<p>There is no users</p>
</>}
   </div>
  );
};

export default ControlPanel;
