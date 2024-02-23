import React from "react";

const WarningOverlay = ({ text, cta, action }) => {
	return (
		<div className='absolute top-0 right-0 left-0 bottom-0 min-h-full bg-slate-900 bg-opacity-50 backdrop-blur-md flex justify-center items-center'>
			<div className='p-5 rounded-xl border border-1 border-gray-500 bg-white flex flex-col gap-6 w-[25%] min-h-[25%] justify-center items-center'>
				<span className='text-lg text-center'>{text}</span>
				{action && (
					<button type='button' className='btn-primary' onClick={action()}>
						{cta}
					</button>
				)}
			</div>
		</div>
	);
};

export default WarningOverlay;
