"use client"

import React, { useState, useEffect } from "react";
import Todo from "./Components/Todo";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-spinners';

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch todos from the database
  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api");
      setTodos(response.data.todos);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id: string) => {
    try {
      const response = await axios.delete('/api', {
        params: {
          mongoId: id,
        }
      });
      if (response.status === 200) {
        await fetchTodos(); // Refresh the todos after deleting one
        toast.success('ToDo Deleted');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the ToDo');
    }
  };

  // Handle input changes
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const onSubmitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api', formData);
      toast.success(response.data.msg);
      setFormData({
        title: "",
        description: "",
      });
      await fetchTodos(); // Fetch the todos again to update the list with the new task
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <ToastContainer theme="dark" />
      <div className="flex flex-col items-center justify-center pt-10">
        <form
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-12"
          onSubmit={onSubmitHandle}
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center sm:text-2xl">
            Create a New Task
          </h2>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              placeholder="Enter a Title"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-4"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              placeholder="Enter a Description"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-4"
              rows={4}
              onChange={onChangeHandler}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Add Task
          </button>
        </form>

        {/* Pass the deleteTodo function and loading state to the Todo component */}
        <Todo todos={todos} onDelete={deleteTodo} loading={loading} />
      </div>
    </div>
  );
}
