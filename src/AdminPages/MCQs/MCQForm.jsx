import React from "react";

export const MCQForm = ({ index, mcq, onChange, onRemove }) => {
	return (
		<div key={index} className='bg-slate-200 p-5 rounded-2xl mb-4 flex gap-x-4'>
			<div className='flex justify-center items-center w-10 h-10 rounded-full bg-slate-900 text-white'>
				{index}
			</div>
			<div className='flex flex-col gap-y-2 flex-1'>
				<textarea
					type='text'
					size={20}
					value={mcq.question}
					onChange={(e) => onChange(index, "question", e.target.value)}
					placeholder='Enter question'
					className='input-box w-full'
				/>
				<div className='flex flex-wrap gap-2'>
					{["A", "B", "C", "D"].map((optionLabel, optionIndex) => (
						<div key={optionIndex}>
							<input
								type='text'
								className='input-box flex-grow'
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
			</div>
		</div>
	);
};
