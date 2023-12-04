import React from "react";

const FeatureList: React.FC = () => {
	return (
		<div className='flex justify-center items-center mt-8'>
			<div>
				<h2 className='text-2xl font-semibold mb-4'>Features</h2>
				<ul className='list-disc list-inside'>
					<li>Task Management</li>
					<li>Priority Levels</li>
					<li>Due Dates</li>
					{/* Add more features */}
				</ul>
			</div>
		</div>
	);
};

export default FeatureList;
