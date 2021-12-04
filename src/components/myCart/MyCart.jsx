import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {
	getAddedToCartBooks,
	removeItemFromCart,
	updateAddToCart,
} from '../../service/DataService';
import { useHistory } from 'react-router';
import CustomerDetails from '../customerDetails/CustomerDetails';
import Order from '../order/Order';
import './MyCart.scss';
import { connect } from 'react-redux';
import { setCartItem } from '../../redux/BookActions';

const MyCart = (props) => {
	const [cart, setCart] = useState([]);
	const [showAddress, setShowAddress] = useState(false);
	const [showOrder, setShowOrder] = useState(false);
	const history = useHistory();

	const handleRemoveClick = (bookId) => {
		removeItemFromCart(bookId)
			.then(() => {
				cartItems();
				props.dispatch(setCartItem(0));
			})
			.catch((err) => console.log(err));
	};

	// Decrease books added to cart
	const decrementQuantityToCart = (book) => {
		let quantity = book.quantityToBuy - 1;
		if (quantity > 0) {
			updateCartItemQuantity(book, quantity);
			props.dispatch({ type: 'DECREMENT_ITEM' });
		} else if (quantity === 0) {
			handleRemoveClick(book._id);
		}
	};

	// Increase books added to cart
	const incrementQuantityToCart = (book) => {
		let quantity = book.quantityToBuy + 1;
		if (quantity <= 10) {
			updateCartItemQuantity(book, quantity);
			props.dispatch({ type: 'INCREMENT_ITEM' });
		}
	};

	// Method to update book order quantity
	const updateCartItemQuantity = (book, quantity) => {
		let obj = {
			quantityToBuy: quantity,
		};
		updateAddToCart(book._id, obj)
			.then((res) => {
				cartItems();
			})
			.catch((err) => console.log(err));
	};

	// get books from api
	const cartItems = () => {
		getAddedToCartBooks()
			.then((res) => {
				const data = res.data.result;
				setCart(data);
			})
			.catch((err) => console.log(err));
	};

	//Navigate to home
	const handleClick = () => {
		history.push('/home');
	};

	// Execute cartItems method
	useEffect(() => {
		cartItems();
	}, []);

	const handleShowOrder = (bool) => {
		setShowOrder(bool);
	};

	const handlePlaceOrder = () => {
		setShowAddress(true);
	};

	return (
		<div>
			<Header />
			<div className='my-cart-main-container'>
				<div className='my-cart-page-container'>
					<div className='my-cart-header'>
						<span
							style={{
								color: '#9D9D9D',
								marginRight: '3px',
								cursor: 'pointer',
							}}
							onClick={handleClick}
						>
							Home /
						</span>
						<span>My cart</span>
					</div>
					<div className='my-cart-content'>
						<div className='my-cart-container'>
							<div className='my-cart-item-1'>
								<div className='my-cart-item-1-text'>
									My cart ({cart.length}){' '}
								</div>
								<div className='my-cart-item-1-location'>
									<div className='my-cart-item-1-icon-text'>
										<LocationOnIcon style={{ color: '#A03037' }} />
										<div className='my-cart-item-1-address'>
											Use current Location
										</div>
									</div>
									<ArrowDropDownOutlinedIcon
										style={{ color: '#DCDCDC', cursor: 'pointer' }}
									/>
								</div>
							</div>

							{cart.map((book) => {
								return (
									<div key={book._id} className='my-cart-item-2'>
										<div className='my-cart-item-2-1'>
											<div className='my-cart-item-2-1Image'></div>
											<div className='my-cart-Item2-2BookInfo'>
												<div className='my-cart-Item2-2BookName'>
													{book.product_id.bookName}
												</div>
												<div className='my-cart-Item2-2BookAuthor'>
													by {book.product_id.author}
												</div>
												<div className='my-cart-Item2-2BookPrice'>
													<div className='my-cart-Item2-2NewPrice'>
														Rs. {book.product_id.discountPrice}
													</div>
													<div className='my-cart-Item2-2OldPrice'>
														Rs. {book.product_id.price}
													</div>
												</div>
											</div>
										</div>
										<div className='my-cart-Item2-2'>
											<div className='my-cart-Item2-2BookQuantity'>
												<div
													className='bookQuantityMinus'
													onClick={() => decrementQuantityToCart(book)}
												>
													<RemoveOutlinedIcon
														style={{
															width: '100%',
															height: '100%',
															color: '#DBDBDB',
														}}
													/>
												</div>
												<div className='bookQuantityNumber'>
													{book.quantityToBuy}
												</div>
												<div
													className='bookQuantityAdd'
													onClick={() => incrementQuantityToCart(book)}
												>
													<AddOutlinedIcon
														style={{
															width: '100%',
															height: '100%',
															color: '#333232',
														}}
													/>
												</div>
												<div
													className='bookRemove'
													onClick={() => handleRemoveClick(book._id)}
												>
													Remove
												</div>
											</div>
										</div>
									</div>
								);
							})}

							{cart.length >= 1 ? (
								<div className='my-cart-Item3'>
									<div className='my-cart-Item3Buttondiv'>
										<button
											className='my-cart-Item3Button'
											onClick={handlePlaceOrder}
										>
											PLACE ORDER
										</button>
									</div>
								</div>
							) : null}
						</div>
						{showAddress ? (
							<CustomerDetails listenToAddressDetails={handleShowOrder} />
						) : (
							<div className='addressDetailsContainer'>Address Details</div>
						)}

						{showOrder ? (
							<Order cart={cart} />
						) : (
							<div className='orderSummaryContainer'>Order Summary</div>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export { MyCart };

export default connect()(MyCart);
