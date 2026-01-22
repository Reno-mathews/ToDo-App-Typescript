import { useEffect, useState } from "react";
import type { Todo } from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);
  
  const addTodo = async() => {
    const res = await fetch("http://localhost:5000/api/todos", {
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });

  const newTodo = await res.json();
  setTodos([...todos, newTodo]);
  setTitle("");

  };

  const deleteTodo = async (id: string) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE"
    });

    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div style={{ padding: 20}}>
      <h1>Todo App (TypeScript MERN)</h1>

      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo"
      />

      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
};



export default App;
