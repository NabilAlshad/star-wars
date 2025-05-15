import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BaseButton from './BaseButton';

describe('BaseButton', () => {
	test('renders with children', () => {
		render(<BaseButton>Click Me</BaseButton>);
		expect(screen.getByText('Click Me')).toBeInTheDocument();
	});

	test('calls onClick when clicked', () => {
		const handleClick = jest.fn();
		render(<BaseButton onClick={handleClick}>Click Me</BaseButton>);
		fireEvent.click(screen.getByText('Click Me'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test('applies className prop', () => {
		render(<BaseButton className='test-class'>Click Me</BaseButton>);
		expect(screen.getByText('Click Me')).toHaveClass('test-class');
	});

	test('spreads other props to the button', () => {
		render(<BaseButton type='submit'>Submit</BaseButton>);
		expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit');
	});
});
