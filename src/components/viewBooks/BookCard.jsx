import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import './BookCard_style.scss';
import bookCover1 from '../../assets/Book_1.png';
import bookCover2 from '../../assets/Book_2.png';
import bookCover3 from '../../assets/Book_3.png';
import bookCover4 from '../../assets/Book_4.png';
import bookCover5 from '../../assets/Book_5.png';
import bookCover6 from '../../assets/Book_6.png';
import bookCover7 from '../../assets/Book_7.png';
import bookCover8 from '../../assets/Book_8.png';
import bookCover9 from '../../assets/Book_9.png';

export const coverArr = [
	bookCover1,
	bookCover2,
	bookCover3,
	bookCover4,
	bookCover5,
	bookCover6,
	bookCover7,
	bookCover8,
	bookCover9,
];

const BookCard = ({ book, index, handleStateChange, handleSetTestBook }) => {
	const cover = index % coverArr.length;

	const handleState = () => {
		handleStateChange(true);
	};

	const sendBookToBookInfo = () => {
		handleSetTestBook(book);
	};

	return (
		<div
			className='book-card'
			onClick={() => {
				handleState();
				sendBookToBookInfo();
			}}
		>
			<div className='book-img-container'>
				<img
					src={coverArr[cover]}
					alt='book-cover'
					height='135px'
					width='105px'
				/>
			</div>
			<div className='book-info-container'>
				<div className='book-name'>{book.bookName}</div>
				<div className='book-author-name'>{book.author}</div>
				<div className='book-rating'>
					<div className='book-rating-points'>
						4.5 <StarIcon sx={iconStyle} />
					</div>
					<div className='people-rating'>(20)</div>
				</div>
				<div className='book-price-container'>
					<div className='new-price'>Rs. {book.discountPrice}</div>
					<div className='old-price'>Rs. {book.price}</div>
				</div>
			</div>
		</div>
	);
};

const iconStyle = {
	width: '13px',
	height: '13px',
};

export default BookCard;
