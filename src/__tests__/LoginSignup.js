import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Login from '../components/loginSignup/Login';
import Signup from '../components/loginSignup/Signup';

Enzyme.configure({ adapter: new Adapter() });

const shallowMountLogin = shallow(<Login />);
const shallowMountSignup = shallow(<Signup />);

describe('Test if login component is loading correctly', () => {
	it('test if login-form is loading', () => {
		expect(shallowMountLogin.find('.login-form').exists()).toBe(true);
	});

	it('test if username field is loading', () => {
		expect(shallowMountLogin.find('.username-text').exists()).toBe(true);
	});

	it('test if password field is loading', () => {
		expect(shallowMountLogin.find('.password-field').exists()).toBe(true);
	});

	it('test if forgot password is loading', () => {
		expect(shallowMountLogin.find('.fgt-pass').exists()).toBe(true);
	});

	it('test if login options is loading', () => {
		expect(shallowMountLogin.find('.login-options').exists()).toBe(true);
	});

	it('test if login button is loading', () => {
		expect(shallowMountLogin.find('.google-login-btn').exists()).toBe(true);
	});
});

describe('Test if Signup component is loading correctly', () => {
	it('test if signup-form is loading', () => {
		expect(shallowMountSignup.find('.signup-form').exists()).toBe(true);
	});

	it('test if full name field is loading', () => {
		expect(shallowMountSignup.find('.full-name').exists()).toBe(true);
	});

	it('test if email field is loading', () => {
		expect(shallowMountSignup.find('.email').exists()).toBe(true);
	});

	it('test if password is loading', () => {
		expect(shallowMountSignup.find('.password').exists()).toBe(true);
	});

	it('test if mobile number field is loading', () => {
		expect(shallowMountSignup.find('.mobile-number').exists()).toBe(true);
	});

	it('test if signup button is loading', () => {
		expect(shallowMountSignup.find('.signup-btn').exists()).toBe(true);
	});
});
