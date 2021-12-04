import React from 'react';
import spinner from '../../assets/spinner.gif';

const Spinner = () => {
	return (
		<div className='spinner'>
			<img
				src={spinner}
				style={{ width: '200px', margin: '25vh auto', display: 'block' }}
				alt='Loading...'
			/>
		</div>
	);
};

export default Spinner;
