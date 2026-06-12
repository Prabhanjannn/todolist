import TodoItem from "./TodoItem";

export default function TodoList({ todos, onDelete, onUpdate }) {
    if (todos.length === 0)
        return <p className="empty-state">No tasks yet. Add one above!</p>;

    return (
        <div>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
            ))}
        </div>
    );
}