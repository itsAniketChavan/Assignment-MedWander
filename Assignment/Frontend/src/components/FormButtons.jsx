import { useState } from "react";
import Form from "./Form";

export default function FormButtons() {
  const [formType, setFormType] = useState("A"); // Default to Form A

  const handleFormA = () => setFormType("A");
  const handleFormB = () => setFormType("B");

  return (
    <div className="flex flex-col items-center bg-gray-100 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleFormA}
          className={`${
            formType === "A" ? "bg-blue-600" : "bg-blue-500"
          } text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300`}
        >
          Form A
        </button>
        <button
          onClick={handleFormB}
          className={`${
            formType === "B" ? "bg-green-600" : "bg-green-500"
          } text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300`}
        >
          Form B
        </button>
      </div>

      {/* Render the form below the buttons based on selection */}
      <div className="w-full">
        <Form formType={formType} />
      </div>
    </div>
  );
}
