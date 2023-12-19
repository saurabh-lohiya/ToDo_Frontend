import React from "react";

const FeatureList: React.FC = () => {
	return (
		<div className='flex h-full'>
			<div className='flex flex-col items-start justify-center'>
				<>
					<p className='leading-tight text-[54px] text-slate-500 text-start font-bold'>
						Your <span className='text-red-500'>go-to</span> Task management
						solution
					</p>
					<p className='text-5xl text-slate-500 font-semibold my-6'>Features</p>
					<div className='text-slate-500 flex-col text-start text-3xl font-bold space-y-4'>
						<p className='flex items-center space-x-3'>
							<span className='bg-slate-500 p-2 rounded-lg'></span>
							<span>Task Management</span>
						</p>
						<p className='flex items-center space-x-3'>
							<span className='bg-slate-500 p-2 rounded-lg'></span>
							<span>Priority Levels</span>
						</p>
						<p className='flex items-center space-x-3'>
							<span className='bg-slate-500 p-2 rounded-lg'></span>
							<span>Due Dates</span>
						</p>
					</div>
				</>
			</div>
		</div>
	);
};

export default FeatureList;
