import React from 'react';

const BaseButton = (props: any) => {
	const { children, className, onClick } = props;
	return (
		<button {...props} className={className} onClick={onClick}>
			{children}
		</button>
	);
};

export default BaseButton;
