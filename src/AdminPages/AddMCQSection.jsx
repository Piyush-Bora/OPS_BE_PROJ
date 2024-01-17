import React, { useState } from "react";
import { MCQForm } from "../MCQForm";
import { CgAdd } from "react-icons/cg";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

export const AddMCQSection = () => {
  const [mcqs, setMcqs] = useState([]);

  const handleAddMCQ = () => {
    setMcqs([...mcqs, { question: "", options: ["", "", "", ""] }]);
  };

  const handleChangeMCQ = (index, field, value) => {
    setMcqs(
      mcqs.map((mcq, i) => (i === index ? { ...mcq, [field]: value } : mcq))
    );
  };

  const handleRemoveMCQ = (index) => {
    setMcqs(mcqs.filter((mcq, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted MCQs:", mcqs);
    // Handle form submission logic here
  };

  return (
    <div className='flex flex-col gap-y-5'>
      <form onSubmit={handleSubmit}>
        {mcqs.map((mcq, index) => (
          <MCQForm
            key={index}
            index={index}
            mcq={mcq}
            onChange={handleChangeMCQ}
            onRemove={handleRemoveMCQ}
          />
        ))}
        <div className='flex gap-x-3'>
          <button onClick={handleAddMCQ} className='btn-primary'>
            <CgAdd size={20} />
            Add MCQ
          </button>
          <button type='submit' className='btn-primary'>
            <IoCheckmarkDoneCircle size={20} />
            Submit
          </button>
        </div>
      </form>

      {mcqs.map((item) => {
        return <div>{JSON.stringify(item)}</div>;
      })}
    </div>
  );
};
