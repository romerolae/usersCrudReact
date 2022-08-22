import { useState } from 'react';
import axios from 'axios';

import './App.css';
import { useEffect } from 'react';
import UserList from './components/UserList';
import UsersForm from './components/UsersForm';

function App() {
	const [users, setUsers] = useState();
	const [updateInfo, setUpdateInfo] = useState();
	const [isFormOpen, setIsFormOpen] = useState(false);

	const getAllUsers = () => {
		const URL = 'https://users-crud1.herokuapp.com/users/';
		axios
			.get(URL)
			.then((res) => setUsers(res.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	const handleOpenForm = () => setIsFormOpen(true);
	const handleCloseForm = () => setIsFormOpen(false);

	return (
		<div className="App">
			<img src="/img/AFBannerReact_1920x500.png" alt="" className="main__img" />
			<h1 className="main__title">USERS CRUD</h1>
			<div className="create__btn">
				<i class="fa-regular fa-address-card"> </i>
				<button title="Create a new user" onClick={handleOpenForm}>
					ADD NEW USER
				</button>
			</div>
			<div className={isFormOpen ? 'form-container' : 'form-none'}>
				<UsersForm
					getAllUsers={getAllUsers}
					updateInfo={updateInfo}
					setUpdateInfo={setUpdateInfo}
					handleCloseForm={handleCloseForm}
				/>
			</div>
			<div className="card-container">
				{users?.map((user) => (
					<UserList
						key={user.id}
						user={user}
						getAllUsers={getAllUsers}
						setUpdateInfo={setUpdateInfo}
						handleOpenForm={handleOpenForm}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
