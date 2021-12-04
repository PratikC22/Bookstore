import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MyCart } from '../components/myCart/MyCart';

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

const MyCartCompWithChild = (props = {}, state = null) => {
	const comp = shallow(<MyCart books={books} store={store} />);
	if (state) comp.setState(state);
	return comp;
};

const MyCartComp = MyCartCompWithChild();

describe('Test if MyCart component is loading correctly', () => {
	it('test if main container is loading', () => {
		expect(MyCartComp.find('.my-cart-main-container').exists()).toBe(true);
	});

	it('test if content is loading', () => {
		expect(MyCartComp.find('.my-cart-content').exists()).toBe(true);
	});
});
