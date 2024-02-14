import React from "react";

export const SubjectiveForm = ({ index, q, onChange }) => {
  return (
    <div
      key={index}
      className='bg-slate-200 p-5 rounded-2xl mb-4 flex flex-col gap-y-2'
    >
      <textarea
        type='text'
        size={20}
        value={q.question}
        onChange={(e) => onChange(index, "question", e.target.value)}
        placeholder='Enter question'
        className='input-box w-full'
      />
    </div>
  );
};
