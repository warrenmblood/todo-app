import React from "react";

function Hero({ tasks }) {
    const completed = tasks.filter((task) => task.completed);
    return (
        <div className="hero">
            <h2>Tasks Complete</h2>
            <div className="tasksCompleted">{completed.length}/{tasks.length}</div>
        </div>
    );
}

export default Hero;