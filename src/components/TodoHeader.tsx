import { ITodoHeader, TASK_TYPE } from "./const";

const TodoHeader: React.FC<ITodoHeader> = (props) => {
	const typeClass =
		props.type === TASK_TYPE.IN_PROGRESS
			? "blue"
			: props.type === TASK_TYPE.DONE
			? "teal"
			: "red";
	return (
		<div className='w-full flex justify-center'>
			<div
				className={`px-3 py-1 rounded-2xl bg-${typeClass}-500 flex space-x-2 items-center`}>
				<span
					className={`p-1 rounded-[10px] bg-${typeClass}-700 border-[1px] `}
				/>{" "}
				<p className='text-sm'> {props.type}</p>
			</div>
		</div>
	);
};

export default TodoHeader;
