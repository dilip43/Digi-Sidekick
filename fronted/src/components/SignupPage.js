import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [visible, setVisible] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		await axios
			.post('http://localhost:8000/api/v1/admin/create-admin', {
				name,
				email,
				password,
			})
			.then((res) => {
				toast.success(res.data.message);
				setName('');
				setEmail('');
				setPassword('');
			})
			.catch((error) => {
				toast.error(error.response?.data.message);
			});
	};

	return (
		<div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Register as a new Admin</h2>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 '>
					<form className='space-y-6' onSubmit={handleSubmit}>
						<div>
							<label htmlFor='name' className='block text-sm font-medium text-gray-900'>
								Full Name
							</label>
							<div className='mt-1'>
								<input
									type='text'
									id='name'
									name='name'
									autoComplete='name'
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='email' className='block text-sm font-medium text-gray-700'>
								Email address
							</label>
							<div className='mt-1'>
								<input
									id='email'
									type='email'
									name='email'
									autoComplete='email'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
								Password
							</label>
							<div className='mt-1 relative'>
								<input
									type={visible ? 'text' : 'password'}
									id='password'
									name='password'
									autoComplete='current-password'
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
								/>
								{visible ? (
									<AiOutlineEye
										className='absolute right-2 top-2 cursor-pointer'
										size={25}
										onClick={() => setVisible(false)}
									/>
								) : (
									<AiOutlineEyeInvisible
										className='absolute right-2 top-2 cursor-pointer'
										size={25}
										onClick={() => setVisible(true)}
									/>
								)}
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'>
								Submit
							</button>
						</div>

						<div className='flex items-center w-full'>
							<h4>Already have an account?</h4>
							<Link to='/' className='text-blue-600 pl-2'>
								Sign In
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
