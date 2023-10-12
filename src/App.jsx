import "./App.scss";
import { useState, useEffect } from "react";
import { getFetcher, postFetcher, putFetcher } from "./utils/tasks_api";


import AddForm from "./components/addForm/addForm";
import TaskList from "./components/tasks/tasks";
import Menu from "./components/menu/menu";
import RegisterForm from "./components/register/register";
import LoginForm from "./components/register/login";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  const [isLogedin, setIsLogedin] = useState(() => document.cookie.slice(5));
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [accessToken, setAccessToken] = useState(() =>
    document.cookie.slice(5)
  );
 
  const [tasks, setTasks] = useState([]);
  
  const [activeItem, setActiveItem] = useState("All");

  const filteredTasks =
    activeItem === "Active"
      ? tasks.filter((item) => item.status === "active")
      : activeItem === "Completed"
      ? tasks.filter((item) => item.status === "done")
      : tasks;

  //ADD
  async function addHandler(e, val) {
    e.preventDefault();
    const newTask = {
      text: val,
    };
    await postFetcher(newTask, accessToken);
    setTasks(await getFetcher(accessToken));
  }

  //EDIT
  async function editHandler(e, val, task) {
    e.preventDefault();
    const editedTask = { ...task, text: val };
    
   await putFetcher(editedTask, accessToken)
   setTasks(await getFetcher(accessToken));
  }

  // CHECK DONE
  async function checkHandler(task) {
    const toggleTask = {
      ...task,
      status: task.status === "active" ? "done" : "active",
    };
    await putFetcher(toggleTask, accessToken)
    setTasks(await getFetcher(accessToken));
  }

  //---------------------------------------------------
  //DELETE
  function deleteHandler(task) {
    const updatedTasks = tasks.filter((item) => item.id !== task.id);
    setTasks(updatedTasks);
  }
  //CLEAR
  function clearHandler() {
    const clearedTasks = tasks.filter((item) => item.status === "active");
    setTasks(clearedTasks);
  }

  //-------------------------------------------------------

  function signupBtnHandler() {
    setIsSignedUp(true);
  }
  function signinBtnHandler() {
    setIsSignedUp(false);
  }

  //-------------------------------------------------------
  //GET TASKS
  useEffect(() => {
   
    (async () => setTasks(await getFetcher(accessToken)))();
    setIsLoading(false)
  }, [accessToken]);

  return (
    <div className="app">
      <div className="container">
        <header className="app__header">
          <h1 className="app__title">MY TODO</h1>
        </header>
        <main className="app__main">
          {isLogedin ? (
            <>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
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
                </>
              )}
            </>
          ) : isSignedUp ? (
            <RegisterForm
              signinBtnHandler={signinBtnHandler}
              signup={setIsLogedin}
              setAccessToken={setAccessToken}
            />
          ) : (
            <LoginForm
              signupBtnHandler={signupBtnHandler}
              signin={setIsLogedin}
              setAccessToken={setAccessToken}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

// const patternTask = [
//   {
//     id: 1,
//    status: "active" / "done"
//     text: "my task 1",
//     createdAt: ,
//     updatedAt: ,
//
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

// get user via access token
//   useEffect(() => {
//     fetch("http://212.24.111.61:3003/users/me", {
//           method: "GET",
//           headers: {
//             "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMzNjMGY3MC04YjkzLTQ5MTMtYTMxYi1iNTVjZjZjM2E2NDQiLCJzdWIiOiJhbm5AbWFpbC5jb20iLCJpYXQiOjE2OTcwOTEwNjQuMzk0LCJleHAiOjE2OTcwOTQ2NjQuMzk0LCJyb2xlcyI6WyJ1c2VyIl0sIm9yaWdpbmFsX3VpZCI6IjEzM2MwZjcwLThiOTMtNDkxMy1hMzFiLWI1NWNmNmMzYTY0NCJ9.0IbKAnAsyNIgYXxTzIjPgBGsxu2AST3B9o7zbYf9yjg"
//           },

//         }).then(response => response.json()).then(data => console.log(data));
//   })

//user data
//   {id: '133c0f70-8b93-4913-a31b-b55cf6c3a644', email: 'ann@mail.com', firstName: 'Ann', lastName: 'Smith', status: 'active', …}
// createdAt
// :
// "2023-10-12T06:11:04.291Z"
// email
// :
// "ann@mail.com"
// firstName
// :
// "Ann"
// id
// :
// "133c0f70-8b93-4913-a31b-b55cf6c3a644"
// lastName
// :
// "Smith"
// roles
// :
// ['user']
// status
// :
// "active"
// updatedAt
// :
// "2023-10-12T06:11:04.291Z"
