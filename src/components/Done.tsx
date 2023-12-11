import TodoHeader from "./TodoHeader";
import { ITasks } from "./const";

const Done: React.FC<ITasks> = (props) => {
	return (
		<div className='not-started w-1/3 max-w-md overflow-auto'>
			<TodoHeader type={props.task_type} />
		</div>
	);
};

export default Done;
