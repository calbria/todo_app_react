/* eslint-disable react/prop-types */
import { useState } from 'react';

import './task.scss';

export default function Task({ task, checkHandler, deleteHandler, editHandler }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(task.text);
    const date = new Date(task.created);
    const myDate = {
      date: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
      month: date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth(),
      year: date.getFullYear(),
    };

    
  
    return (
      <>
        {isEditing ? (
          <li className="task">
            <button
              className="task__check-btn"
              onClick={() => checkHandler(task)}
            >
              <svg
                className={`task__check ${task.isChecked ? "" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            </button>
            <form
              className="task__edit-form"
              onSubmit={(e) => {
                editHandler(e, value, task);
                setIsEditing(false);
              }}
            >
              <input
                className="task__edit-input"
                type="text"
                name="edit"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button className="task__save-btn" type="submit">
                Save
              </button>
              <button
                className="task__cancel-btn"
                type="button"
                onClick={() => {
                  setValue(task.text);
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </form>
          </li>
        ) : (
          <li className="task">
            <button
              className="task__check-btn"
              onClick={() => checkHandler(task)}
            >
              <svg
                className={`task__check ${task.isChecked ? "" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            </button>
            <p className={`task__text ${task.isChecked ? "checked" : ""}`}>
              {task.text}
            </p>
            <span className="task__date">{`${myDate.date}/${myDate.month}/${myDate.year}`}</span>
            <button className="task__edit-btn" onClick={() => setIsEditing(true)}>
              <svg
                className="task__edit"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M200-200h56l345-345-56-56-345 345v56Zm572-403L602-771l56-56q23-23 56.5-23t56.5 23l56 56q23 23 24 55.5T829-660l-57 57Zm-58 59L290-120H120v-170l424-424 170 170Zm-141-29-28-28 56 56-28-28Z" />
              </svg>
            </button>
            <button
              className="task__delete-btn"
              onClick={() => deleteHandler(task)}
            >
              <svg
                className="task__delete"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </button>
          </li>
        )}
      </>
    );
  }