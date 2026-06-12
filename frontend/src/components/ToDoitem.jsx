import { useState } from "react";

export default function TodoItem({ todo, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    const handleSave = () => {
        if (!editTitle.trim()) return;
        onUpdate(todo.id, { title: editTitle.trim(), completed: todo.completed });
        setIsEditing(false);
    };

    const toggleComplete = () => {
        onUpdate(todo.id, { title: todo.title, completed: !todo.completed });
    };

    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={toggleComplete}
            />

            {isEditing ? (
                <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    autoFocus
                />
            ) : (
                <span className={todo.completed ? "completed" : ""}>{todo.title}</span>
            )}

            {isEditing ? (
                <button className="btn-save" onClick={handleSave}>Save</button>
            ) : (
                <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit</button>
            )}

            <button className="btn-delete" onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
    );
}