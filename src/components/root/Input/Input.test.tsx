import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {
	test('renders input element', () => {
		render(<Input onChangeHandler={() => {}} onKeyDownHandler={() => {}} />);
		const input = screen.getByRole('textbox');
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('type', 'text');
	});

	test('calls onChangeHandler on input change', () => {
		const handleChange = jest.fn();
		render(<Input onChangeHandler={handleChange} onKeyDownHandler={() => {}} />);
		const input = screen.getByRole('textbox');

		fireEvent.change(input, { target: { value: 'Hello' } });
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith(expect.any(Object)); // event object
	});

	test('calls onKeyDownHandler on key down', () => {
		const handleKeyDown = jest.fn();
		render(<Input onChangeHandler={() => {}} onKeyDownHandler={handleKeyDown} />);
		const input = screen.getByRole('textbox');

		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
		expect(handleKeyDown).toHaveBeenCalledTimes(1);
		expect(handleKeyDown).toHaveBeenCalledWith(expect.any(Object)); // event object
	});
});
