import "./App.scss";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import AddForm from "./components/addForm/addForm";
import TaskList from "./components/tasks/tasks";
import Menu from "./components/menu/menu";

function App() {
  const [fact, setFact] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await fetch("https://catfact.ninja/fact");
        // if (!response) throw new Error('No data');
        console.log(response)
        const data = await response.json();
        console.log(data);
        setFact(data.fact)
      } catch (err) {
        console.log(err.message);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout( () => {
      (async () => await fetcher())();
    }, 2000)
    
    // fetcher does not return any value
    // so we can just call it
    // fetcher()
    // fetch("https://catfact.ninja/fact")
    //   .then((res) => res.json())
    //   .then((data) => setFact(data.fact))
    //   .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    // document.addEventListener("click", () => console.log("click"));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <div className="container">
        <header className="app__header">
          <h1 className="app__title">MY TODO</h1>
        </header>
        <main className="app__main">
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
        </main>
        
        {isLoading ? <p>Loading data...</p> : fetchError ? <p>{fetchError}</p> :  <p>Fun fact about cats: {fact}</p>}
        
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
