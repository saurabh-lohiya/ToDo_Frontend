import React, { useContext } from "react";
import { UserContext } from "../App";
import { ActionType } from "./const";
import axios from "axios";
import { logo } from "../assets/";

const Header: React.FC = () => {
	const { state, dispatch } = useContext(UserContext);
	const [openDropdown, setOpenDropdown] = React.useState(false);
	const handleLogout = async () => {
		const userId = localStorage.getItem("userId");
		const logoutRes = await axios.delete(
			`http://localhost:8080/users/${userId}/logout`,
			{ withCredentials: true }
		);
		if (logoutRes.status == 204) {
			dispatch({
				type: ActionType.set_authentication,
				payload: false,
			});
			localStorage.removeItem("userId");
		}
	};
	return (
		<section className='fixed top-0 flex justify-center w-full bg-gray-100 shadow-sm'>
			<div className='w-[1140px] py-3 px-4 flex justify-between'>
				<div className='flex text-4xl font-bold items-center space-x-2'>
					<span>Todo</span>
					<img src={logo} alt='' className='w-[48px]' />
				</div>
				{state.isAuthenticated ? (
					<div className='flex space-x-2 items-center relative'>
						<img
							src='https://www.w3schools.com/howto/img_avatar.png'
							alt='avatar'
							className='w-8 h-8 rounded-full cursor-pointer'
							onClick={() => setOpenDropdown(!openDropdown)}
						/>
						{openDropdown && (
							<div className='absolute bg-white border-2 top-10 right-[-20px] flex flex-col rounded-md p-2 cursor-pointer z-10'>
								<div className='text-md pb-1 px-2 border-b-2 font-medium cursor-pointer'>
									Profile
								</div>
								<div
									className='text-md px-2 pt-1 font-medium text-blue-500 z-50 relative bg-white'
									onClick={handleLogout}>
									Logout
								</div>
							</div>
						)}
					</div>
				) : (
					<div className='flex space-x-2 items-center'>
						<a
							href='/login'
							className='text-sm border-2 font-semibold text-blue-500 bg-white rounded-md px-4 py-2'>
							Login
						</a>
						<a
							href='/register'
							className='text-sm font-semibold border-2 rounded-md bg-blue-500 text-white px-4 py-2'>
							Register
						</a>
					</div>
				)}
			</div>
		</section>
	);
};

export default Header;
