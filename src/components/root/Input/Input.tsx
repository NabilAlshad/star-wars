import React from 'react';
import './Input.scss';
const Input = (props: any) => {
	const { onChangeHandler, onKeyDownHandler } = props;
	return (
		<input
			placeholder="Enter your hero's name"
			onKeyDown={onKeyDownHandler}
			onChange={(e) => onChangeHandler(e)}
			type='text'></input>
	);
};

export default Input;
