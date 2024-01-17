import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateTestForm = () => {
  const [testName, setTestName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/createTest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testName, description }),
      });

      const data = await response.json();
      const testId = data.testId;
      navigate(`/admin.dashboard/${testId}`); // Redirect to AdminDashboard with testId
    } catch (error) {
      console.error("Error creating test:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for testName and description */}
      <button type='submit'>Create Test</button>
    </form>
  );
};
