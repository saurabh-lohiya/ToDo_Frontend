import React from "react";
import { ITodoHeader, TodoListStatus } from "./const";

const TodoHeader: React.FC<ITodoHeader> = (props) => {
	const listType = {
		[TodoListStatus.IN_PROGRESS]: { css: "bg-blue-500", header: "In Progress" },
		[TodoListStatus.DONE]: { css: "bg-green-500", header: "Done" },
		[TodoListStatus.TODO]: { css: "bg-red-500", header: "Todo" },
	}[props.type];

	return (
		<div className='w-full flex px-3'>
			<div
				className={`px-3 py-[2px] rounded-2xl ${listType.css} flex space-x-2 items-center`}>
				<span className={`p-1 rounded-[10px] ${listType.css} border-[1px] `} />{" "}
				<p className='text-sm tracking-wide font-medium text-white'> {listType.header}</p>
			</div>
		</div>
	);
};

export default TodoHeader;
