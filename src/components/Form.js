import React from "react";

function Form({ addTask }) {
    const handleSubmit = (event) => {
        event.preventDefault(); // stop the form from submitting
        const value = event.target.newTask.value;
        if(value) addTask({ title: value, id: `task${Date.now()}`, priority: false, completed: false });
        event.currentTarget.reset(); // refresh the form
    };
    
    return (
        <form className="form" onSubmit={handleSubmit}>
            <input name="newTask" type="text" placeholder="New task" />
            <button type="submit">Add</button>
        </form>
    );
}

export default Form;