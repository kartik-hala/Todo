import { useEffect, useState } from "react";
import TodoItem from "./todo-item";
import { Todo } from "@prisma/client";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/format-date";
import { getAuth } from "firebase/auth";

interface TodoListProps {
  userId: string; // Assuming userId is passed as a prop
  handleEdit: ({ title, id }: { title: string; id: string }) => void;
}

const TodoList = ({ userId, handleEdit }: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("Please Login");
      return;
    }

    const fetchTodos = async () => {
      try {
        const response = await fetch(`/api/todo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.uid }), // Pass userId in the JSON body
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch items: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setTodos(data);
      } catch (error: any) {
        console.error(`Error fetching items: ${error.message}`);
        toast.error("Unable to fetch todos at this time");
      }
    };

    fetchTodos();
  }, [userId]); // Ensure useEffect runs when userId changes

  return todos.length > 0 ? (
    <ul className="w-full rounded-sm border p-3 space-y-2">
      {todos.map((todo) => {
        const updatedDate = formatDate(todo.updatedAt);
        return (
          <TodoItem
            key={todo?.id}
            title={todo?.title}
            id={todo?.id}
            description={todo?.description}
            isCompleted={todo?.isCompleted!}
            updatedAt={updatedDate}
            handleEdit={handleEdit}
          />
        );
      })}
    </ul>
  ) : (
    []
  );
};

export default TodoList;
