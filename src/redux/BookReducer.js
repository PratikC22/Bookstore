const initialCartItemState = {
	cartItems: 0,
};

const initialBookState = {
	loading: false,
	books: [],
	error: '',
};

export const cartItemReducer = (state = initialCartItemState, action) => {
	switch (action.type) {
		case 'SET_ITEM':
			return {
				...state,
				cartItems: action.payload,
			};

		case 'INCREMENT_ITEM':
			return {
				...state,
				cartItems: state.cartItems + 1,
			};

		case 'DECREMENT_ITEM':
			return {
				...state,
				cartItems: state.cartItems - 1,
			};

		default:
			return state;
	}
};

export const bookReducer = (state = initialBookState, action) => {
	switch (action.type) {
		case 'FETCH_BOOKS_REQUEST':
			return {
				...state,
				loading: true,
			};

		case 'FETCH_BOOKS_SUCCESS':
			return {
				loading: false,
				books: action.payload,
				error: '',
			};

		case 'FETCH_BOOKS_ERROR':
			return {
				loading: false,
				books: [],
				error: action.payload,
			};

		default:
			return state;
	}
};
