import React from 'react';

export const MockCard = (props: any) => <div data-testid='card'>{props.item.name}</div>;

export const MockPagination = (props: any) => (
	<button data-testid='pagination-next' onClick={() => props.setCurrentPage(props.currentPage + 1)}>
		Next Page
	</button>
);
