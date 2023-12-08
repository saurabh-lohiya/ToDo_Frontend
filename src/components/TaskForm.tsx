import React, { useState } from "react";

interface TaskFormProps {
	onSubmit: (title: string, description: string, status: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("To Do");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (title.trim() === "") {
			alert("Title cannot be empty!");
			return;
		}
		onSubmit(title, description, status);
		setTitle("");
		setDescription("");
		setStatus("To Do");
	};

	return (
		<form className='mb-8' onSubmit={handleSubmit}>
			<h2 className='text-xl font-semibold mb-4'>Create New Task</h2>
			<div className='mb-4'>
				<label
					htmlFor='title'
					className='block text-gray-600 text-sm font-medium mb-2'>
					Title
				</label>
				<input
					type='text'
					id='title'
					name='title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className='w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300'
					required
				/>
			</div>
			<div className='mb-4'>
				<label
					htmlFor='description'
					className='block text-gray-600 text-sm font-medium mb-2'>
					Description
				</label>
				<textarea
					id='description'
					name='description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className='w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300'
				/>
			</div>
			<div className='mb-4'>
				<label
					htmlFor='status'
					className='block text-gray-600 text-sm font-medium mb-2'>
					Status
				</label>
				<select
					id='status'
					name='status'
					value={status}
					onChange={(e) => setStatus(e.target.value)}
					className='w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300'>
					<option value='To Do'>To Do</option>
					<option value='In Progress'>In Progress</option>
					<option value='Done'>Done</option>
				</select>
			</div>
			<button
				type='submit'
				className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
				Create Task
			</button>
		</form>
	);
};

export default TaskForm;
