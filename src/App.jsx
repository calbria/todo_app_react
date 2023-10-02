import "./App.scss";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import AddForm from "./components/addForm/addForm";
import TaskList from "./components/tasks/taskList";
import Menu from "./components/taskMenu/menu";
import RegisterForm from "./pages/loginPage/register";
import LoginForm from "./pages/loginPage/login";

import { ToDoPage } from "./pages/todoPage/todo";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogedin, setIsLogedin] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  function signupBtnHandler() {
    setIsSignedUp(true);
  }
  function signinBtnHandler() {
    setIsSignedUp(false);
  }

  return (
    <div className="app">
      <div className="container">
        <header className="app__header">
          <h1 className="app__title">MY TODO</h1>
        </header>
        <main className="app__main">
          {isLogedin ? (
            <>{isLoading ? <p>Loading...</p> : <ToDoPage />}</>
          ) : isSignedUp ? (
            <RegisterForm
              signinBtnHandler={signinBtnHandler}
              signup={setIsLogedin}
            />
          ) : (
            <LoginForm
              signupBtnHandler={signupBtnHandler}
              signin={setIsLogedin}
            />
          )}
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
