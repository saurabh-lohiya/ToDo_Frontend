import React from "react";
import TodoLists from "./TodoLists";
import { ITodoListSectionProps } from "./const";

const InProgress: React.FC<ITodoListSectionProps> = (props) => {
	return (
		<div className='w-1/3 max-w-md h-full'>
			{/* <CreateTodoListForm /> */}
			<TodoLists
				sectionType={props.sectionType}
				todoLists={
					props.todoLists?.filter((todoList) => {
						return todoList.status === props.sectionType;
					}) || []
				}
			/>
		</div>
	);
};

export default InProgress;
