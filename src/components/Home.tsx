import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ActionType, ITodoList, IUserState, TodoListStatus } from "./const";
import { UserContext } from "../App";
import Todo from "./Todo";
import InProgress from "./InProgress";
import Done from "./Done";
import axios from "axios";
import Sidebar from "./Sidebar";

interface ITodoListContext {
	setOpenTodoListId: Dispatch<SetStateAction<number>>;
	setIsTodoListOpen: Dispatch<SetStateAction<boolean>>;
}
export const TodoListContext = React.createContext({} as ITodoListContext);

const Home: React.FC<IUserState> = () => {
	const { state, dispatch } = useContext(UserContext);
	const [isTodoListOpen, setIsTodoListOpen] = React.useState(false);
	const [openTodoListId, setOpenTodoListId] = React.useState(0);
	useEffect(() => {
		const userId = localStorage.getItem("userId");
		if (userId) {
			(async function () {
				const userRes = await axios.get(
					`http://localhost:8080/users/${userId}`,
					{ withCredentials: true }
				);
				if (userRes.status === 200) {
					dispatch({
						type: ActionType.set_user,
						payload: userRes.data.data,
					});
				}
			})();
		}
	}, []);
	return (
		<TodoListContext.Provider value={{ setOpenTodoListId, setIsTodoListOpen }}>
			<section className='pt-16 w-full flex justify-center h-full bg-red-200'>
				<div className='flex flex-col w-[1140px] h-full'>
					<div className='flex sm:px-4 lg:p-0 lg:space-evenly w-full h-full mt-8'>
						<Todo
							todoLists={state.todoLists}
							sectionType={TodoListStatus.TODO}
						/>
						<InProgress
							todoLists={state.todoLists}
							sectionType={TodoListStatus.IN_PROGRESS}
						/>
						<Done
							todoLists={state.todoLists}
							sectionType={TodoListStatus.DONE}
						/>
					</div>
				</div>
				{isTodoListOpen && (
					<Sidebar
						show={isTodoListOpen}
						todoList={
							state.todoLists?.find(
								(todoList) => todoList.id == openTodoListId
							) || ({} as ITodoList)
						}
					/>
				)}
				{
					// Add Todo List Button
					<div className='fixed bottom-16 right-16 z-1'>
						<button
							className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-all duration-300 ease-in-out shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]'
							onClick={() => {
								setOpenTodoListId(-1);
								setIsTodoListOpen(true);
							}}>
							+
						</button>
					</div>
				}
			</section>
		</TodoListContext.Provider>
	);
};

export default Home;
