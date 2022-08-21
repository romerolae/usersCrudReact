import React from 'react';
import axios from 'axios';
const UserList = ({ user, getAllUsers, setUpdateInfo, handleOpenForm }) => {
	const deleteUser = () => {
		const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`;
		axios
			.delete(URL)
			.then((res) => {
				console.log(res.data);
				getAllUsers();
			})
			.catch((err) => console.log(err));
	};

	const handleUpdateClick = () => {
		handleOpenForm();
		setUpdateInfo(user);
	};

	return (
		<article className="card">
			<ul className="card__list">
				<li className="card__item">
					Full Name:
					<span className="card__span">{`${user['first_name']} ${user['last_name']}`}</span>
				</li>
				<li className="card__item">
					Birthday: <span className="card__span">{user.birthday}</span>
				</li>
				<li className="card__item">
					Email address: <span className="card__span">{user.email}</span>
				</li>
			</ul>
			<div className="card__footer">
				<div className="card__btn" onClick={handleUpdateClick}>
					<i title="Edit user" className="fa-solid fa-user-pen"></i>
				</div>
				<div className="card__btn" onClick={deleteUser}>
					<i title="Delete user" className="fa-regular fa-trash-can"></i>
				</div>
			</div>
		</article>
	);
};

export default UserList;
