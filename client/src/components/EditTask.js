import React, { useEffect, useReducer } from "react";
import { formReducer, INITIAL_STATE } from "./formReducer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";
const EditTask = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const { date } = state;
  const { id } = useParams();
  useEffect(() => {
    axios.get("/tasks/" + id)
      .then((response) => {
        dispatch({
          type: "SET_USERNAME",
          payload: response.data.username,
        });
        dispatch({
          type: "SET_DESCRIPTION",
          payload: response.data.description,
        });
        dispatch({
          type: "SET_DURATION",
          payload: response.data.duration,
        });
        dispatch({
          type: "SET_DATE",
          payload: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get("/users/").then((res) => {
      if (res.data.length > 0) {
        try {
          //console.log("res.data ", res.data.map((user) => user.username));
          dispatch({
            type: "SET_USERS",
            payload: res.data.map((user) => user.username),
          });
          //console.log(state.users);
        } catch (err) {
          console.log(err);
        }
      }
    });
  }, [id]);

  const handleChange = (e, actionName) => {
    const value = e.target.value;
    dispatch({ type: actionName, payload: value });
  };

  const handleDateChange = (newDate) => {
    dispatch({ type: "SET_DATE", payload: newDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date,
    };
    // console.log("----NEW TASK-----");
    console.log(newTask);

    axios
      .post("/tasks/update/" + id, newTask)
      .then((res) => {
        if (res.statusText === "OK") {
          window.location = "/";
        }
      });
  };

  // console.log("----CONSOLE-LOG-----");
  //console.log(state);

  return (
    <div>
      <h3>Edit Task Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={state.username}
            onChange={(e) => handleChange(e, "SET_USERNAME")}
          >
            {state.users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            onChange={(e) => handleChange(e, "SET_DESCRIPTION")}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            required
            onChange={(e) => handleChange(e, "SET_DURATION")}
            type="number"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={handleDateChange} />
          </div>
        </div>

        <div className="form-group mt-3">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditTask;
