/* eslint-disable react/prop-types */
import "./addForm.scss";
import { useState } from "react";
import { nanoid } from "nanoid";


export default function AddForm({ tasks, setTasks }) {
  const [value, setValue] = useState("");

  function addHandler(e, val) {
    e.preventDefault();
    const newTask = {
      id: nanoid(),
      text: val,
      created: Date.now(),
      isChecked: false,
    };
    console.log(newTask);
    setTasks([...tasks, newTask]);
  }
  
  return (
    <form
      className="form"
      onSubmit={(e) => {
        addHandler(e, value);
        setValue("");
      }}
    >
      <button className="form__btn" type="submit">
        <svg
          className="form__plus"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </button>
      <input
        className="form__input"
        type="text"
        name="add"
        placeholder="Create new task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
