import React, { useState } from 'react';
import './Header_style.scss';
import bookStoreLogo from '../../assets/education.png';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ShopOutlinedIcon from '@mui/icons-material/ShopOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = (props) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const history = useHistory();

	// Method to Set anchorEl
	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popper' : undefined;

	// Navigate to home when clicked
	const handleLogoClick = () => {
		if (props.name === 'home') {
			props.handleStateChange(false);
		} else {
			history.push('/home');
		}
	};

	// Navigate to my wishList when clicked
	const navigateToWishList = () => {
		history.push('/wish-list');
	};

	// Navigate to my cart when clicked
	const navigateToMyCart = () => {
		history.push('/my-cart');
	};

	// Method to handle logout
	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		history.push('/');
	};

	return (
		<>
			<div className='header-main-container'>
				<div className='header-inner-container'>
					<div className='logo-text-search'>
						{/* ------------ logo and text ------------ */}
						<div className='logo-text' onClick={handleLogoClick}>
							<img className='bookstore-logo' src={bookStoreLogo} alt='logo' />
							<div className='bookstore-text'>Bookstore</div>
						</div>

						{/* ------------ Search field ------------ */}
						<div className='header-search-field'>
							<Paper component='form' sx={paperStyle}>
								<IconButton sx={{ p: '10px' }} aria-label='search'>
									<SearchIcon />
								</IconButton>
								<InputBase
									className='navbar-input'
									sx={{ ml: 1, flex: 1 }}
									placeholder='Search'
								/>
							</Paper>
						</div>
					</div>

					<div className='profile-cart'>
						{/* ------------ Profile icon and text ------------ */}
						<div className='profile-name-container' onClick={handleClick}>
							<div className='profile-name-text'>
								<div className='profile-icon'>
									<PersonOutlineOutlinedIcon />
								</div>
								<div className='profile-name'>Pratik</div>
							</div>
						</div>

						{/* ------------ Popper for profile menu ------------ */}
						<Popper
							style={popperStyle}
							id={id}
							open={open}
							anchorEl={anchorEl}
							placement='bottom-end'
						>
							<ClickAwayListener onClickAway={() => setAnchorEl(null)}>
								<div className='popper-container'>
									<div className='popper-heading'>Hello, Pratik</div>
									<div className='popper-content'>
										<PersonOutlineOutlinedIcon style={iconStyle} /> Profile
									</div>
									<div className='popper-content'>
										<ShopOutlinedIcon style={iconStyle} /> My Order
									</div>
									<div className='popper-content' onClick={navigateToWishList}>
										<FavoriteBorderOutlinedIcon style={iconStyle} /> My Wishlist
									</div>
									<div className='popper-btn-container'>
										<div
											className='popper-btn-inner-container'
											onClick={handleLogout}
										>
											<span className='popper-btn'>Logout</span>
										</div>
									</div>
								</div>
							</ClickAwayListener>
						</Popper>

						{/* ------------ Cart icon and text ------------ */}
						<div className='cart-icon-text-container'>
							<div className='cart-icon-text' onClick={navigateToMyCart}>
								<div className='cart-icon'>
									<Badge badgeContent={props.cartItems} color='success'>
										<ShoppingCartOutlinedIcon color='#fff' />
									</Badge>
								</div>
								<div className='cart-text'>Cart</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const paperStyle = {
	p: '2px 4px',
	display: 'flex',
	alignItems: 'center',
	width: '490px',
	height: '33px',
};

const iconStyle = {
	height: '13px',
	marginRight: '5px',
	width: '13px',
};

const popperStyle = {
	width: '200px',
	height: '182px',
	boxShadow: '0px 3px 6px #00000029',
	boxSizing: 'border-box',
	backgroundColor: '#fff',
	border: '2px solid white',
	borderRadius: '3px',
};

const mapStateToProps = (state) => {
	return {
		cartItems: state.cartItemReducer.cartItems,
	};
};

export default connect(mapStateToProps)(Header);
