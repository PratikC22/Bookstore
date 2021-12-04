import React from 'react';

const PageNotFound = () => {
	return (
		<div style={pageNotFound}>
			<img
				src='https://www.psdchat.com/wp-content/uploads/2012/12/template-404-error-page-preview.jpg?704c52&704c52'
				alt=''
				width='100%'
				height='100%'
			/>
		</div>
	);
};

const pageNotFound = {
	width: '100vw',
	height: '100vh',
};

export default PageNotFound;
