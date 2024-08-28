import React from 'react'; 
import { ClipLoader } from 'react-spinners'; // Importing the ClipLoader spinner for loading animation
import Swal from 'sweetalert2'; // Importing SweetAlert2 for enhanced alert dialogs

// Interface defining the structure of a Todo item
interface TodoItem {
  _id: string;
  title: string;
  description: string;
  status: string;
}

// Interface for the Todo component props
interface TodoProps {
  todos: TodoItem[];
  onDelete: (id: string) => void;
  loading: boolean; // Prop to indicate loading state
}

// The Todo component that displays a list of todos and handles deletion
const Todo: React.FC<TodoProps> = ({ todos, onDelete, loading }) => {

  // Function to handle the delete button click
  const handleDeleteClick = (id: string) => {
    // Display a SweetAlert2 confirmation dialog
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
        onDelete(id); // Call the onDelete function if the user confirms
        Swal.fire(
          'Deleted!',
          'Your ToDo has been deleted.',
          'success'
        )
      }
    });
  };

  // Display the loading spinner when loading state is true
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  // Render the table of todos when loading is complete
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
