import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
import EditTask from "./components/EditTask";
import CreateTask from "./components/CreateTask";
import CreateUser from "./components/CreateUser";
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" exact element={<TaskList />} />
          <Route path="/edit/:id" exact element={<EditTask />} />
          <Route path="/create" exact element={<CreateTask />} />
          <Route path="/user" exact element={<CreateUser />} />
        </Routes>
      </div>
    </Router>
  );
}

//55:27

export default App;
