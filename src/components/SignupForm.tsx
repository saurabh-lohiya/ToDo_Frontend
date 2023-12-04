import React from "react";

const SignupForm: React.FC = () => {
	return (
		<div className='bg-white p-8 rounded shadow-md'>
			<h2 className='text-2xl font-semibold mb-4'>Sign Up</h2>
			<form>
				<div className='mb-4'>
					<label
						htmlFor='email'
						className='block text-gray-600 text-sm font-medium mb-2'>
						Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						placeholder='Your email'
						className='w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300'
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='password'
						className='block text-gray-600 text-sm font-medium mb-2'>
						Password
					</label>
					<input
						type='password'
						id='password'
						name='password'
						placeholder='Your password'
						className='w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300'
						required
					/>
				</div>
				<button
					type='submit'
					className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignupForm;
