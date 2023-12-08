import React from "react";
import { ITask } from "./const";

const Task: React.FC<ITask> = ({
	title,
	description,
	status,
	onUpdateStatus,
	onDelete,
}) => {
	return (
		<div className='border p-4 mb-4'>
			<h3 className='text-lg font-semibold'>{title}</h3>
			<p className='text-gray-600'>{description}</p>
			<p
				className={`mt-2 text-${
					status === "COMPLETED"
						? "green"
						: status === "IN_PROGRESS"
						? "blue"
						: "red"
				}-500 font-semibold`}>
				{status}
			</p>
			<div className='mt-4'>
				<button
					className={`bg-${
						status === "Done" ? "gray" : "green"
					}-500 text-white py-2 px-4 rounded mr-2`}
					onClick={onUpdateStatus}>
					{status === "Done" ? "Reopen" : "Complete"}
				</button>
				<button
					className='bg-red-500 text-white py-2 px-4 rounded'
					onClick={onDelete}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default Task;
