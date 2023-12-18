import React, { FormEvent, useContext, useState } from "react";
import { UserContext } from "../App";
import { ActionType, ITask, TodoListStatus } from "./const";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const CreateTodoListForm = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [tasks, setTasks] = useState<ITask[]>([{ title: "", status: false }]);
	const [startDate, setStartDate] = useState<Date | undefined>(new Date());
	const [endDate, setEndDate] = useState<Date | undefined>(new Date());
	const [status, setStatus] = useState(TodoListStatus.IN_PROGRESS);
	const { dispatch } = useContext(UserContext);
	const inputRefs = tasks.map(() => React.createRef<HTMLInputElement>());

	const createTodoList = async (
		e: FormEvent<HTMLButtonElement | HTMLFormElement> | KeyboardEvent
	) => {
		e.preventDefault();
		if ((e as KeyboardEvent).key === "Enter") {
			return;
		}
		if (title.trim() === "") {
			alert("Title cannot be empty!");
			return;
		}
		const payload = {
			title,
			description,
			tasks,
			start_date: startDate,
			end_date: endDate,
			status,
		};
		await axios.post(`http://localhost:8080/todo-lists`, payload, {
			withCredentials: true,
		});
		dispatch({
			type: ActionType.create_todolist,
			payload,
		});
		setTitle("");
		setDescription("");
		setTasks([{ title: "", status: false }]);
	};

	const handleTaskChange = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === "Enter") {
			const newTasks = [
				...tasks.slice(0, index + 1),
				{
					title: "",
					status: false,
				},
				...tasks.slice(index + 1),
			];
			setTasks(newTasks);
			const nextInput = inputRefs[index];
			console.log(nextInput);
			if (nextInput && nextInput.current) {
				nextInput.current.focus();
			}
		} else if (e.key === "Backspace" && e.currentTarget.value === "") {
			const newTasks = [...tasks];
			newTasks.splice(index, 1);
			setTasks(newTasks);
		}
	};

	return (
		<div className='w-full border-2 p-2'>
			<form
				onKeyDown={(e) => {
					if (e.key === "Enter") e.preventDefault();
				}}
				onSubmit={(e) => createTodoList(e)}>
				<div className='w-full h-full flex flex-col items-center space-y-2'>
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Title'
						className='w-[90%] hover:bg-slate-200 rounded-sm py-2 px-3 text-gray-700 focus:outline-none'
						required
					/>
					<input
						type='text'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder='Description'
						className='w-[90%] hover:bg-slate-200 rounded-sm py-2 px-3 text-gray-700 focus:outline-none'
					/>
					<>
						{tasks.map((task, index) => (
							<div
								key={index}
								className='w-[90%] flex items-end space-x-4 px-2'>
								<input
									type='checkbox'
									checked={tasks[index].status}
									className='inline-block w-[16px] h-[16px] rounded'
									onChange={() => {
										const newTasks = [...tasks];
										newTasks[index].status = !newTasks[index].status;
										setTasks(newTasks);
									}}
								/>
								<input
									type='text'
									ref={inputRefs[index]}
									className={`w-2/3 px-2 pt-2 rounded-sm focus:outline-none ${
										tasks[index].status
											? "line-through text-gray-400"
											: "text-gray-700"
									}`}
									value={tasks[index].title}
									onChange={(e) => {
										const newTasks = [...tasks];
										newTasks[index].title = e.currentTarget.value;
										setTasks(newTasks);
									}}
									onKeyDown={(e) => {
										handleTaskChange(e, index);
									}}
								/>
							</div>
						))}
					</>
					<div className='w-[90%] p-2 flex space-x-3 items-end'>
						<p className='text-gray-700'>From:</p>
						<DatePicker
							onChange={(value) =>
								setStartDate(value instanceof Date ? value : undefined)
							}
							value={startDate}
							dayPlaceholder='dd'
							monthPlaceholder='mm'
							yearPlaceholder='yyyy'
						/>
					</div>
					<div className='w-[90%] p-2 flex space-x-8 items-end'>
						<p className='text-gray-700'>To:</p>
						<DatePicker
							onChange={(value) =>
								setEndDate(value instanceof Date ? value : undefined)
							}
							value={endDate}
							dayPlaceholder='dd'
							monthPlaceholder='mm'
							yearPlaceholder='yyyy'
						/>
					</div>
					<div className='w-[90%] p-2 flex space-x-3 items-center'>
						<p className='text-gray-700'>Status</p>
						<select
							id='status'
							name='status'
							value={status}
							onChange={(e) => setStatus(e.target.value as TodoListStatus)}
							className='w-[90%] hover:bg-slate-200 rounded-sm py-2 px-3 text-gray-700 focus:outline-none'>
							<option value={TodoListStatus.TODO}>To Do</option>
							<option value={TodoListStatus.IN_PROGRESS}>In Progress</option>
							<option value={TodoListStatus.DONE}>Done</option>
						</select>
					</div>
					<button
						type='submit'
						className='my-20 bg-purple-500 text-white font-bold py-2 px-4 rounded transition duration-500 ease-in-out transform hover:-translate-y-[4px] hover:scale-102'
						onSubmit={(e) => createTodoList(e)}>
						Add Task
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateTodoListForm;
