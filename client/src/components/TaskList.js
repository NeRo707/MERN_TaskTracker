import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Task = ({ task, deleteTask }) => {
  return (
    <>
      <tr key={task._id}>
        <td>{task.username}</td>
        <td>{task.description}</td>
        <td>{task.duration}</td>
        <td>{task.date.substring(0, 10)}</td>
        <td>
          <Link
            style={{
              textDecoration: "none",
              color: "white",
              margin: 0,
              padding: 0,
              background: "red",
              width: "max-content",
            }}
            to={`/edit/${task._id}`}
          >
            <button className="btn btn-success">Edit</button>
          </Link>{" "}
          |{" "}
          <button
            className="btn btn-danger"
            onClick={() => deleteTask(task._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const deleteTask = (id) => {
    axios.delete(`/tasks/${id}`).then((res) => {
      console.log(res.data);
      setTasks(tasks.filter((el) => el._id !== id));
    });
  };

  useEffect(() => {
    axios
      .get("/tasks/")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //console.log(tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTasks = tasks.filter((task) =>
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>Logged Tasks</h3>
      <input
        className="float-end"
        placeholder="Search Tasks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <Task key={task._id} task={task} deleteTask={deleteTask} />
          ))}{" "}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
