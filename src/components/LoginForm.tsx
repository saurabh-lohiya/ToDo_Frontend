import React from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "../svgs/Google";
import AppleIcon from "../svgs/AppleIcon";
import { IAuthForm } from "./const";

const LoginForm: React.FC<IAuthForm> = (props) => {
	return (
		<div className='bg-white p-8 rounded-lg shadow-md text-start w-full border-[1px]'>
			<p className='text-2xl font-semibold'>Sign In With</p>
			<div className='flex justify-between w-full mt-6'>
				<button className='flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
					<GoogleIcon />
					<span>Sign in with Google</span>
				</button>
				<button className='flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
					<AppleIcon />
					<span>Sign in with Apple</span>
				</button>
			</div>
			<div className='flex w-full space-x-6 items-center mt-5'>
				<div className='border-[1px] flex-1 h-0'></div>
				<p className=''>or</p>
				<div className='border-[1px] flex-1 h-0'></div>
			</div>
			<div className='mt-4'>
				<form>
					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block text-gray-600 text-sm font-medium mb-2'>
							Your email
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
						className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-4'>
						Sign In
					</button>
				</form>
			</div>
			<p className='mt-4'>
				New to our platform?{" "}
				<Link
					to=''
					className='text-blue-600'
					onClick={() => props.toggleShowLoginForm(false)}>
					Sign Up here{" "}
				</Link>
			</p>
		</div>
	);
};

export default LoginForm;
