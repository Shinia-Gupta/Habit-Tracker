import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Habits from "./pages/Habits";
import Home from "./pages/Home";
import AddHabbitModal from "./components/AddHabbitModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/habits",
      element: <Habits />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
      <AddHabbitModal />
      <DeleteConfirmModal/>

    </div>
  );
}

export default App;
