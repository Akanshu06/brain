import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.css';

const API_URL = "http://localhost:5000/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos
  useEffect(() => {
    axios.get(API_URL).then((res) => setTodos(res.data));
  }, []);

  // Add todo
  const addTodo = () => {
    if (!newTodo.trim()) return;
    axios.post(API_URL, { text: newTodo }).then((res) => {
      setTodos([...todos, res.data]);
      setNewTodo("");
    });
  };

  // Edit todo
  const editTodo = (id, text) => {
    const updatedText = prompt("Edit your todo:", text);
    if (updatedText) {
      axios.put(`${API_URL}/${id}`, { text: updatedText }).then((res) => {
        setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
      });
    }
  };

  // Delete todo
  const deleteTodo = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <div className="flex space-x-2">
        <input
          className="p-2 rounded bg-gray-800 text-white"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
        />
        <button className="bg-blue-500 px-4 py-2 rounded" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul className="mt-4 w-full max-w-md">
        {todos.map((todo) => (
          <li key={todo._id} className="flex justify-between p-2 bg-gray-700 mt-2 rounded">
            <span>{todo.text}</span>
            <div>
              <button className="mr-2 text-yellow-400" onClick={() => editTodo(todo._id, todo.text)}>Edit</button>
              <button className="text-red-400" onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
