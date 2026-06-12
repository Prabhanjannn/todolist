import { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./components/ToDoForm";  // ✅
import TodoList from "./components/ToDoList";  // ✅
import "./index.css";

const API = "http://localhost:5000/api/todos";

export default function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async (title) => {
    const res = await axios.post(API, { title });
    setTodos([res.data, ...todos]);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTodos(todos.filter((t) => t.id !== id));
  };

  const updateTodo = async (id, data) => {
    await axios.put(`${API}/${id}`, data);
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