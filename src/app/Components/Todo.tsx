import React from 'react';

interface TodoItem {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface TodoProps {
  todos: TodoItem[];
  onDelete: (id: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todos, onDelete }) => {
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(id);
    }
  };

  return (
    <div className="relative overflow-x-auto w-full max-w-4xl mb-12">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-100 uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-100">
          <tr>
            <th scope="col" className="px-2 py-3 md:px-6">ID</th>
            <th scope="col" className="px-2 py-3 md:px-6">Title</th>
            <th scope="col" className="px-2 py-3 md:px-6">Description</th>
            <th scope="col" className="px-2 py-3 md:px-6">Status</th>
            <th scope="col" className="px-2 py-3 md:px-6">Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr
              key={todo._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300"
            >
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white md:px-6">
                {todo._id}
              </td>
              <td className="px-2 py-4 md:px-6">{todo.title}</td>
              <td className="px-2 py-4 md:px-6">{todo.description}</td>
              <td className="px-2 py-4 md:px-6">{todo.status}</td>
              <td className="px-2 py-4 flex gap-2 md:gap-4">
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700 transition duration-300 md:px-3"
                  onClick={() => handleDeleteClick(todo._id)}
                >
                  Delete
                </button>
                <button className="bg-green-600 text-white px-2 py-1 rounded-lg hover:bg-green-700 transition duration-300 md:px-3">
                  Done
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
