const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.use(express.static("build"));

const tasks = [
    {
        title: "sample task",
        id: "task00000000001",
        priority: false,
        completed: false
    }
];

app.get("/api/items", (req, res) => {
    console.log('GET successful');
    res.send(tasks);
});

app.put("/api/items", (req, res) => {
    console.log('POST successful');
});