import React, { useReducer } from "react";
import { formReducer, INITIAL_STATE } from "./formReducer";
import axios from "axios";
const CreateUser = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const onChangeUsername = (e) => {
    const value = e.target.value;
    dispatch({ type: "SET_USERNAME", payload: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: state.username,
    };
    console.log("----NEW USER-----");
    console.log(user);

    axios.post("/users/add", user)
      .then((res) => {console.log(res.data)})


    dispatch({ type: "SET_USERNAME", payload: "" });
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={state.username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary mt-2"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
