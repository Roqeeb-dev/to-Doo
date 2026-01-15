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
    <main
      className="w-[520px] mx-auto h-[72vh] 
  bg-gradient-to-br from-[#0f172a]/90 via-[#020617]/90 to-[#020617]
  backdrop-blur-xl rounded-[2.2rem]
  border border-white/10
  p-7 text-slate-100
  shadow-[0_20px_60px_-15px_rgba(56,189,248,0.25)]"
    >
      {/* Header */}
      <h1
        className="text-3xl font-semibold tracking-wide text-center mb-7
    bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400
    bg-clip-text text-transparent"
      >
        Todo · Do Everything
      </h1>

      {/* Todo input box */}
      <div className="flex gap-3 mb-7">
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="What are we building today?"
          className="flex-1 rounded-2xl
        bg-white/5 backdrop-blur
        border border-white/10
        px-5 py-3 text-sm
        placeholder-slate-400
        focus:outline-none focus:ring-2 focus:ring-cyan-400/50
        transition"
          value={todo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTodo(e.target.value);
          }}
        />

        <button
          onClick={() => {
            addTodo(todo);
          }}
          className="px-6 py-3 rounded-2xl text-sm font-medium
        bg-gradient-to-r from-cyan-500 to-blue-500
        hover:from-cyan-400 hover:to-blue-400
        active:scale-[0.97]
        transition shadow-lg shadow-cyan-500/30"
        >
          Add
        </button>
      </div>

      {/* Todos */}
      <div
        className="space-y-4 overflow-y-auto max-h-[46vh] pr-1
    scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        {todos.map((todo, index) => (
          <div
            key={index}
            className={`flex items-center justify-between
          rounded-2xl px-5 py-4
          border backdrop-blur
          transition-all duration-300
          ${
            todo.isCompleted
              ? "bg-emerald-500/10 border-emerald-400/30"
              : "bg-white/5 border-white/10 hover:border-cyan-400/30"
          }`}
          >
            <div>
              <p
                className={`text-sm font-medium tracking-wide
              ${
                todo.isCompleted
                  ? "line-through text-emerald-300"
                  : "text-slate-200"
              }`}
              >
                {todo.text}
              </p>

              <p
                className="text-xs mt-1 uppercase tracking-widest
            text-slate-400"
              >
                {todo.isCompleted ? "Completed" : "Pending"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {!todo.isCompleted && (
                <button
                  onClick={() => {
                    markAsDone(todo.id);
                  }}
                  className="text-xs px-4 py-1.5 rounded-full
                border border-white/20
                text-slate-300
                hover:bg-cyan-400/10 hover:border-cyan-400/40
                transition"
                >
                  Mark Done
                </button>
              )}

              <X
                onClick={() => {
                  deleteTodo(todo.id);
                }}
                className="w-7 h-7 text-red-400
              hover:text-red-300 hover:rotate-90
              transition duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
