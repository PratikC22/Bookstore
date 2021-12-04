import React, { useState } from 'react';
import {
	InputLabel,
	TextField,
	Button,
	FormHelperText,
	IconButton,
	OutlinedInput,
	InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Signup_style.scss';
import { requestSignup } from '../../service/UserService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const validName = /^([A-Z]{1,}[a-z]{2,}[ ]?){1,4}$/;

const validEmail =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validPassword =
	/^(?=.*[A-Z])(?=.*[a-z])(?=[^!@#$%^&+=]*[!@#$%^&+=][^!@#$%^&+=]*$)(?=.*[0-9]).{8,}$/;

const validMobileNumber = /^[789]\d{9}$/;

// Signup component
const Signup = ({ setIsSignup }) => {
	// UseState hook with user info
	const [userInfo, setUserInfo] = useState({
		fullName: '',
		email: '',
		password: '',
		mobileNumber: '',
	});

	const [errName, setErrName] = useState(false);
	const [errEmail, setErrEmail] = useState(false);
	const [errPassword, setErrPassword] = useState(false);
	const [errMobileNumber, setErrMobileNumber] = useState(false);

	const [htName, setHTName] = useState(' ');
	const [htEmail, setHTEmail] = useState(' ');
	const [htPassword, setHTPassword] = useState(' ');
	const [htMobileNumber, setHTMobileNumber] = useState(' ');

	// Method to change state
	const handleChange = (prop) => (event) => {
		setUserInfo({ ...userInfo, [prop]: event.target.value });
	};

	const [values, setValues] = useState({
		showPassword: false,
	});

	// Toggle show password
	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	// Prevent default execution
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	// Method to handle validation
	const handleValidation = () => {
		const checkName = validName.test(userInfo.fullName);
		const checkEmail = validEmail.test(userInfo.email);
		const checkPassword = validPassword.test(userInfo.password);
		const checkMobileNumber = validMobileNumber.test(userInfo.mobileNumber);

		if (checkName) {
			setErrName(false);
			setHTName(' ');
		} else {
			setErrName(true);
			setHTName('Enter Full Name');
		}

		if (checkEmail) {
			setErrEmail(false);
			setHTEmail(' ');
		} else {
			setErrEmail(true);
			setHTEmail('Enter valid email');
		}

		if (checkPassword) {
			setErrPassword(false);
			setHTPassword(' ');
		} else {
			setErrPassword(true);
			setHTPassword('Enter valid password');
		}

		if (checkMobileNumber) {
			setErrMobileNumber(false);
			setHTMobileNumber(' ');
		} else {
			setErrMobileNumber(true);
			setHTMobileNumber('Enter valid Mobile number');
		}

		return checkName && checkEmail && checkPassword && checkMobileNumber;
	};

	// Method to handle user signup
	const handleSignup = (e) => {
		e.preventDefault();
		const isValid = handleValidation();

		const user = {
			fullName: userInfo.fullName,
			email: userInfo.email,
			password: userInfo.password,
			phone: userInfo.mobileNumber,
		};

		isValid
			? requestSignup(user)
					.then((res) => {
						console.log(res);
						res.status === 200 &&
							toast.success(
								'You have successfully Signed up!, Please check your email.',
								{
									position: toast.POSITION.TOP_CENTER,
								}
							);
						setIsSignup(false);
					})
					.catch((err) => console.warn(err))
			: console.log('Invalid input');
	};

	return (
		<div className='signup-form'>
			<form onSubmit={(e) => handleSignup(e)}>
				{/* ------------ Full Name ------------ */}
				<div className='full-name'>
					<InputLabel sx={labelStyle} className='input-label'>
						Full Name
					</InputLabel>
					<TextField
						className='Text-field'
						fullWidth
						size='small'
						variant='outlined'
						value={userInfo.fullName}
						error={errName}
						onChange={handleChange('fullName')}
					/>
					<FormHelperText sx={helperTextStyle}>{htName}</FormHelperText>
				</div>

				{/* ------------ Email ------------ */}
				<div className='email'>
					<InputLabel sx={labelStyle} className='input-label'>
						Email
					</InputLabel>
					<TextField
						className='Text-field'
						fullWidth
						size='small'
						variant='outlined'
						value={userInfo.email}
						onChange={handleChange('email')}
						error={errEmail}
					/>
					<FormHelperText sx={helperTextStyle}>{htEmail}</FormHelperText>
				</div>

				{/* ------------ Password ------------ */}
				<div className='password'>
					<InputLabel sx={labelStyle} className='input-label'>
						Password
					</InputLabel>
					<OutlinedInput
						className='Text-field'
						type={values.showPassword ? 'text' : 'password'}
						size='small'
						fullWidth
						id='adornment-password'
						helpertext={htPassword}
						error={errPassword}
						variant='outlined'
						value={userInfo.password}
						onChange={handleChange('password')}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge='end'
								>
									{values.showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
					<FormHelperText sx={helperTextStyle} id='nameTextfield'>
						{htPassword}
					</FormHelperText>
				</div>

				{/* ------------ Mobile Number ------------ */}
				<div className='mobile-number'>
					<InputLabel sx={labelStyle} className='input-label'>
						Mobile Number
					</InputLabel>
					<TextField
						className='Text-field'
						fullWidth
						size='small'
						id='nameTextfield'
						variant='outlined'
						value={userInfo.mobileNumber}
						onChange={handleChange('mobileNumber')}
						error={errMobileNumber}
					/>
					<FormHelperText sx={helperTextStyle} id='nameTextfield'>
						{htMobileNumber}
					</FormHelperText>
				</div>

				{/* ------------ Signup button ------------ */}
				<div className='signup-btn'>
					<Button
						fullWidth
						style={{ backgroundColor: '#A03037', borderRadius: '3px' }}
						variant='contained'
						// onClick={handleSignup}
						type='submit'
					>
						Signup
					</Button>
				</div>
			</form>
		</div>
	);
};

const labelStyle = {
	fontSize: '11px',
	fontWeight: 'Bolder',
	color: '#0A0102',
};

const helperTextStyle = {
	height: '11px',
	font: '10px/10px Roboto',
	color: '#FF001C',
	fontWeight: 'bolder',
};

export default Signup;
