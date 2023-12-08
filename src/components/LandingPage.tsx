import React from "react";
import Header from "./Header";
import FeatureList from "./FeatureList";
import AuthForm from "./AuthForm";

const LandingPage: React.FC = () => {
	return (
		<section className='w-full flex justify-center'>
			<div className='justify-center w-full max-w-[1280px]'>
				<Header />
				<div className='flex w-full flex-wrap'>
					<div className='w-1/2'>
						<FeatureList />
					</div>
					<div className='w-1/2 p-8'>
						<AuthForm />
					</div>
				</div>
			</div>
		</section>
	);
};

export default LandingPage;
