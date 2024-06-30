"use client";

import { CheckCircle, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface TodoItemProps {
  title: string;
  id: string;
  description: string | null;
  isCompleted?: boolean;
  updatedAt: string;
  handleEdit: ({ title, id }: { title: string; id: string }) => void;
}

const TodoItem = ({
  title,
  id,
  description,
  isCompleted,
  updatedAt,
  handleEdit,
}: TodoItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [comment, setComment] = useState(description || "");

  const completeTodo = async () => {
    try {
      const apiUrl = `/api/todo/${id}/update`;

      const requestData = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(apiUrl, requestData);

      if (!response.ok) {
        throw new Error(
          `Failed to update todo: ${response.status} - ${response.statusText}`
        );
      }

      toast.success("Todo updated");

      // Reload page on successful request
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while completing todo");
    } finally {
      setIsLoading(false);
    }
  };

  const editTask = () => {
    handleEdit({ title, id });
  };

  const deleteTask = async () => {
    if (window.confirm(`Delete "${title}"?`)) {
      try {
        const apiUrl = `/api/todo/${id}/delete`;

        const requestData = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(apiUrl, requestData);

        if (!response.ok) {
          throw new Error(
            `Failed to delete todo "${title}": ${response.status} - ${response.statusText}`
          );
        }

        toast.success("Todo deleted");

        // Reload page on successful delete
        window.location.reload();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while deleting todo");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(e.target.value);
  };

  const submitDescription = async () => {
    try {
      const apiUrl = `/api/todo/${id}/description`;

      const requestData = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: comment }),
      };

      const response = await fetch(apiUrl, requestData);

      if (!response.ok) {
        throw new Error(
          `Failed to add/update description: ${response.status} - ${response.statusText}`
        );
      }

      toast.success("Description updated successfully");

      // Clear comment state and hide input
      setComment("");
      setShowDescription(false);

      // Reload page to reflect changes
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add/update description");
    }
  };

  const todoItemStyle = isCompleted
    ? "w-full rounded-sm border p-2 flex bg-green-100 text-green-600"
    : "w-full rounded-sm border p-2 flex";

  return (
    <li className={todoItemStyle}>
      <div className="flex items-center w-full">
        <div className="flex-grow">{title}</div>
        <div className="ml-auto flex space-x-6">
          {isCompleted && (
            <p className="text-slate-600 text-xs italic font-bold">
              Completed on {updatedAt}
            </p>
          )}
          {!isCompleted && (
            <>
              <button onClick={editTask} className="px-1">
                <Pencil className="text-slate-500" />
              </button>
              <button onClick={completeTodo} className="px-1">
                <CheckCircle className="text-green-300" />
              </button>
              {!showDescription && (
                <button onClick={toggleDescription} className="px-1">
                  {description === null ? "Add Description" : "Show Description"}
                </button>
              )}
              {showDescription && (
                <button onClick={toggleDescription} className="px-1">
                  {description === null ? "Save Description" : "Edit Description"}
                </button>
              )}
            </>
          )}
          <button onClick={deleteTask} className="px-1">
            <Trash2 className="text-red-600" />
          </button>
        </div>
      </div>
      {showDescription && !isCompleted && (
        <div className="mt-2 w-50">
          <textarea
            className="border rounded-md p-2 w-full"
            placeholder="Add/update description..."
            value={comment}
            onChange={handleDescriptionChange}
          />
          <button
            onClick={submitDescription}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            {description === null ? "Save Description" : "Update Description"}
          </button>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
