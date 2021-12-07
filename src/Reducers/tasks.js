// Define an initial state value for the app
const initialState = {
 tasks:[]
};

// Create a "reducer" function that determines what the new state
// should be when something happens in the app
const reducerTasks = (state = initialState, action) => {

  const { type, payload } = action;
  // Reducers usually look at the type of action that happened
  // to decide how to update the state

  switch (type) {

    case "ALL_TASKS":
      return payload;

    case "ADD_TASK":
      localStorage.removeItem("token");
      return { payload };

    case "DELETE_TASK":
      localStorage.removeItem("token");
      return { payload };

    case "EDIT_TASK":
      localStorage.removeItem("token");
      return { payload };
      
    case "GET_TASK":
        localStorage.removeItem("token");
        return { payload };

    default:
      // If the reducer doesn't care about this action type,
      // return the existing state unchanged
      return state;

  }

};

export default reducerTasks;

export const allTasks = (data) => {
  return {
    type: "ALL_TASKS",
    payload: data,
  };
};

export const addTask = (data) => {
  return {
    type: "ADD_TASK",
    payload: data,
  };
};

export const deleteTask = (data) => {
  return {
    type: "DELETE_TASK",
    payload: data,
  };
};

export const editTask = (data) => {
  return {
    type: "EDIT_TASK",
    payload: data,
  };
};

export const getTask = (data) => {
  return {
      type: "GET_TASK",
      payload: data,
    };
  };