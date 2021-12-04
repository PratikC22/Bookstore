import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { ViewBooks } from '../components/viewBooks/ViewBooks';

import store from '../redux/Store';

Enzyme.configure({ adapter: new Adapter() });

const books = [
	{
		id: '1',
		bookName: 'Atomic Habits',
		author: 'James Clear',
		discountPrice: '0',
		price: '1000',
	},
];

const viewBooks = (props = {}, state = null) => {
	const comp = mount(<ViewBooks books={books} store={store} />);
	if (state) comp.setState(state);
	return comp;
};

const ViewBooksComp = viewBooks();

describe('test child components are loading', () => {
	it('test if book card component is rendered', () => {
		expect(ViewBooksComp.find('.book-card').exists()).toBe(true);
	});

	it('test if drop down component is rendered', () => {
		expect(ViewBooksComp.find('.sort-select').exists()).toBe(true);
	});
});
