import React from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    setTodoEditing(null);
  }
  function updateTodoText(e, id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = e.target.value;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }
  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit" className="addToClass">
          Add Todo
        </button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            {todo.id === todoEditing ? (
              <input
                type="text"
                value={todo.text}
                onChange={(e) => updateTodoText(e, todo.id)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button
                className="addToClass"
                onClick={() => submitEdits(todo.id)}
              >
                Save
              </button>
            ) : (
              <button
                style={{ backgroundColor: "#007bff" }}
                onClick={() => setTodoEditing(todo.id)}
              >
                Edit
              </button>
            )}

            <button
              style={{ backgroundColor: "#dc3545" }}
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
