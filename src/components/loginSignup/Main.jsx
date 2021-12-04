import React, { useState } from 'react';
import './Main_style.scss';
import cartImage from '../../assets/onlineBookShopping.png';
import Signup from './Signup';
import Login from './Login';

const Main = () => {
	const [isSignup, setIsSignup] = useState(false);

	return (
		<div
			className={
				isSignup
					? 'main-container main-container-signup-background'
					: 'main-container main-container-login-background'
			}
		>
			<div className='main-inner-container'>
				<div className='online-book-shopping'>
					{/* ------------ Cart image ------------ */}
					<div className='online-book-shopping-img'>
						<img src={cartImage} alt='logo' />
					</div>

					{/* ------------ Text ------------ */}
					<div className='online-book-shopping-text'>ONLINE BOOK SHOPPING</div>
				</div>

				{/* ------------ Set condition to Conditionally render Login and Signup component ------------ */}
				<div className='login-signup-container'>
					<div className='login-signup-inner-container'>
						<div className='login-signup'>
							<div
								className={isSignup ? 'login' : 'signup'}
								onClick={() => setIsSignup(false)}
							>
								LOGIN
								<div className={!isSignup ? 'bottom-border' : null}>
									<span className='bm-span'></span>
								</div>
							</div>
							<div
								className={isSignup ? 'signup' : 'login'}
								onClick={() => setIsSignup(true)}
							>
								SIGNUP
								<div className={isSignup ? 'bottom-border' : null}>
									<span className='bm-span'></span>
								</div>
							</div>
						</div>

						{/* ------------ Conditionally render Login and Signup component ------------ */}
						<div className='login-signup-component'>
							{isSignup ? (
								<Signup setIsSignup={setIsSignup} />
							) : (
								<Login setIsSignup={setIsSignup} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
