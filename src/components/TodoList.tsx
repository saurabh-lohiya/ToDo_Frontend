import React, { useContext } from "react";
import { ActionType, ITodoList } from "./const";
import { TodoListContext } from "./Home";
import { deleteIcon, EditIcon, threeDotsIcon } from "./../assets";
import axios from "axios";
import { UserContext } from "../App";

const TodoList: React.FC<ITodoList> = (props) => {
	const popupRef = React.useRef<HTMLDivElement | null>(null);
	const { title, description, tasks } = props;
	const [showMoreActions, setShowMoreActions] = React.useState(false);
	const { setOpenTodoListId, setIsTodoListOpen } = useContext(TodoListContext);
	const { dispatch } = useContext(UserContext);
	const deleteTodoList = async () => {
		await axios.delete(`http://localhost:8080/todo-lists/${props.id}`, {
			withCredentials: true,
		});
		dispatch({
			type: ActionType.delete_todolist,
			payload: props.id,
		});
		setShowMoreActions(false);
	};
	React.useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				popupRef.current &&
				event.target instanceof Node &&
				!popupRef.current.contains(event.target)
			) {
				setShowMoreActions(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [popupRef]);
	return (
		<div className='relative border-2 rounded-md p-4 my-2 text-start space-y-2'>
			<div className='absolute flex flex-col items-end top-4 right-4'>
				<img
					src={threeDotsIcon.default}
					alt=''
					className='w-[24px] h-[24px] relative p-1 hover:bg-slate-300 rounded-md'
					onClick={() => setShowMoreActions(!showMoreActions)}
				/>
				{showMoreActions && (
					<div
						ref={popupRef}
						className='flex flex-col space-y-1 border-2 py-2 px-3 rounded-md shadow-lg bg-white z-10'
						onClick={(e) => {
							e.stopPropagation();
						}}>
						<div
							className='z-10 flex items-center space-x-2 bg-white cursor-pointer'
							onClick={() => {
								deleteTodoList();
							}}>
							<img
								src={deleteIcon.default}
								alt=''
								className='w-[18px] h-[18px] relative'
							/>
							<span>Delete</span>
						</div>
						<div
							className='flex items-center space-x-2 bg-white text-md cursor-pointer'
							onClick={() => {
								setOpenTodoListId(props.id);
								setIsTodoListOpen(true);
								setShowMoreActions(false);
							}}>
							<EditIcon />
							<span>Edit</span>
						</div>
					</div>
				)}
			</div>
			<p className='text-3xl'>{title}</p>
			{(description?.length || 0) > 0 && (
				<p className='text-xl'>{description}</p>
			)}
			<ul>
				{tasks.map((task, index) => (
					<li key={index} className='flex items-center space-x-2'>
						<input
							type='checkbox'
							readOnly
							checked={tasks[index].status}
							className='inline-block w-[16px] h-[16px] rounded'
						/>
						<span className='text-xl'>{task.title}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
