import "./App.scss";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import AddForm from "./components/addForm/addForm";
import TaskList from "./components/tasks/tasks";
import Menu from "./components/menu/menu";
import RegisterForm from "./components/register/register";
import LoginForm from "./components/register/login";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogedin, setIsLogedin] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false)

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
  function clearHandler() {
    const clearedTasks = tasks.filter((item) => item.isChecked === false);
    setTasks(clearedTasks);
  }

  function signupBtnHandler() {
    setIsSignedUp(true)
  }
  function signinBtnHandler() {
    setIsSignedUp(false)
  }

  

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // console.log(tasks);

  return (
    <div className="app">
      <div className="container">
        <header className="app__header">
          <h1 className="app__title">MY TODO</h1>
        </header>
        <main className="app__main">
          {
            isLogedin ?  <>
            {isLoading ? <p>Loading...</p> : <>
            <AddForm addHandler={addHandler} />
            <div className="app__list">
              <TaskList
                tasks={filteredTasks}
                checkHandler={checkHandler}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
                activeItem={activeItem}
              />
              <div className="app__menu">
                <Menu
                  tasks={filteredTasks}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                  clearHandler={clearHandler}
                />
              </div>
            </div>
            </>}
           
            
          </> : isSignedUp ? <RegisterForm signinBtnHandler={signinBtnHandler} signup={setIsLogedin}/> : <LoginForm signupBtnHandler={signupBtnHandler} signin={setIsLogedin}/>
          }
         
        </main>
      </div>
    </div>
  );
}

export default App;

// const initTask = [
//   {
//     id: 1,
//     text: "my task 1",
//     created: '25/10/22',
//     isChecked: false,
//   },

// ];

// useEffect(() => {
  //   const fetcher = async () => {
  //     try {
  //       // const response = await fetch("http://212.24.111.61:3003/auth/token", {
  //       //   method: "POST",
  //       //   headers: {
  //       //     "Content-Type": "application/json"
  //       //   },
  //       //   body: JSON.stringify({
  //       //     username: "b@gmail.com",
  //       //     password: "123",

  //       //   })
  //       // });
  //       // const response = await fetch("http://212.24.111.61:3003/users", {
  //       //   method: "GET",
  //       //   headers: {
  //       //     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjUxMDZlNy1kY2VhLTRkNWUtYWUzMy03MzRiNjEwMTI5NWUiLCJzdWIiOiJiQGdtYWlsLmNvbSIsImlhdCI6MTY5NTM5MzQyNC45MjMsImV4cCI6MTY5NTM5NzAyNC45MjMsInJvbGVzIjpbInVzZXIiXSwib3JpZ2luYWxfdWlkIjoiNWY1MTA2ZTctZGNlYS00ZDVlLWFlMzMtNzM0YjYxMDEyOTVlIn0.RAq0rU5flCzSTbk7raL8UZljU2HmIw0uYi9BOOYag9Q"
  //       //   },

  //       // });
  //       // if (!response) throw new Error('No data');
  //       // console.log(response);
  //       const body = await response.json()
  //       console.log(body);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  //   (async () => await fetcher())();
  // }, []);
