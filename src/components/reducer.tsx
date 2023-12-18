import { ActionType, IAction, ITodoList, IUserState } from "./const";

export const reducer = function (
	state: IUserState,
	action: IAction
): IUserState {
	// console.log
	if (action.type === ActionType.create_todolist) {
		const updatedTodoLists: ITodoList[] = state.todoLists || [];
		updatedTodoLists.push(action.payload);
		return {
			...state,
			todoLists: updatedTodoLists,
		};
	} else if (action.type === ActionType.set_authentication) {
		return {
			...state,
			isAuthenticated: action.payload,
		};
	} else if (action.type === ActionType.set_user) {
		return {
			...state,
			...action.payload,
		};
	} else if (action.type === ActionType.update_todolist) {
		const updatedTodoLists: ITodoList[] = state.todoLists || [];
		const index = updatedTodoLists.findIndex(
			(todoList) => todoList.id === action.payload.id
		);
		updatedTodoLists[index] = action.payload;
		return {
			...state,
			todoLists: updatedTodoLists,
		};
	} else if (action.type === ActionType.delete_todolist) {
		const updatedTodoLists: ITodoList[] = state.todoLists || [];
		const index = updatedTodoLists.findIndex(
			(todoList) => todoList.id === action.payload
		);
		updatedTodoLists.splice(index, 1);
		return {
			...state,
			todoLists: updatedTodoLists,
		};
	}
	return { ...state };
};
