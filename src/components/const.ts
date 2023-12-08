export enum ActionType {
	create_task = "CREATE_TASK",
	update_task = "UPDATE_TASK",
	delete_task = "DELETE_TASK",
	set_authentication = "SET_AUTHENTICATION",
	update_user = "UPDATE_USER",
}

export interface IReducer {
	dispatch: () => IUserState;
	userState: IUserState;
}

export interface IUser {
	email: string;
	first_name?: string;
	last_name?: string;
}

export interface IUserState {
	isUserAuthenticated: boolean;
	user?: IUser;
	tasks?: ITask[];
}

export interface ITask {
	title: string;
	description: string;
	status: TaskStatus;
	userId: number;
	start_date: Date;
	end_date: Date;
	taskItems: ITaskItem[];
	onUpdateStatus?: () => void;
	onDelete?: () => void;
}

export interface ITaskItem {
	title: string;
	status: boolean;
}
export type IAction =
	| { type: ActionType.create_task; payload: IUserState }
	| { type: ActionType.update_task; payload: IUserState }
	| { type: ActionType.delete_task; payload: number }
	| { type: ActionType.set_authentication; payload: boolean }
	| { type: ActionType.update_user; payload: IUserState };

enum TaskStatus {
	todo = "TO_DO",
	inprogress = "IN_PROGRESS",
	completed = "COMPLETED",
	discarded = "DISCARDED",
}