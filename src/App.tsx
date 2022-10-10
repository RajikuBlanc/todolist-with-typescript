import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState(0);

  useEffect(() => {
    const newTask = todos.filter((todo) => todo.checked === false);
    setTask(newTask.length);
  }, [todos]);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 入力値を取得
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 新しいTodoを追加
    e.preventDefault();
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  // タスクの編集
  const handleEdit = (id: number, inputValue: string) => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });

    setTodos(newTodo);
  };

  // タスク完了切り替え
  const handleChecked = (id: number, checked: boolean) => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodo);
  };

  // Todoの削除
  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>Todoリスト with Typescript</h2>
        {/*
          onSubmit  フォームを入力して、エンターキーを押したときにイベントを発火させる。
          onChange フォームに入力される度にイベントが発火する。
         */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            value={inputValue}
          />
          <button type="submit">登録</button>
        </form>
        <p>残りタスク:{task}</p>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.inputValue}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                onChange={() => handleChecked(todo.id, todo.checked)}
              />
              <button
                type="button"
                onClick={() => handleDelete(todo.id)}
                disabled={!todo.checked}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
