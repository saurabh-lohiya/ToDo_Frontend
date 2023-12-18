import React from "react";
import TodoLists from "./TodoLists";
import { ITodoListSectionProps } from "./const";

const Todo: React.FC<ITodoListSectionProps> = (props) => {
	return (
		<div className='w-full lg:w-1/3 max-w-[400px]'>
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

export default Todo;
