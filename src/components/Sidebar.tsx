import React, { FormEvent, useContext } from "react";
import { ActionType, ITodoList, TodoListStatus } from "./const";
import DatePicker from "react-date-picker";
import { TodoListContext } from "./Home";
import axios from "axios";
import { UserContext } from "../App";

interface SidebarProps {
	todoList: ITodoList; // Replace with your TodoList type
	show: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ todoList, show }) => {
	const [title, setTitle] = React.useState(todoList.title || "");
	const [description, setDescription] = React.useState(
		todoList.description || ""
	);
	const [isExistingTodoList] = React.useState(
		todoList.id ? true : false
	);
	const [tasks, setTasks] = React.useState(
		todoList.tasks || [{ title: "", status: false }]
	);
	const [status, setStatus] = React.useState(todoList.status);
	const [startDate, setStartDate] = React.useState<Date | undefined>(
		todoList.start_date ? new Date(todoList.start_date) : undefined
	);
	const [endDate, setEndDate] = React.useState<Date | undefined>(
		todoList.end_date ? new Date(todoList.end_date) : undefined
	);
	const { dispatch } = useContext(UserContext);
	const { setIsTodoListOpen } = useContext(TodoListContext);

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
		const filteredTasks = tasks.filter((task) => task.title.trim() !== "");
		const payload = {
			title,
			description,
			tasks: filteredTasks,
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

	const updateTodoList = async () => {
		try {
			if (title.trim() === "") {
				alert("Title cannot be empty!");
				return;
			}
			const filteredTasks = tasks.filter((task) => task.title.trim() !== "");
			const payload = {
				title,
				description,
				tasks: filteredTasks,
				start_date: startDate,
				end_date: endDate,
				status,
			};
			await axios.put(
				`http://localhost:8080/todo-lists/${todoList.id}`,
				payload,
				{
					withCredentials: true,
				}
			);
			dispatch({
				type: ActionType.update_todolist,
				payload,
			});
		} catch (error) {
			console.log(error);
		}
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
		} else if (e.key === "Backspace" && e.currentTarget.value === "") {
			const newTasks = [...tasks];
			newTasks.splice(index, 1);
			setTasks(newTasks);
		}
	};

	return (
		<aside
			className={`w-[480px] z-10 translate-x-0 absolute right-0 bg-white border-2 
                        h-full ${show ? "translate-x-0" : "translate-x-full"}`}>
			<div className='relative w-full px-6 py-4 flex flex-col items-start'>
				<div
					className='rounded-[50%] absolute right-8 top-8 w-[32px] h-[32px] flex justify-center items-center cursor-pointer'
					onClick={() => setIsTodoListOpen(false)}>
					<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACMElEQVR4nO2YP28TMRjGf6fekkoICUaGNhIrDDTfiXYhohSWNkVsLIgEIsGepgT6MZp+ESTUgakjGXqVpfcky7Iv9p1zSZF/0g25P4+f5+x7HRsSiUQikfCnB5wCY+AI6NKcrmiNRVu1EZ0OcA4UxrEAToCshqZ6ZiAapu5U2oyGzbx+DANDZPJMUXGcxTLfM4R/AK+Aec0QNvNz0ZwZ5/diBHhvmC/JLQ36hPhkPDMTrRJdUw2xxnzRBPvGtdAQT5eYR9oor4+IwJHR1blHiJEjxEPgWvtQc4vWlabzmkhlbrHkrYWEeAw8s5zPDY1/wA6ROPHoeleID8Bf4G2Ffm559piI2CqHb4jyuAkwP6w5t6w0xLd1mtf5aDR4YQmxBUy0e3457jkztD6v2nxoT+wDLz17adiG+aoQtp6wYXvz39s0X5JJlTF7Qhl0sRVQbtcWQg0ZFwebZL5OgP1NCpDd5yGUWczbSqUNs8QWbX/EIWX0QIbNxpTRzGLeZ5LymeyKVfdEXfMbESJraH7tIQYeYx6L+ZGjUuVt/p3ueixoFM8d5TGrGWIB7LaxpNSXi7+BW1m460MgJMQ89pJSX9SrrY8qtoEnDctv3+jFqNsqqkGdF8CjAC2fED+1a2opG31jayZv6VJ+/wEeNAxxJZq6+UJeUBSmFaXxtsbH5rO1OCEiHUd9V5XiXU1NFeLYsbk7ib25W7Inc8JX4DDSvs0u8EY+2EHMYZNIJBKJ/587XfZ+CArMbAAAAAAASUVORK5CYII=' />
				</div>
				<form
					onKeyDown={(e) => {
						if (e.key === "Enter") e.preventDefault();
					}}
					onSubmit={(e) => {
						e.preventDefault();
						if (isExistingTodoList) {
							updateTodoList();
						} else {
							createTodoList(e);
						}
					}}>
					<div className='w-full flex flex-col items-start'>
						<input
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder='Title'
							className='w-[90%] lg:w-[75%] text-3xl hover:bg-slate-200 rounded-sm py-2 px-3 text-gray-900 focus:outline-none'
							required
						/>
						<input
							type='text'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder='Description'
							className='w-[90%] hover:bg-slate-200 rounded-sm py-2 px-3 text-gray-700 focus:outline-none'
						/>
						<div className='w-full flex space-x-3 items-end'>
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
						<>
							{tasks.map((task, index) => (
								<div
									key={index}
									className='w-[90%] flex items-end space-x-4 px-2'>
									<input
										type='checkbox'
										checked={task.status}
										className='inline-block w-[16px] h-[16px] rounded'
										onChange={() => {
											const newTasks = [...tasks];
											newTasks[index].status = !newTasks[index].status;
											setTasks(newTasks);
										}}
									/>
									<input
										type='text'
										className={`w-2/3 px-2 pt-2 rounded-sm focus:outline-none ${
											task.status
												? "line-through text-gray-400"
												: "text-gray-700"
										}`}
										value={task.title}
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
						<button
							type='submit'
							className='my-20 bg-purple-500 text-white font-bold py-2 px-4 rounded transition duration-500 ease-in-out transform hover:-translate-y-[4px] hover:scale-102'>
							{isExistingTodoList ? "Update Task" : "Create Task"}
						</button>
					</div>
				</form>
			</div>
		</aside>
	);
};

export default Sidebar;
