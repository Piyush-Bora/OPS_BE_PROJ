import React from "react";

export const MCQForm = ({ index, mcq, onChange, onRemove }) => {
  return (
    <div
      key={index}
      className='bg-slate-200 p-5 rounded-2xl mb-4 flex flex-col gap-y-2'
    >
      <textarea
        type='text'
        size={20}
        value={mcq.question}
        onChange={(e) => onChange(index, "question", e.target.value)}
        placeholder='Enter question'
        className='input-box w-full'
      />
      <div className='flex flex-col gap-2'>
        {["A", "B", "C", "D"].map((optionLabel, optionIndex) => (
          <div key={optionIndex}>
            <input
              type='text'
              className='input-box w-1/2'
              value={mcq.options[optionIndex]}
              onChange={(e) =>
                onChange(
                  index,
                  "options",
                  [...mcq.options].map((opt, i) =>
                    i === optionIndex ? e.target.value : opt
                  )
                )
              }
              placeholder={`Option ${optionLabel}`}
            />
          </div>
        ))}
      </div>

      <button className='btn-error' onClick={() => onRemove(index)}>
        Remove MCQ
      </button>
    </div>
  );
};
