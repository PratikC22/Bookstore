import React, { useState, useEffect } from 'react';
import './WishList_style.scss';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useHistory } from 'react-router';
import { getWishList, removeFromWishList } from '../../service/DataService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const WishList = () => {
	const history = useHistory();
	const [wishList, setWishList] = useState([]);
	const [watchState, setWatchState] = useState(false);

	// Navigate to home
	const handleClick = () => {
		history.push('/home');
	};

	// Get all books from wish list
	const wishListItems = () => {
		getWishList()
			.then((res) => {
				setWishList(res.data.result);
			})
			.catch((err) => console.warn(err));
	};

	// Get all books when component renders
	useEffect(() => {
		wishListItems();
	}, [watchState]);

	// Remove book from wish list
	const removeBook = (bookId) => {
		removeFromWishList(bookId)
			.then(() => {
				setWatchState(!watchState);
			})
			.catch((err) => {
				console.log(err);
				toast.error('Something went wrong!', {
					position: toast.POSITION.TOP_CENTER,
				});
			});
	};

	return (
		<div>
			<Header />
			<div className='wish-list-main-container'>
				<div className='wish-list-inner-container'>
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
						<span>My WishList</span>
					</div>
					<div className='wish-list-heading'>
						My WishList ( {wishList.length} )
					</div>
					<div className='wish-list-display-all'>
						{wishList.map((book) => (
							<div key={book._id} className='wishlistSingleBookContainer'>
								<div className='wishlistImgAndInfoContainer'>
									<div className='wishlistBookImgContainer'>
										<div className='wishlistBookImg'></div>
									</div>
									<div className='wishlistBookInfoContainer'>
										<div className='wishlistBookName'>
											{book.product_id.bookName}
										</div>
										<div className='wishlistBookAuthor'>
											by {book.product_id.author}
										</div>
										<div className='wishlistBookPriceContainer'>
											<div className='wishlistBookNewPrice'>
												Rs. {book.product_id.discountPrice}
											</div>
											<div className='wishlistBookOldPrice'>
												Rs. {book.product_id.price}
											</div>
										</div>
									</div>
								</div>
								<div className='wishlistButtonsContainer'>
									<div
										className='removeFromWishlistBtn'
										onClick={() => removeBook(book.product_id._id)}
									>
										<DeleteOutlineOutlinedIcon
											style={{ width: '100%', height: '100%' }}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<br />
			<Footer />
		</div>
	);
};

export default WishList;
