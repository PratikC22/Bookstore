import React from 'react';
import './OrderPlaced.scss';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Button } from '@mui/material';
import { useHistory } from 'react-router';

const OrderPlaced = () => {
	const history = useHistory();

	// Navigate to home on click
	const handleClick = () => history.push('/home');

	return (
		<div>
			<Header />
			<div className='order-placed-main-container'>
				<div className='order-placed-inner-container'>
					{/* ------- Heading ------- */}
					<div className='op-img-heading'>
						<div className='op-img-1'></div>
						<p className='op-heading'>Order Placed Successfully</p>
						<div className='op-img-2'></div>
					</div>

					{/* ------- order placed text ------- */}
					<div className='order-placed-content'>
						<div className='order-placed-content-text'>
							hurray!!! your order is confirmed <br /> the order id is #123456
							save the order id for further communication..
						</div>
					</div>

					{/* ------- order placed table ------- */}
					<div className='placeOrderDetailsContainer'>
						<div className='placeOrderDetailsHead'>
							<div className='placeOrderDetailsHeadText'>Email us</div>
							<div className='placeOrderDetailsHeadText'>Contact us</div>
							<div className='placeOrderDetailsHeadText'>Address</div>
						</div>
						<div className='placeOrderDetailsInfo'>
							<div className='placeOrderDetailsInfoText'>
								admin@bookstore.com
							</div>
							<div className='placeOrderDetailsInfoText'>+91 8163475881</div>
							<div className='placeOrderDetailsInfoText'>
								42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near
								Kumarakom restaurant, HSR Layout, Bangalore 560034
							</div>
						</div>
					</div>
					<div className='continue-shopping'>
						<Button
							sx={{ width: '200px', height: '35px' }}
							variant='contained'
							onClick={handleClick}
						>
							Continue Shopping
						</Button>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default OrderPlaced;
