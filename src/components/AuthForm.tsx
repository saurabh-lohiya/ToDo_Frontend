import React from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const AuthForm: React.FC = () => {
	return (
		<div className='flex items-center justify-center h-screen bg-gray-100'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				<div className='col-span-2 lg:col-span-1'>
					<SignupForm />
				</div>
				<div className='col-span-1'>
					<LoginForm />
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
