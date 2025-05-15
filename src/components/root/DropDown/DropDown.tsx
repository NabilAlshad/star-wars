import React from 'react';

const DropDown = (props) => {
	const { limit, onLimitChange } = props;
	return (
		<div>
			<label htmlFor='limit'>Items per page: </label>
			<select id='limit' value={limit} onChange={onLimitChange}>
				<option value={12}>12</option>
				<option value={16}>16</option>
				<option value={20}>20</option>
				<option value={30}>30</option>
				<option value={50}>50</option>
			</select>
		</div>
	);
};

export default DropDown;
