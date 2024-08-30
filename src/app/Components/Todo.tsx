'use client';

import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import Swal from 'sweetalert2';

interface TodoItem {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string; // Add createdAt to the interface
}

interface TodoProps {
  todos: TodoItem[];
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  loading: boolean;
}

const Todo: React.FC<TodoProps> = ({ todos, onDelete, onComplete, loading }) => {
  const [showMoreMap, setShowMoreMap] = useState<{ [key: string]: boolean }>({});

  const handleDeleteClick = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire('Deleted!', 'Your ToDo has been deleted.', 'success');
      }
    });
  };

  const handleDoneClick = (id: string) => {
    Swal.fire({
      title: 'Mark as Completed?',
      text: "This task will be marked as done!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, mark as done!'
    }).then((result) => {
      if (result.isConfirmed) {
        onComplete(id);
        Swal.fire('Completed!', 'The task has been marked as completed.', 'success');
      }
    });
  };

  const handleShowMore = (id: string) => {
    setShowMoreMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto w-full max-w-4xl mb-12">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-100 uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-100">
          <tr>
            <th scope="col" className="px-2 py-3 md:px-6">ID</th>
            <th scope="col" className="px-2 py-3 md:px-6">Title</th>
            <th scope="col" className="px-2 py-3 md:px-6">Description</th>
            <th scope="col" className="px-2 py-3 md:px-6">Status</th>
            <th scope="col" className="px-2 py-3 md:px-6">Created At</th>
            <th scope="col" className="px-2 py-3 md:px-6">Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            const words = todo.description.split(' ');
            const displayDescription = showMoreMap[todo._id] 
              ? todo.description 
              : words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');

            return (
              <tr
                key={todo._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300"
              >
                <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white md:px-6">
                  {todo._id.slice(0, 6)}...
                </td>
                <td className="px-2 py-4 md:px-6">{todo.title}</td>
                <td className="px-2 py-4 md:px-6">
                  <span>{displayDescription}</span>
                  {words.length > 20 && (
                    <button
                      className="text-blue-600 ml-2"
                      onClick={() => handleShowMore(todo._id)}
                    >
                      {showMoreMap[todo._id] ? 'Less' : 'More'}
                    </button>
                  )}
                </td>
                <td className="px-2 py-4 md:px-6">
                  {todo.status === 'Completed' ? (
                    <span className="text-green-600 font-semibold">Completed</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                </td>
                <td className="px-2 py-4 md:px-6">
                  {new Date(todo.createdAt).toLocaleString()}
                </td>
                <td className="px-2 py-4 flex gap-2 md:gap-4">
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700 transition duration-300 md:px-3"
                    onClick={() => handleDeleteClick(todo._id)}
                  >
                    Delete
                  </button>
                  {todo.status !== 'Completed' && (
                    <button 
                      className="bg-green-600 text-white px-2 py-1 rounded-lg hover:bg-green-700 transition duration-300 md:px-3"
                      onClick={() => handleDoneClick(todo._id)}
                    >
                      Done
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;