import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DropDown from './DropDown';

describe('DropDown component', () => {
	test('renders select with correct default value', () => {
		render(<DropDown limit={16} onLimitChange={() => {}} />);
		const select = screen.getByLabelText(/items per page/i);
		expect(select).toBeInTheDocument();
		expect(select).toHaveValue('16');
	});

	test('renders all expected options', () => {
		render(<DropDown limit={12} onLimitChange={() => {}} />);
		const options = screen.getAllByRole('option').map((opt) => opt.value);
		expect(options).toEqual(['12', '16', '20', '30', '50']);
	});

	test('calls onLimitChange when a new option is selected', () => {
		const handleChange = jest.fn();
		render(<DropDown limit={12} onLimitChange={handleChange} />);
		const select = screen.getByLabelText(/items per page/i);

		fireEvent.change(select, { target: { value: '30' } });
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
	});
});
