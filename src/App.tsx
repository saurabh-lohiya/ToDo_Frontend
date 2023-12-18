import React, { useReducer, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import "./App.css";
import Home from "./components/Home";
import { IUserState, IReducer } from "./components/const";
import { Protected } from "./utils/protected";
import { reducer } from "./components/reducer";
import Header from "./components/Header";

// dotenv.config();

const initialUserState: IUserState = {
	id: 0,
	email: "",
	todoLists: [],
	isAuthenticated: false,
};

const userContx: IReducer = {
	state: initialUserState,
	dispatch: () => {},
};

export const UserContext = createContext(userContx);

const App: React.FC = () => {
	// const contextValue = useMemo/
	const [state, dispatch] = useReducer(reducer, initialUserState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<section className='w-full h-screen flex flex-col justify-center relative'>
				<Header />
				<Router>
					<Routes>
						<Route path='/' element={<LandingPage />} />
						<Route path='/home' element={<Protected Component={Home} />} />
					</Routes>
				</Router>
			</section>
		</UserContext.Provider>
	);
};

export default App;
