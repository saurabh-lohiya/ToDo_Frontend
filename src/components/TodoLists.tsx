import React from "react";
import { ITodoListSectionProps } from "./const";
import TodoList from "./TodoList";
import TodoHeader from "./TodoHeader";

const TodoLists: React.FC<ITodoListSectionProps> = (props) => {
	return (
		<div className='w-full h-full p-2 overflow-auto'>
			<TodoHeader type={props.sectionType} />
			{props.todoLists &&
				props.todoLists.map((todoList, index) => (
					<TodoList
						id={todoList.id}
						key={index}
						title={todoList.title}
						description={todoList.description}
						tasks={todoList.tasks}
						start_date={todoList.start_date}
						end_date={todoList.end_date}
						status={todoList.status}
					/>
				))}
		</div>
	);
};

export default TodoLists;
