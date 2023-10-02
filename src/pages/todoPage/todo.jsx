import { useState, useEffect } from "react";

import AddForm from "../../components/addForm/addForm";
import TaskList from "../../components/tasks/taskList";
import Menu from "../../components/taskMenu/menu";

import "./todo.scss";

export function ToDoPage() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [activeItem, setActiveItem] = useState("All");

  const filteredTasks =
    activeItem === "Active"
      ? tasks.filter((item) => item.isChecked === false)
      : activeItem === "Completed"
      ? tasks.filter((item) => item.isChecked === true)
      : tasks;

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function clearHandler() {
    const clearedTasks = tasks.filter((item) => item.isChecked === false);
    setTasks(clearedTasks);
  }

  return (
    <div className="todo">
      <AddForm tasks={tasks} setTasks={setTasks} />
      <div className="todo__main">
        <TaskList
          tasks={filteredTasks}
          setTasks={setTasks}
          activeItem={activeItem}
        />

        <Menu
          tasks={filteredTasks}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          clearHandler={clearHandler}
        />
      </div>
    </div>
  );
}
