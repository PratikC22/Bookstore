import React from 'react';
import BookCard from './BookCard';
import Spinner from '../ui/Spinner';
import Footer from '../footer/Footer';
import './ViewBooks_style.scss';
import DropDown from '../ui/DropDown';
import { connect } from 'react-redux';

const ViewBooks = (props) => {
	if (props.books.length === 0) return <Spinner />;

	return (
		<div>
			<div className='view-books-container'>
				<div className='view-books-inner-container'>
					<div className='view-books-header'>
						<div className='view-books-header-text'>
							Books{' '}
							<span className='view-num-books'>
								({props.books.length} items)
							</span>
						</div>
						<div className='sort-select'>
							<DropDown
								sortByRelevance={props.sortByRelevance}
								sortByName={props.sortByName}
								sortByPrice={props.sortByPrice}
							/>
						</div>
					</div>
					<div className='map-book-card'>
						{props.books.map((book, index) => (
							<BookCard
								key={book._id}
								index={index}
								book={book}
								handleStateChange={props.handleStateChange}
								handleSetTestBook={props.handleSetTestBook}
							/>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		books: state.bookReducer.books,
	};
};

export { ViewBooks };

export default connect(mapStateToProps)(ViewBooks);
