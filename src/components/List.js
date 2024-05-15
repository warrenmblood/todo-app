import React from "react";
import Task from "./Task";

function List({ tasks, toggleComplete, togglePriority, updateTask, deleteTask }) {
    return (
        <ol className="list">
            {tasks && tasks.length > 0 ? (
                tasks.map((task, index) => (
                    <Task
                        key={index}
                        task={task}
                        toggleComplete={toggleComplete}
                        togglePriority={togglePriority}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                    />
                ))
            ) : (
                <p>Add a task to see it here</p>
            )}
        </ol>
    );
}

export default List;