import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const defaultValue = {
	first_name: '',
	last_name: '',
	birthday: '',
	email: '',
	password: '',
};

const UsersForm = ({
	getAllUsers,
	updateInfo,
	setUpdateInfo,
	handleCloseForm,
}) => {
	useEffect(() => {
		if (updateInfo) {
			reset(updateInfo);
		}
	}, [updateInfo]);

	const createUser = (data) => {
		const URL = 'https://users-crud1.herokuapp.com/users/';
		axios
			.post(URL, data)
			.then((res) => {
				console.log(res.data);
				getAllUsers();
			})
			.catch((err) => console.log(err));
	};

	const updateUser = (data) => {
		const URL = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`;
		axios
			.patch(URL, data)
			.then((res) => {
				console.log(res.data);
				getAllUsers();
			})
			.catch((err) => console.log(err));
	};

	const { register, reset, handleSubmit } = useForm();

	const submit = (data) => {
		if (updateInfo) {
			//update
			updateUser(data);
			setUpdateInfo();
		} else {
			//create user
			createUser(data);
		}
		reset(defaultValue);
		handleCloseForm();
	};

	return (
		<div className="form-container">
			<form onSubmit={handleSubmit(submit)} className="form">
				<div onClick={handleCloseForm} className="form__x">
					X
				</div>
				<h2 className="form__title">
					{updateInfo ? 'Update User' : 'New User'}
				</h2>
				<ul className="form__list">
					<li className="form__item">
						<label htmlFor="first_name">
							<span className="form__span">Name</span>
						</label>
						<input
							className="form__input"
							{...register('first_name')}
							type="text"
							id="first_name"
						/>
					</li>
					<li className="form__item">
						<label htmlFor="last_name">Last Name:</label>
						<input
							className="form__input"
							{...register('last_name')}
							type="text"
							id="last_name"
						/>
					</li>
					<li className="form__item">
						<label htmlFor="birthday">Birthday:</label>
						<input {...register('birthday')} type="date" id="birthday" />
					</li>
					<li className="form__item">
						<label htmlFor="email">Email:</label>
						<input {...register('email')} type="email" id="email" />
					</li>
					<li className="form__item">
						<label htmlFor="password">Password:</label>
						<input {...register('password')} type="password" id="password" />
					</li>
				</ul>
				<button className="form__btn">
					{updateInfo ? 'Update User' : 'Create New User'}
				</button>
			</form>
		</div>
	);
};

export default UsersForm;
