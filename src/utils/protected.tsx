import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { ActionType } from "../components/const";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Protected(props: any) {
	const { Component } = props;
	const navigate = useNavigate();
	const { state, dispatch } = useContext(UserContext);
	useEffect(() => {
		(async function () {
			try {
				const checkAuthRes = await axios.get(
					`http://localhost:8080/users/${state.id}/check-auth`,
					{ withCredentials: true }
				);
				console.log(checkAuthRes);
				if (checkAuthRes.status == 200) {
					dispatch({ type: ActionType.set_authentication, payload: true });
				}
			} catch (error) {
				console.log(error);
				dispatch({ type: ActionType.set_authentication, payload: false });
				navigate("/");
			}
		})();
	}, [state.isAuthenticated]);
	return <Component />;
}
