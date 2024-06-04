const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.use(express.static("build"));
app.use(bodyParser.json());

let tasks = [];

app.get("/api/items", (req, res) => {
    console.log('GET successful');
    res.send(tasks);
});

app.post("/api/items/post", (req, res) => {
    let newTask = req.body;
    tasks.push(newTask);
    console.log('POST successful');
    res.send(tasks);
});

app.delete("/api/items/delete", (req, res) => {
    const id = req.query.id;
    tasks = tasks.filter((task) => id !== task.id);
    console.log('DELETE successful');
    res.send(tasks);
});

app.patch("/api/items/patch", (req, res) => {
    const id = req.query.id;
    const updateIdx = tasks.findIndex((task) => task.id === id);
    tasks[updateIdx] = Object.assign(tasks[updateIdx], req.body);
    if(Object.keys(req.body)[0] === 'priority') {
        const taskToMove = tasks[updateIdx];
        tasks = tasks.filter((task) => id !== task.id);
        req.body.priority ? tasks.unshift(taskToMove) : tasks.push(taskToMove);
    }
    console.log('PATCH successful');
    res.send(tasks);
});

