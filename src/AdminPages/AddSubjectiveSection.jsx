import React, { useState } from "react";
import { CgAdd } from "react-icons/cg";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { SubjectiveForm } from "./SubjectiveForm";
import { useParams } from "react-router-dom";

export const AddSubjectiveSection = () => {
  const { testid } = useParams();
  console.log({ testid });
  const [subq, setSubq] = useState([]);

  const handleAddMCQ = () => {
    setSubq([...subq, { question: "" }]);
  };

  const handleChangeSubq = (index, field, value) => {
    setSubq(subq.map((q, i) => (i === index ? { ...q, [field]: value } : q)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted MCQs:", subq);
    // Handle form submission logic here
  };

  return (
    <div className='flex flex-col gap-y-5'>
      <form onSubmit={handleSubmit}>
        {subq.map((q, index) => (
          <SubjectiveForm
            key={index}
            index={index}
            q={q}
            onChange={handleChangeSubq}
          />
        ))}
        <div className='flex gap-x-3'>
          <button onClick={handleAddMCQ} className='btn-primary'>
            <CgAdd size={20} />
            Add Subjective Question
          </button>
          <button type='submit' className='btn-primary'>
            <IoCheckmarkDoneCircle size={20} />
            Submit
          </button>
        </div>
      </form>

      {subq.map((item) => {
        return <div>{JSON.stringify(item)}</div>;
      })}
    </div>
  );
};
