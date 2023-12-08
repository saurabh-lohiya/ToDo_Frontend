import React, { useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import "./App.css"; // Import Tailwind CSS styles
import Home from "./components/Home";
import { IAction, IUserState, ActionType, IReducer } from "./components/const";
import dotenv from "dotenv";

// dotenv.config();

const initialUserState: IUserState = {
	isUserAuthenticated: false,
};

// const userContx: IReducer = {
// 	userState: initialUserState,
// };

export const UserContext = createContext({});

const App: React.FC = () => {
	const reducer = function (state: IUserState, action: IAction): IUserState {
		if (action.type == "UPDATE_TASK") {
			state.user;
		}
		return { ...state };
	};
	const [userState, dispatch] = useReducer(reducer, initialUserState);

	useEffect(() => {
		// Make a request to the server to check authentication status

		fetch(`/users/check-auth`, {
			method: "GET",
			headers: {
				// Include any necessary headers (e.g., authentication token)
				authorization: localStorage.getItem("token") || "",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				dispatch({
					type: ActionType.set_authentication,
					payload: true,
				});
			})
			.catch((error) => {
				console.error("Error checking authentication status:", error);
			});
	}, []);

	return (
		<UserContext.Provider value={{ userState, dispatch }}>
			<Router>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/home' element={<Home userData={userState} />} />
				</Routes>
			</Router>
		</UserContext.Provider>
	);
};

export default App;
