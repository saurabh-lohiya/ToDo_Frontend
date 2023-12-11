import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ActionType, TASK_TYPE } from "./const";
import { UserContext } from "../App";
import InProgress from "./Todo";
import Todo from "./Todo";
import Done from "./Done";

const userName = "Saurabh";
const Home: React.FC = () => {
	const { userState, dispatch } = useContext(UserContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (userState.isUserAuthenticated) {
			// Fetch User Details and all tasks data.
			(async function () {
				const { data } = await axios.get(
					`${process.env.REACT_APP_BACKEND_ROUTE}/users/:userId`
				);
				dispatch({ type: ActionType.update_user, payload: data.tasks });
			})();
		} else {
			navigate("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userState]);
	return (
		<section className='homepage w-full flex justify-center'>
			<div className='flex flex-col space-center w-[1140px]'>
				<p className='p-8 text-6xl font-bold'> Hello {userName}</p>
				<div className='flex space-evenly w-full'>
					<Todo task_type={TASK_TYPE.TODO} tasks={userState.tasks} />
					<Done task_type={TASK_TYPE.DONE} tasks={userState.tasks} />
					<InProgress
						task_type={TASK_TYPE.IN_PROGRESS}
						tasks={userState.tasks}
					/>
				</div>
			</div>
		</section>
	);
};

export default Home;
