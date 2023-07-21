import React, { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers, addUser, updateUser } from '../features/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { users } = useSelector((state) => state.user);
	const [user, setUser] = useState({
		name: '',
		email: '',
		phoneNumber: '',
	});
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (!localStorage.getItem('user')) {
			navigate('/');
		}
	});

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newUser = {
			name,
			email,
			phoneNumber,
		};
		dispatch(addUser(newUser));
		setUser({
			name: '',
			email: '',
			phoneNumber: '',
		});
		setShow(false);
	};

	const handleEdit = () => {};

	const handleDelete = (id) => {
		dispatch(deleteUser(id));
	};

	const { name, email, phoneNumber } = user;

	return (
		<div className='min-h-screen bg-gray-50 py-12 sm:px-6 lg:px-8'>
			<div className='mt-5 sm:mx-auto sm:w-full sm:max-w-md'>
				<input
					type='text'
					placeholder='Search...'
					className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md'
				/>
				<div className='flex justify-between'>
					<button
						className='w-[150px] bg-blue-500 text-[#fff] h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer'
						onClick={() => setShow(true)}>
						Add User
					</button>
				</div>
				{/* Add User Modal */}
				{show && (
					<div className='w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen'>
						<div className='w-[75%] 800px:w-[40%] min-h-[50vh] bg-white rounded shadow p-5'>
							<div className='w-full flex justify-end cursor-pointer'>
								<RxCross1 size={25} onClick={() => setShow(false)} />
							</div>
							<h3 className='text-[25px] text-center py-5 font-Poppins text-[#000000cb]'>Add User</h3>
							<form onSubmit={handleSubmit}>
								<div className='my-5 w-[92%] m-auto h-[40px relative]'>
									<input
										type='text'
										placeholder='name'
										className='h-[40px] w-full px-2 border-[#3957db] border-[2px] mb-2 rounded-md'
										name='name'
										required
										value={name}
										onChange={handleChange}
									/>
									<br />
									<input
										type='email'
										placeholder='email'
										name='email'
										required
										value={email}
										onChange={handleChange}
										className='h-[40px] w-full px-2 border-[#3957db] border-[2px] mb-2 rounded-md'
									/>

									<br />
									<input
										type='tel'
										placeholder='mobile'
										className='h-[40px] w-full px-2 border-[#3957db] border-[2px] mb-2 rounded-md'
										value={phoneNumber}
										name='phoneNumber'
										required
										onChange={handleChange}
									/>
									<br />
								</div>
								<div className='w-full flex items-center justify-center'>
									<button
										className='w-[150px] bg-black my-3 flex items-center justify-center rounded-xl cursor-pointer text-white text-[18px] !h-[42px] mr-4'
										onClick={() => setShow(false)}>
										cancel
									</button>
									<button
										className='w-[150px] bg-black  my-3 flex items-center justify-center rounded-xl cursor-pointer text-white text-[18px] !h-[42px] mr-4'
										type='submit'>
										confirm
									</button>
								</div>
							</form>
						</div>
					</div>
				)}

				<table className='border-collapse border border-red-400'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone Number</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((d) => (
							<tr key={d._id} className=''>
								<td>{d.name}</td>
								<td>{d.email}</td>
								<td>{d.phoneNumber}</td>
								<td className='flex'>
									<AiFillEdit color='blue' onClick={() => handleEdit(d)} />
									<AiFillDelete color='red' onClick={() => handleDelete(d._id)} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Dashboard;
