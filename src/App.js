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
  
  const addTask = (task) => {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    };
    fetch("/api/items/post", request)
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  const deleteTask = (id) => {
    const request = {
      method: "DELETE",
    };
    fetch(`api/items/delete?id=${id}`, request)
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  const toggleComplete = (id) => {
    const taskToUpdate = [...tasks].find((task) => task.id === id);
    taskToUpdate.completed = !taskToUpdate.completed;
    const newProperty = { 'completed' : taskToUpdate.completed };
    const request = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProperty)
    };
    fetch(`/api/items/patch?id=${id}`, request)
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  const togglePriority = (id) => {
    const taskToUpdate = [...tasks].find((task) => task.id === id);
    taskToUpdate.priority = !taskToUpdate.priority;
    const newProperty = { 'priority' : taskToUpdate.priority };
    const request = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProperty)
    };
    fetch(`/api/items/patch?id=${id}`, request)
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  const updateTask = (id, updatedTitle) => {
    const newProperty = { 'title' : updatedTitle };
    const request = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProperty)
    };
    fetch(`/api/items/patch?id=${id}`, request)
      .then(res => res.json())
      .then(data => setTasks(data));
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
