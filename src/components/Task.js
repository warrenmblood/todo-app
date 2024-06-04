import React, { useState, useEffect, useRef } from "react";

function Task({ task, toggleComplete, togglePriority, updateTask, deleteTask }) {
    const [editing, setEditing] = useState(false);
    const editRef = useRef(null);

    const handleComplete = () => toggleComplete(task.id);
    const handlePriority = () => togglePriority(task.id);
    const handleEdit = () => setEditing(true);

    useEffect(() => {
        if(editing) editRef.current.focus();
    }, [editing]);

    const handleEditSubmit = (event) => {
        event.preventDefault(); // stop the form from submitting
        setEditing(false);
    };

    const handleEditBlur = () => {
        setEditing(false);
    };

    const handleEditChange = (event) => updateTask(task.id, event.target.value);
    const handleDelete = () => deleteTask(task.id);

    return (
        <div className="task">
            <div className="taskLeftSide">
                <input
                    type="checkbox"
                    className="taskCheckbox"
                    checked={task.completed}
                    onChange={handleComplete}
                />
                {editing ? (
                    <form className="form" onSubmit={handleEditSubmit}>
                        <input
                            ref={editRef}
                            name="editTask"
                            type="text"
                            defaultValue={task?.title}
                            onBlur={handleEditBlur}
                            onChange={handleEditChange}
                        />
                    </form>
                ) : (
                    <p>{task?.title}</p>
                )}
            </div>
            <div className="taskRightSide">
                <button onClick={handlePriority}>{task.priority ? 'Remove Priority' : 'Make Priority'}</button>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export default Task;