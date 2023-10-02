/* eslint-disable react/prop-types */
import { useState } from "react";
import Task from "../task/task";
import "./taskList.scss";
// eslint-disable-next-line react/prop-types


export default function TaskList({
  tasks, setTasks,
  activeItem,
}) {
 
  const empty =
    activeItem === "Active"
      ? "active"
      : activeItem === "Completed"
      ? "completed"
      : "";

  function editHandler(e, val, task) {
    e.preventDefault();
    const editedTask = { ...task, text: val };
    const updatedTasks = tasks.map((item) =>
      item.id === task.id ? editedTask : item
    );
    setTasks(updatedTasks);
  }

  function checkHandler(task) {
    const toggleTask = { ...task, isChecked: !task.isChecked };
    const updatedTasks = tasks.map((item) =>
      item.id === task.id ? toggleTask : item
    );
    setTasks(updatedTasks);
  }
  function deleteHandler(task) {
    const updatedTasks = tasks.filter((item) => item.id !== task.id);
    setTasks(updatedTasks);
  }
  return (
    <ul className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            setTasks={setTasks}
            checkHandler={checkHandler}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
          />
        ))
      ) : (
        <li className="task-list__empty">{`You have no ${empty} tasks`}</li>
      )}
    </ul>
  );
}
