import React, { useContext, useEffect } from "react";
import InProgress from "./InProgress";
import NotStarted from "./NotStarted";
import Completed from "./Completed";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ActionType } from "./const";
import { UserContext } from "../App";

const userName = "Saurabh";
const Home: React.FC = (props) => {
	const { userState, dispatch }: any = useContext(UserContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (props.isUserAuthenticated) {
			// Fetch User Details
			(async function () {
				const { data } = await axios.get(
					`${process.env.BACKEND_ROUTE}/users/:userId`
				);
				dispatch({ type: ActionType.update_user, payload: data });
			})();
		} else {
			navigate("/");
		}
	});
	return (
		<section className='homepage w-full'>
			<div className='flex w-full'>
				<p className='text-4xl'> Hello {userName}</p>
				<div className='flex space-evenly w-full'>
					<NotStarted />
					<InProgress />
					<Completed />
				</div>
			</div>
		</section>
	);
};

export default Home;
