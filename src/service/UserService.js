import axios from 'axios';

export const requestSignup = async (obj) => {
	return await axios.post(
		'https://new-bookstore-backend.herokuapp.com/bookstore_user/registration',
		obj
	);
};

export const requestLogin = async (obj) => {
	let response = await axios.post(
		'https://new-bookstore-backend.herokuapp.com/bookstore_user/login',
		obj
	);
	localStorage.setItem('accessToken', response.data.result.accessToken);
	return response;
};
