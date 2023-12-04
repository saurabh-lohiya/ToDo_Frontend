import React from "react";
import Header from "./Header";
import FeatureList from "./FeatureList";
import AuthForm from "./AuthForm";

const LandingPage: React.FC = () => {
	return (
		<div className='min-h-screen flex bg-gray-100'>
			<div className='w-1/2 p-8'>
				<Header />
				<FeatureList />
			</div>
			<div className='w-1/2 bg-blue-500 p-8'>
				<AuthForm />
			</div>
		</div>
	);
};

export default LandingPage;
