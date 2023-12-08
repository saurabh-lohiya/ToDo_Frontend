import React from "react";

const FeatureList: React.FC = () => {
	return (
		<div className='flex mt-8'>
			<div className='flex flex-col items-start'>
				<p className='text-6xl text-gray-500 text-start font-bold'>
					Your go-to task management solution
				</p>
				<p className='text-5xl text-gray-500 font-semibold my-6'>Features</p>
				<div className='text-gray-500 flex-col text-start text-3xl font-bold space-y-4'>
					<p>Task Management</p>
					<p>Priority Levels</p>
					<p>Due Dates</p>
					{/* Add more features */}
				</div>
			</div>
		</div>
	);
};

export default FeatureList;
