import React, { useEffect, useReducer, createContext } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import "./App.css"; // Import Tailwind CSS styles
import Home from "./components/Home";
import { IAction, IUserState, ActionType, IReducer } from "./components/const";
import axios from "axios";

// dotenv.config();

const initialUserState: IUserState = {
	isUserAuthenticated: false,
};

const userContx: IReducer = {
	userState: initialUserState,
	dispatch: () => initialUserState,
};

export const UserContext = createContext(userContx);

const App: React.FC = () => {
	const navigate = useNavigate();
	const reducer = function (state: IUserState, action: IAction): IUserState {
		if (action.type == "UPDATE_TASK") {
			state.user;
		} else if (action.type == "SET_AUTHENTICATION") {
			return {
				...state,
				isUserAuthenticated: action.payload,
			};
		}
		return { ...state };
	};
	const [userState, dispatch] = useReducer(reducer, initialUserState);

	useEffect(() => {
		// Make a request to the server to check authentication status

		(async function () {
			await axios
				.get(`http://localhost:8080/users/check-auth`)
				.then((data) => {
					dispatch({
						type: ActionType.set_authentication,
						payload: true,
					});
					navigate("/home");
				})
				.catch((error) => {
					console.error("Error checking authentication status:", error);
				});
		})();
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
