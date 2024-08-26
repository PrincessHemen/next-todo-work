"use client";

import React, { useState, useEffect } from "react";
import Todo from "./Components/Todo";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api");  // This calls the GET handler in route.ts
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);  // The empty dependency array ensures this runs only once when the component mounts
  

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const onSubmitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Your form submission logic here, e.g., axios.post(...)
      toast.success("Task created successfully");
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
            onChange={onSubmitHandle}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Add Task
          </button>
        </form>

        <Todo />
      </div>
    </div>
  );
}
