import { useState } from "react";
import { X } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  isCompleted?: boolean;
}

export default function Landing() {
  const [todo, setTodo] = useState<string>("");
  const defaultTodo: Todo = {
    id: 1,
    text: "Welcome to Todo Helper",
    isCompleted: false,
  };
  const [todos, setTodos] = useState<Todo[]>([defaultTodo]);

  function addTodo(todo: string) {
    setTodos((prev: Todo[]) => [
      ...prev,
      {
        id: prev[prev.length - 1].id + 1,
        text: todo,
        isCompleted: false,
      },
    ]);
    setTodo("");
  }

  function markAsDone(id: number) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }

  function deleteTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
  }

  return (
    <main className="w-[500px] mx-auto h-[70vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700 p-6 text-white shadow-xl">
      <h1 className="text-2xl font-bold text-center mb-6">
        Todo: Do Everything
      </h1>

      {/* Todo input box */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="Enter your new todo here"
          className="flex-1 rounded-xl bg-slate-800 border border-slate-600 px-4 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={todo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTodo(e.target.value);
          }}
        />
        <button
          onClick={() => {
            addTodo(todo);
          }}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-sm font-medium"
        >
          Add
        </button>
      </div>

      {/* Todos */}
      <div className="space-y-3 overflow-y-auto max-h-[45vh] pr-1">
        {todos.map((todo, index) => (
          <div
            key={index}
            className={`flex items-center justify-between rounded-2xl px-4 py-3 border transition
              ${
                todo.isCompleted
                  ? "bg-green-900/40 border-green-700"
                  : "bg-slate-800 border-slate-700"
              }
            `}
          >
            <div>
              <p
                className={`text-sm font-medium ${
                  todo.isCompleted
                    ? "line-through text-green-300"
                    : "text-slate-200"
                }`}
              >
                {todo.text}
              </p>
              <p className="text-xs text-slate-400">
                {todo.isCompleted ? "Completed" : "Pending"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {!todo.isCompleted && (
                <button
                  onClick={() => {
                    markAsDone(todo.id);
                  }}
                  className={`text-xs px-3 py-1 rounded-full border transition
                ${
                  todo.isCompleted
                    ? "border-green-600 text-green-400"
                    : "border-slate-600 text-slate-300 hover:bg-slate-700"
                }
              `}
                >
                  Mark Done
                </button>
              )}

              <X
                onClick={() => {
                  deleteTodo(todo.id);
                }}
                className="w-7 h-7 text-red-500"
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
