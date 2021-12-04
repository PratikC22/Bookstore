import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { customerAddress } from '../../service/DataService';
import './CustomerDetails_style.scss';

// Valid Regex pattern
const validName = /^([A-Z]{1,}[a-z]{2,}[ ]?){1,4}$/;
const validMobileNumber = /^[789]\d{9}$/;
const validCity = /^[A-Z]{1}[a-z]{2,}$/;
const validState = /^[A-Z]{1}[a-z]{2,}$/;

const CustomerDetails = (props) => {
	// User states
	const [userInfo, setUserInfo] = useState({
		fullName: '',
		address: '',
		city: '',
		state: '',
		mobileNumber: '',
	});

	const [disableForm, setDisableForm] = useState(false);

	// error state
	const [errName, setErrName] = useState(false);
	const [errMobileNumber, setErrMobileNumber] = useState(false);
	const [errCity, setErrCity] = useState(false);
	const [errState, setErrState] = useState(false);
	const [errAddress, setErrAddress] = useState(false);

	// helper text state
	const [htName, setHTName] = useState(' ');
	const [htMobileNumber, setHTMobileNumber] = useState(' ');
	const [htCity, setHTCity] = useState(' ');
	const [htState, setHTState] = useState(' ');
	const [htAddress, setHTAddress] = useState(' ');

	const [showContinueBtn, setShowContinueBtn] = useState(true);
	const [showEditBtn, setShowEditBtn] = useState(false);

	// Method to change state
	const handleChange = (prop) => (event) => {
		setUserInfo({ ...userInfo, [prop]: event.target.value });
	};

	// Method to handle validation
	const handleValidation = () => {
		const checkName = validName.test(userInfo.fullName);
		const checkCity = validCity.test(userInfo.city);
		const checkState = validState.test(userInfo.state);
		const checkMobileNumber = validMobileNumber.test(userInfo.mobileNumber);

		if (checkName) {
			setErrName(false);
			setHTName(' ');
		} else {
			setErrName(true);
			setHTName('Enter Full Name');
		}

		if (checkCity) {
			setErrCity(false);
			setHTCity(' ');
		} else {
			setErrCity(true);
			setHTCity('Enter valid City');
		}

		if (checkState) {
			setErrState(false);
			setHTState(' ');
		} else {
			setErrState(true);
			setHTState('Enter valid State');
		}

		if (checkMobileNumber) {
			setErrMobileNumber(false);
			setHTMobileNumber(' ');
		} else {
			setErrMobileNumber(true);
			setHTMobileNumber('Enter valid Mobile number');
		}

		if (userInfo.address <= 5) {
			setErrAddress(true);
			setHTAddress('Enter valid Address');
		} else {
			setErrAddress(false);
			setHTAddress(' ');
		}

		return (
			checkName && checkCity && checkState && !errAddress && checkMobileNumber
		);
	};

	// Method to handle customer address
	const handleSubmit = () => {
		const isValid = handleValidation();

		const address = {
			addressType: 'Home',
			fullAddress: userInfo.address,
			city: userInfo.city,
			state: userInfo.state,
		};

		isValid &&
			customerAddress(address)
				.then((res) => {
					// console.log(res);
					setShowContinueBtn(false);
					setShowEditBtn(true);
					setDisableForm(true);
					props.listenToAddressDetails(true);
				})
				.catch((err) => console.warn(err));
	};

	// Allow customer to edit form
	const handleEdit = () => {
		props.listenToAddressDetails(false);
		setDisableForm(false);
		setShowContinueBtn(true);
		setShowEditBtn(false);
	};

	return (
		<div className='customer-details-OuterContainer'>
			<div className='customer-details-Item1'>
				<div className='customer-details-Item1Text'>Customer Details</div>
				<div className='customer-details-Item1Btn'>Add New Address</div>
			</div>
			<div className='customer-detail-Container'>
				<div className='customerBasicDetail'>
					<div className='customerFullname'>
						<InputLabel
							style={{ color: '#0A0102', font: '13px/16px Roboto' }}
							htmlFor='nameTextfield'
						>
							Full Name
						</InputLabel>
						<TextField
							fullWidth
							size='small'
							id='nameTextfield'
							error={errName}
							variant='outlined'
							onChange={handleChange('fullName')}
							disabled={disableForm}
						/>
						<FormHelperText sx={helperTextStyle}>{htName}</FormHelperText>
					</div>
					<div className='customerMobileNum'>
						<InputLabel
							style={{ color: '#0A0102', font: '13px/16px Roboto' }}
							htmlFor='mobileTextfield'
						>
							Mobile Number
						</InputLabel>
						<TextField
							disabled={disableForm}
							fullWidth
							size='small'
							id='mobileTextfield'
							error={errMobileNumber}
							variant='outlined'
							onChange={handleChange('mobileNumber')}
						/>
						<FormHelperText sx={helperTextStyle}>
							{htMobileNumber}
						</FormHelperText>
					</div>
				</div>

				<div className='customerEditAddressDetailContainer'>
					<div className='customer-details-Detail'>
						<div className='customer-details-Text'>Address</div>
						<div className='customer-details-Textarea'>
							<TextField
								disabled={disableForm}
								fullWidth
								multiline={true}
								rows={3}
								id='addresTextArea'
								error={errAddress}
								variant='outlined'
								onChange={handleChange('address')}
							/>
							<FormHelperText sx={helperTextStyle} id='addresTextArea'>
								{htAddress}
							</FormHelperText>
						</div>
						<div className='customerBasicDetail'>
							<div className='customerCity'>
								<InputLabel
									style={{ color: '#0A0102', font: '13px/16px Roboto' }}
									htmlFor='cityTextfield'
								>
									city/town
								</InputLabel>
								<TextField
									disabled={disableForm}
									fullWidth
									size='small'
									id='cityTextfield'
									error={errCity}
									variant='outlined'
									onChange={handleChange('city')}
								/>
								<FormHelperText sx={helperTextStyle} id='cityTextfield'>
									{htCity}
								</FormHelperText>
							</div>
							<div className='customerState'>
								<InputLabel
									style={{ color: '#0A0102', font: '13px/16px Roboto' }}
									htmlFor='stateTextfield'
								>
									State
								</InputLabel>
								<TextField
									disabled={disableForm}
									fullWidth
									size='small'
									id='stateTextfield'
									error={errState}
									variant='outlined'
									onChange={handleChange('state')}
								/>
								<FormHelperText sx={helperTextStyle} id='stateTextfield'>
									{htState}
								</FormHelperText>
							</div>
						</div>
						<div className='radio-btns'>
							<InputLabel
								style={{ color: '#0A0102', font: '13px/16px Roboto' }}
								htmlFor='stateTextfield'
							>
								Type
							</InputLabel>
							<div className='radio-btn-container'>
								<div className='radiobtns'>
									<span>
										<input type='radio' defaultChecked={true} /> Home
									</span>
									<span>
										<input type='radio' value='office' /> Work
									</span>
									<span>
										<input type='radio' value='other' /> Other
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='customerContinueBtnDiv'>
				{showContinueBtn ? (
					<button onClick={handleSubmit} className='customerContinueBtn'>
						CONTINUE
					</button>
				) : null}

				{showEditBtn ? (
					<button onClick={handleEdit} className='customerContinueBtn'>
						EDIT
					</button>
				) : null}
			</div>
		</div>
	);
};

const helperTextStyle = {
	height: '11px',
	font: '10px/10px Roboto',
	color: '#FF001C',
	fontWeight: 'bolder',
};

export default CustomerDetails;
