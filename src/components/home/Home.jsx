import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import BookInfo from '../viewBooks/BookInfo';
import ViewBooks from '../viewBooks/ViewBooks';
import { fetchBooks } from '../../redux/BookActions';
import { connect } from 'react-redux';

const Home = (props) => {
	const { fetchBooks } = props;

	const [tempState, setTempState] = useState(false);
	const [singleBook, setTestBook] = useState({});
	const [temp, setTemp] = useState(false);

	const handleStateChange = (data) => {
		setTempState(data);
	};

	const handleSetTestBook = (data) => {
		setTestBook(data);
	};

	//Sort books by relevance
	const sortByRelevance = () => {
		props.fetchBooks();
		setTemp(!temp);
	};

	//Sort books by name
	const sortByName = () => {
		props.books.sort((a, b) =>
			a.bookName > b.bookName ? 1 : b.bookName > a.bookName ? -1 : 0
		);

		setTemp(!temp);
	};

	//Sort books by price
	const sortByPrice = () => {
		props.books.sort((a, b) =>
			a.discountPrice > b.discountPrice
				? 1
				: b.discountPrice > a.discountPrice
				? -1
				: 0
		);

		setTemp(!temp);
	};

	useEffect(() => {
		fetchBooks();
	}, [fetchBooks]);

	return (
		<div>
			<Header handleStateChange={handleStateChange} name='home' />
			{tempState ? (
				<BookInfo handleStateChange={handleStateChange} book={singleBook} />
			) : (
				<ViewBooks
					sortByRelevance={sortByRelevance}
					sortByPrice={sortByPrice}
					sortByName={sortByName}
					handleStateChange={handleStateChange}
					handleSetTestBook={handleSetTestBook}
				/>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		books: state.bookReducer.books,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBooks: () => dispatch(fetchBooks()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
