import React, { useState } from 'react';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ClickAwayListener } from '@mui/material';

const DropDown = (props) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [activeSort, setActiveSort] = useState('Relevance');

	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const setActive = (name) => {
		setActiveSort(name);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popper' : undefined;

	return (
		<div>
			<div
				style={divStyle}
				aria-describedby={id}
				type='button'
				onClick={handleClick}
			>
				Sort By - {activeSort}
				<ArrowDropDownIcon />
			</div>
			<Popper id={id} open={open} anchorEl={anchorEl}>
				<ClickAwayListener onClickAway={() => setAnchorEl(null)}>
					<Paper sx={paperStyle}>
						<span
							className='dropdown-option'
							onClick={() => {
								props.sortByRelevance();
								setActive('Relevance');
							}}
						>
							Sort By Relevance
						</span>
						<span
							className='dropdown-option'
							onClick={() => {
								props.sortByName();
								setActive('Name');
							}}
						>
							Sort By Name
						</span>
						<span
							style={{ marginBottom: '5px' }}
							className='dropdown-option'
							onClick={() => {
								props.sortByPrice();
								setActive('Price');
							}}
						>
							Sort By Price
						</span>
					</Paper>
				</ClickAwayListener>
			</Popper>
		</div>
	);
};

const divStyle = {
	width: '190px',
	height: '35px',
	border: '1px solid #d5d5d5',
	padding: '0 10px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	cursor: 'pointer',
};

const paperStyle = {
	width: '190px',
	height: '100px',
	padding: '0 10px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-around',
};

export default DropDown;
