import React, { useState } from "react";
import Title from "./components/Title";
import Hero from "./components/Hero";
import Form from "./components/Form";
import List from "./components/List";
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  
  const addTask = (task) => {
    const tasksCopy = [...(tasks ?? [])];  // 1. Take a copy of the current state
    tasksCopy.push(task); // 2. Add new task to copy
    setTasks(tasksCopy);  // 3. Set state to copy
  };

  const toggleComplete = (id) => {
    const tasksCopy = [...(tasks ?? [])];
    const index = tasksCopy.findIndex((item) => item.id === id);
    tasksCopy[index].completed = !tasksCopy[index].completed;
    setTasks(tasksCopy);
  };

  const togglePriority = (task) => {
    let tasksCopy = [...(tasks ?? [])];
    tasksCopy = tasksCopy.filter((item) => task.id !== item.id);
    task.priority = !task.priority;
    task.priority ? tasksCopy.unshift(task) : tasksCopy.push(task);
    setTasks(tasksCopy);
  };

  const updateTask = (id, updatedTask) => {
    const tasksCopy = [...(tasks ?? [])];
    const index = tasksCopy.findIndex((item) => item.id === id);
    tasksCopy[index] = updatedTask;
    setTasks(tasksCopy);
  };

  const deleteTask = (id) => {
    let tasksCopy = [...(tasks ?? [])];
    tasksCopy = tasksCopy.filter((task) => id !== task.id);
    setTasks(tasksCopy);
  };

  /*
  const handleSubmit {
    fetch
  }
  */
  
  return (
    <div className="wrapper">
      <Title />
      <Hero 
        tasks={tasks}
      />
      <Form
        addTask={addTask}
      />
      <List
        tasks={tasks}
        toggleComplete={toggleComplete}
        togglePriority={togglePriority}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
