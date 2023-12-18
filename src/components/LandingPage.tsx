import React from "react";
import FeatureList from "./FeatureList";
import AuthForm from "./AuthForm";

const LandingPage: React.FC = () => {
	return (
		<section className='w-full flex justify-center'>
			<div className='justify-center w-full max-w-[1140px]'>
				<div className='flex w-full flex-wrap py-8'>
					<div className='w-1/2'>
						<FeatureList />
					</div>
					<div className='w-1/2'>
						<AuthForm />
					</div>
				</div>
			</div>
		</section>
	);
};

export default LandingPage;
