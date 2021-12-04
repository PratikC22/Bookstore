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
import './Login_style.scss';
import { requestLogin } from '../../service/UserService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

toast.configure();

const validEmail =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validPassword =
	/^(?=.*[A-Z])(?=.*[a-z])(?=[^!@#$%^&+=]*[!@#$%^&+=][^!@#$%^&+=]*$)(?=.*[0-9]).{8,}$/;

// Login component
const Login = () => {
	const [loginInfo, setLoginInfo] = useState({
		email: '',
		password: '',
	});

	const [errEmail, setErrEmail] = useState(false);
	const [errPassword, setErrPassword] = useState(false);
	const [htEmail, setHTEmail] = useState(' ');
	const [htPassword, setHTPassword] = useState(' ');

	// Method to change state
	const handleChange = (input) => (event) => {
		setLoginInfo({ ...loginInfo, [input]: event.target.value });
	};

	// Show password useState hook
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
		const checkEmail = validEmail.test(loginInfo.email);
		const checkPassword = validPassword.test(loginInfo.password);

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

		return checkEmail && checkPassword;
	};

	// useHistory Hook
	let history = useHistory();

	// Method to handle signin
	const handleSignIn = () => {
		const isValid = handleValidation();
		let user = {
			email: loginInfo.email,
			password: loginInfo.password,
		};

		isValid
			? requestLogin(user)
					.then((res) => {
						console.log(res);
						history.push('/home');
					})
					.catch((err) => {
						console.warn(err);
						toast.error('Something went wrong!', {
							position: toast.POSITION.TOP_CENTER,
						});
					})
			: console.log('Invalid input');
	};

	return (
		<div className='login-form'>
			{/* ------------ Email ------------ */}
			<div className='login-username-container'>
				<InputLabel sx={labelStyle}>Email</InputLabel>
				<TextField
					autoFocus
					className='username-text'
					fullWidth
					size='small'
					id='textfield'
					variant='outlined'
					error={errEmail}
					onChange={handleChange('email')}
				/>
				<FormHelperText sx={helperTextStyle} id='textfield'>
					{htEmail}
				</FormHelperText>
			</div>

			{/* ------------ Password ------------ */}
			<div className='login-password-container'>
				<InputLabel sx={labelStyle} htmlFor='adornment-password'>
					Password
				</InputLabel>
				<OutlinedInput
					className='password-field'
					type={values.showPassword ? 'text' : 'password'}
					size='small'
					fullWidth
					id='adornment-password'
					helpertext={htPassword}
					error={errPassword}
					variant='outlined'
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
				<FormHelperText
					style={{
						height: '13px',
						font: '10px/10px Roboto',
						color: '#FF001C',
						fontWeight: 'bolder',
					}}
					id='adornment-password'
				>
					{htPassword}
				</FormHelperText>
			</div>

			{/* ------------ Forgot password link ------------ */}
			<div className='login-forgot-pass' style={fgtPassStyle}>
				<span className='fgt-pass'>forgot password?</span>
			</div>

			<br />

			{/* ------------ Login button ------------ */}
			<div className='login-btn'>
				<Button
					fullWidth
					style={{ backgroundColor: '#A03037', borderRadius: '3px' }}
					variant='contained'
					onClick={handleSignIn}
				>
					Login
				</Button>
			</div>

			{/* ------------ OR Divider ------------ */}
			<div className='divider-div1'>
				<div className='divider-div2'></div>
				<span className='divider-span'> OR </span>
				<div className='divider-div3'></div>
			</div>

			{/* ------------ Login options ------------ */}
			<div className='login-options'>
				<div className='facebook-login-btn'>
					<Button
						style={{
							backgroundColor: '#4266B2',
							borderRadius: '3px',
							width: '100%',
						}}
						variant='contained'
					>
						Facebook
					</Button>
				</div>
				<div className='google-login-btn'>
					<Button
						style={{
							backgroundColor: '#F5F5F5',
							borderRadius: '3px',
							color: '#0A0102',
							width: '100%',
						}}
						variant='contained'
					>
						Google
					</Button>
				</div>
			</div>
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

const fgtPassStyle = {
	height: '11px',
	font: '11px/10px Roboto',
	color: '#382b2b',
	fontWeight: 'bolder',
};

export default Login;
