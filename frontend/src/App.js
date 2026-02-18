import { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await fetch("http://backend:5000/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    await fetch("http://backend:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`http://backend:5000/todos/${id}`, {
      method: "DELETE"
    });
    fetchTodos();
  };

  return (
    <div>
      <h1>Todo App v1</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(t => (
          <li key={t._id}>
            {t.title}
            <button onClick={() => deleteTodo(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

