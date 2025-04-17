import { useState } from "react";
import "./App.css";
import {tabs} from "./Tabs";

function App() {
  let [toDoList, setToDoList] = useState([]);

  let saveToDoList = (event) => {
    let todoname = event.target.todoname.value;
    if (todoname.trim() === "") {
      alert("Task cannot be blank");
      return;
    }
    if (!toDoList.includes(todoname)) {
      let finalToDoList = [...toDoList, todoname];
      setToDoList(finalToDoList);
      event.target.todoname.value = "";
    } else {
      alert("Task already exists");
    }
    event.preventDefault();
  };

  let list = toDoList.map((value, index) => {
    return (
      <ToDoListItems
        value={value}
        key={index}
        idNum={index}
        toDoList={toDoList}
        setToDoList={setToDoList}
      />
    );
  });
  return (
    <>
      <div className="App">
        <h1>ToDo List</h1>
        <form onSubmit={saveToDoList}>
          <input type="text" placeholder="Enter a task" name="todoname" />
          <button type="submit">Add Task</button>
        </form>
        <div className="toDolist">
          <ul>{list}</ul>
        </div>
      </div>
    </>
  );
}

export default App;

function ToDoListItems({ value, idNum, toDoList, setToDoList }) {
  let [status, setStatus] = useState(false);
  let deleteRow = () => {
    let finalList = toDoList.filter((_,i) => i !== idNum);
    setToDoList(finalList);
  };
  let toggleStatus = () => {
    setStatus(!status);
  };
  return (
    <li className={status ? "completedTask" : ""} onClick={toggleStatus}>
      {idNum + 1} {value} <span onClick={(e) => { e.stopPropagation(); deleteRow(); }}>&times;</span>
    </li>
  );
}
