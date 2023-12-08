import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const AuthForm: React.FC = () => {
	const [showLoginForm, setShowLoginForm] = useState(false);
	return (
		<div className='md:px-8'>
			<div className='w-full'>
				{showLoginForm ? (
					<LoginForm toggleShowLoginForm={setShowLoginForm} />
				) : (
					<SignupForm toggleShowLoginForm={setShowLoginForm} />
				)}
			</div>
		</div>
	);
};

export default AuthForm;
