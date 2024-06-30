"use client";

import Input from "@/components/input";
import TodoList from "@/components/todo-list";
import { useCallback, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({ title: "", id: "" });
  const [userId, setUserId] = useState<string | null>(null);

  const handleEdit = useCallback(
    ({ title, id }: { title: string; id: string }) => {
      setIsEditing(true);
      setItemToEdit({ title, id });
    },
    []
  );

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserId(user.uid);
    }
  }, []);

  if (!userId) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Todo App</h1>
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="flex justify-center font-bold text-6xl mt-6 pb-2 border-b border-b-1 border-slate-400">
        Todo List
      </h1>
      <Input isEditing={isEditing} itemToEdit={itemToEdit} />
      <TodoList userId={userId} handleEdit={handleEdit} />
    </div>
  );
};

export default Dashboard;
