import React, { useState, useEffect } from 'react';
import './BookInfo_style.scss';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import Divider from '@mui/material/Divider';
import img1 from '../../assets/Book_3.png';
import img2 from '../../assets/Book_4.png';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
	addToCart,
	addWishList,
	getAddedToCartBooks,
	removeItemFromCart,
	updateAddToCart,
	getWishList,
	removeFromWishList,
} from '../../service/DataService';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { setCartItem } from '../../redux/BookActions';

toast.configure();

const BookInfo = (props) => {
	const { book, handleStateChange } = props;
	const [presentInCart, setPresentInCart] = useState([]);
	const [viewCartCounter, setViewCartCounter] = useState(false);
	const [presentInWishList, setPresentInWishList] = useState([]);
	const [addToWishList, setAddToWishList] = useState(false);
	// Navigate to view book component by changing the state
	const handleState = () => {
		handleStateChange(false);
	};

	// get books from api
	const cartItems = () => {
		getAddedToCartBooks().then((res) => {
			let bookInCart = res.data.result.filter(
				(b) => b.product_id._id === book._id
			);
			setPresentInCart(bookInCart);
		});
	};

	// Execute cartItems method everytime book state changes
	useEffect(() => {
		getAddedToCartBooks().then((res) => {
			let bookInCart = res.data.result.filter(
				(b) => b.product_id._id === book._id
			);
			res?.data?.result[0]?.quantityToBuy !== undefined &&
				props.dispatch(setCartItem(res.data.result[0].quantityToBuy));
			setPresentInCart(bookInCart);
		});
	}, [book, props]);

	// Method to update book order quantity
	const updateQuantity = (q) => {
		let obj = {
			quantityToBuy: q,
		};
		updateAddToCart(presentInCart[0]._id, obj)
			.then((res) => {
				cartItems();
			})
			.catch((err) => console.log(err));
	};

	// Increment counter when clicked
	const incrementCounter = () => {
		let quantity = presentInCart[0].quantityToBuy + 1;
		props.dispatch({ type: 'INCREMENT_ITEM' });
		quantity <= 10 && updateQuantity(quantity);
	};

	// Decrement counter when clicked
	const decrementCounter = () => {
		let quantity = presentInCart[0].quantityToBuy - 1;
		props.dispatch({ type: 'DECREMENT_ITEM' });
		quantity > 0 && updateQuantity(quantity);
		quantity === 0 &&
			removeItemFromCart(presentInCart[0]._id)
				.then(() => {
					setPresentInCart([]);
					setViewCartCounter(false);
				})
				.catch((err) => console.warn(err));
	};

	// Display counter when clicked on.
	const handleAddToBagClick = () => {
		addToCart(book._id)
			.then((res) => {
				if (res.status === 200) {
					cartItems();
					setViewCartCounter(true);
					props.dispatch({ type: 'INCREMENT_ITEM' });
					toast.success('Book added to Cart', {
						position: toast.POSITION.TOP_CENTER,
					});
				}
			})
			.catch((err) => console.log(err));
	};

	// fetch wishlist books and save to state
	const getWishListItem = () => {
		getWishList().then((res) => {
			let bookInWishList = res.data.result.filter(
				(b) => b.product_id._id === book._id
			);
			setPresentInWishList(bookInWishList);
		});
	};

	// Add book to wishlist on click
	const handleAddToWishList = () => {
		addWishList(book._id).then((res) => {
			if (res.status === 200) {
				setAddToWishList(true);
				toast.success('Book added to wish list', {
					position: toast.POSITION.TOP_CENTER,
				});
			}
		});
		getWishListItem();
	};

	// remove book from wishlist on click
	const deleteFromWishList = () => {
		removeFromWishList(book._id)
			.then((res) => {
				if (res.status === 200) {
					setAddToWishList(false);
					toast.success('Book removed from wish list', {
						position: toast.POSITION.TOP_CENTER,
					});
				}
			})
			.catch((err) => {
				console.warn(err);
				toast.error('Something went wrong!', {
					position: toast.POSITION.TOP_CENTER,
				});
			});
		getWishListItem();
	};

	return (
		<div className='book-info-main-container'>
			<div className='book-info-middle-container'>
				<div className='book-info-header'>
					<span
						style={{
							color: '#9D9D9D',
							marginRight: '3px',
							cursor: 'pointer',
						}}
						onClick={handleState}
					>
						Home /
					</span>
					<span>{book.bookName}</span>
				</div>
				<div className='book-info-main-content'>
					<div className='book-info-left-container'>
						<div className='book-info-cover-sm-container'>
							{/* ---------- small cover img 1 --------- */}
							<div className='book-cover-sm-1'>
								<img width='45px' height='55px' src={img1} alt='' />
							</div>
							{/* ---------- small cover img 2 --------- */}
							<div className='book-cover-sm-2'>
								<img width='45px' height='55px' src={img2} alt='' />
							</div>
						</div>
						{/* ---------- cover img --------- */}
						<div className='book-info-cover-img-btn-container'>
							<div className='cover-img-lg-container'>
								<img className='large-cover-img' src={img1} alt='' />
							</div>
							{/* ----------  buttons --------- */}
							<div className='book-info-btn-container'>
								{viewCartCounter || presentInCart.length !== 0 ? (
									<div className='bookAddToBagBtnContainer'>
										<div
											className='bookAddToBagMinusBtn'
											onClick={() => decrementCounter()}
										>
											<RemoveOutlinedIcon style={{ color: '#DBDBDB' }} />
										</div>
										<div
											className='bookAddToBagCounter'
											style={{ color: '#333232' }}
										>
											{presentInCart.length !== 0
												? presentInCart[0].quantityToBuy
												: null}
										</div>
										<div
											className='bookAddToBagPlusBtn'
											onClick={() => incrementCounter()}
										>
											<AddOutlinedIcon style={{ color: '#333232' }} />
										</div>
									</div>
								) : (
									<button className='addToBagBtn' onClick={handleAddToBagClick}>
										Add to bag
									</button>
								)}
								{/* ----------  wishlist btn --------- */}
								{addToWishList || presentInWishList.length >= 1 ? (
									<button className='wishlistBtn' onClick={deleteFromWishList}>
										<DeleteOutlineOutlinedIcon /> WishList
									</button>
								) : (
									<button className='wishlistBtn' onClick={handleAddToWishList}>
										<FavoriteIcon /> <span> &nbsp; WishList</span>
									</button>
								)}
							</div>
						</div>
					</div>
					<div className='book-info-right-container'>
						<div className='book-info-show-container'>
							<div className='single-book-metadata-container'>
								<div className='single-book-name'>{book.bookName}</div>
								<div className='singleBookAuthorName'>by {book.author}</div>
								<div className='singleBookRatings'>
									<div className='singleBookRatingPoints'>
										4.5
										<StarIcon style={{ width: '15px', height: '15px' }} />
									</div>
									<div className='numOfPeopleRating'>(20)</div>
								</div>
								<div className='singleBookPriceContainer'>
									<div className='newPrice'> Rs. {book.discountPrice} </div>
									<div className='oldPrice'> Rs. {book.price} </div>
								</div>
							</div>
							<Divider style={{ color: '#9D9D9D' }} />
							<div className='singleBookDesc'>
								<div className='singleBookDescItem1'>Book Detail</div>
								<div className='singleBookDescItem2'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
									quam, voluptates odio similique reprehenderit iure expedita
									minima, magni explicabo voluptatibus incidunt! Maxime ratione
									ad, dicta expedita ab eligendi ullam non nam aperiam ipsam
									odit voluptate earum placeat odio aliquam provident iure unde
									saepe eaque. Ex, pariatur? nostrum quia aspernatur.
								</div>
							</div>
							<Divider style={{ color: '#9D9D9D' }} />
							<div className='feedbackContainer'>
								<p className='feedbackHeading'>Customer Feedback</p>
								<div className='writeFeedbackContainer'>
									<div className='ratingText'>Overall rating</div>
									<div className='ratingStarContainer'>
										<StarBorderOutlinedIcon style={{ color: '#707070' }} />
										<StarBorderOutlinedIcon style={{ color: '#707070' }} />
										<StarBorderOutlinedIcon style={{ color: '#707070' }} />
										<StarBorderOutlinedIcon style={{ color: '#707070' }} />
										<StarBorderOutlinedIcon style={{ color: '#707070' }} />
									</div>
									<textarea
										className='writeReviewTextarea'
										placeholder='Write your review'
										name=''
										id=''
										rows='3'
									></textarea>
									<button className='submitReviewBtn' type='submit'>
										Submit
									</button>
								</div>
							</div>
							<div className='allReviewsContainer'>
								<div className='reviewContainer'>
									<div className='reviewAccImgContainer'>
										<div className='reviewAccImg'> AC </div>
									</div>
									<div className='customerReviewContainer'>
										<div className='reviewCustomerName'>Aniket Chile</div>
										<div className='customerRatingsContainer'>
											<StarIcon style={{ color: '#FFCE00' }} />
											<StarIcon style={{ color: '#FFCE00' }} />
											<StarIcon style={{ color: '#FFCE00' }} />
											<StarBorderOutlinedIcon style={{ color: '#707070' }} />
											<StarBorderOutlinedIcon style={{ color: '#707070' }} />
										</div>
										<div className='customerReviewText'>
											Lorem ipsum dolor sit, amet consectetur adipisicing elit.
											Beatae perferendis totam esse perspiciatis aspernatur
											architecto quos alias, consectetur itaque obcaecati
											voluptatum maxime temporibus aperiam. Velit quos
											laudantium aperiam cum cupiditate.
										</div>
									</div>
								</div>
								<div className='reviewContainer'>
									<div className='reviewAccImgContainer'>
										<div className='reviewAccImg'> SB </div>
									</div>
									<div className='customerReviewContainer'>
										<div className='reviewCustomerName'>Sweta Bodkar</div>
										<div className='customerRatingsContainer'>
											<StarIcon style={{ color: '#FFCE00' }} />
											<StarIcon style={{ color: '#FFCE00' }} />
											<StarIcon style={{ color: '#FFCE00' }} />
											<StarIcon style={{ color: '#FFCE00' }} />
											<StarBorderOutlinedIcon style={{ color: '#707070' }} />
										</div>
										<div className='customerReviewText'>
											Lorem ipsum dolor sit, amet consectetur adipisicing elit.
											Beatae perferendis totam esse perspiciatis aspernatur
											architecto quos alias, consectetur itaque obcaecati
											voluptatum maxime temporibus aperiam. Velit quos
											laudantium aperiam cum cupiditate.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect()(BookInfo);
