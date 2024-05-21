import React, { useState, useEffect } from "react";
import Title from "./components/Title";
import Hero from "./components/Hero";
import Form from "./components/Form";
import List from "./components/List";
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/items")
    .then(res => res.json())
    .then(data => setTasks(data));
  }, []);

  const handleSubmit = (tasksCopy) => {
    fetch("/api/items", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tasksCopy)
    })
    .then(res => res.json())
    .then(data => console.log(data));
    
    setTasks(tasksCopy);
  };
  
  const addTask = (task) => {
    const tasksCopy = [...(tasks ?? [])];  // 1. Take a copy of the current state
    tasksCopy.push(task); // 2. Add new task to copy
    handleSubmit(tasksCopy);  // 3. Set state to copy
  };

  const toggleComplete = (id) => {
    const tasksCopy = [...(tasks ?? [])];
    const index = tasksCopy.findIndex((item) => item.id === id);
    tasksCopy[index].completed = !tasksCopy[index].completed;
    handleSubmit(tasksCopy);
  };

  const togglePriority = (task) => {
    let tasksCopy = [...(tasks ?? [])];
    tasksCopy = tasksCopy.filter((item) => task.id !== item.id);
    task.priority = !task.priority;
    task.priority ? tasksCopy.unshift(task) : tasksCopy.push(task);
    handleSubmit(tasksCopy);
  };

  const updateTask = (id, updatedTask) => {
    const tasksCopy = [...(tasks ?? [])];
    const index = tasksCopy.findIndex((item) => item.id === id);
    tasksCopy[index] = updatedTask;
    handleSubmit(tasksCopy);
  };

  const deleteTask = (id) => {
    let tasksCopy = [...(tasks ?? [])];
    tasksCopy = tasksCopy.filter((task) => id !== task.id);
    handleSubmit(tasksCopy);
  };

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
