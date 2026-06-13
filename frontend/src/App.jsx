import { useEffect, useState } from "react";
import TodoForm from "./components/ToDoForm";
import TodoList from "./components/ToDoList";
import "./index.css";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const updateTodo = (id, data) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  return (
    <div className="app-container">
      <h1>📝 My To-Do List</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
    </div>
  );
}