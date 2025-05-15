import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
	const setup = (propsOverride = {}) => {
		const defaultProps = {
			isLoading: false,
			currentPage: 1,
			setCurrentPage: jest.fn(),
			totalPages: 5,
		};
		const props = { ...defaultProps, ...propsOverride };
		render(<Pagination {...props} />);
		return props;
	};

	it('renders all page buttons', () => {
		setup();
		expect(screen.getAllByRole('button', { name: /\d/ })).toHaveLength(5);
	});

	it('does not render when isLoading is true', () => {
		setup({ isLoading: true });
		expect(screen.queryByRole('button')).toBeNull();
	});

	it('does not render when totalPages is 0', () => {
		setup({ totalPages: 0 });
		expect(screen.queryByRole('button')).toBeNull();
	});

	it('calls setCurrentPage when a page number is clicked', () => {
		const { setCurrentPage } = setup();
		fireEvent.click(screen.getByRole('button', { name: '3' }));
		expect(setCurrentPage).toHaveBeenCalledWith(3);
	});

	it('does not call setCurrentPage when clicking the current page', () => {
		const { setCurrentPage } = setup({ currentPage: 2 });
		fireEvent.click(screen.getByRole('button', { name: '2' }));
		expect(setCurrentPage).not.toHaveBeenCalled();
	});

	it('Previous button is disabled on first page', () => {
		setup({ currentPage: 1 });
		expect(screen.getByRole('button', { name: /Previous/i })).toBeDisabled();
	});

	it('Next button is disabled on last page', () => {
		setup({ currentPage: 5 });
		expect(screen.getByRole('button', { name: /Next/i })).toBeDisabled();
	});

	it('calls setCurrentPage when Previous button is clicked', () => {
		const { setCurrentPage } = setup({ currentPage: 3 });
		fireEvent.click(screen.getByRole('button', { name: /Previous/i }));
		expect(setCurrentPage).toHaveBeenCalledWith(2);
	});

	it('calls setCurrentPage when Next button is clicked', () => {
		const { setCurrentPage } = setup({ currentPage: 2 });
		fireEvent.click(screen.getByRole('button', { name: /Next/i }));
		expect(setCurrentPage).toHaveBeenCalledWith(3);
	});
});
