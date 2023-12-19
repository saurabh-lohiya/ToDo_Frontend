import { Dispatch } from "react";

export enum ActionType {
	create_todolist = "CREATE_TODOLIST",
	update_todolist = "UPDATE_TODOLIST",
	delete_todolist = "DELETE_TODOLIST",
	set_authentication = "SET_AUTHENTICATION",
	update_user = "UPDATE_USER",
	set_user = "SET_USER",
}

export interface IAuthForm {
	toggleShowLoginForm: (arg: boolean) => void;
}
export interface ITodoHeader {
	type: TodoListStatus;
}

export enum TodoListStatus {
	TODO = "TODO",
	IN_PROGRESS = "IN_PROGRESS",
	DONE = "DONE",
}
export interface IReducer {
	dispatch: Dispatch<IAction>;
	state: IUserState;
}

export interface ITodoListSectionProps {
	todoLists?: ITodoList[];
	sectionType: TodoListStatus;
}

export interface IUserState extends IUser {
	isAuthenticated: boolean;
}

export interface IUser {
	id: number;
	email: string;
	phone_number?: string;
	user_name?: string;
	first_name?: string;
	last_name?: string;
	birth_date?: Date;
	todoLists?: ITodoList[];
}

export interface ITodoList {
	id?: number;
	title: string;
	description?: string;
	status: TodoListStatus;
	start_date?: Date;
	end_date?: Date;
	tasks: ITask[];
	onUpdateStatus?: () => void;
	onDelete?: () => void;
	openTodoList?: () => void;
}

export interface ITask {
	title: string;
	status: boolean;
}
export type IAction =
	| { type: ActionType.create_todolist; payload: ITodoList }
	| { type: ActionType.update_todolist; payload: ITodoList }
	| { type: ActionType.delete_todolist; payload: number }
	| { type: ActionType.set_authentication; payload: boolean }
	| { type: ActionType.update_user; payload: IUserState }
	| { type: ActionType.set_user; payload: IUser };
