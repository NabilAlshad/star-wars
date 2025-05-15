import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Card from './Card';
import { getAllDataById } from 'src/services/api';

jest.mock('../../root/BasseButton/BaseButton', () => (props: any) => (
	<button {...props}>{props.children}</button>
));
jest.mock(
	'../Modal/Modal',
	() => (props: any) => props.isShowing ? <div data-testid='modal'>{props.children}</div> : null
);
jest.mock('@assets/swordsman.png', () => 'mocked-image-path');

// Mock API
jest.spyOn(api, getAllDataById).mockImplementation(async () => ({
	status: 200,
	data: {
		result: {
			gender: 'male',
			height: '180',
			eye_color: 'blue',
		},
	},
}));

describe('Card component', () => {
	const mockItem = {
		name: 'Luke Skywalker',
		url: 'https://swapi.dev/api/people/1/',
	};

	test('renders name and button', () => {
		render(<Card item={mockItem} />);
		expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
		expect(screen.getByRole('button')).toHaveTextContent(/click details/i);
	});

	test('calls API and shows modal on button click', async () => {
		render(<Card item={mockItem} />);
		fireEvent.click(screen.getByRole('button'));

		expect(screen.getByRole('button')).toHaveTextContent(/loading/i);

		await waitFor(() => {
			expect(api.getAllDataById).toHaveBeenCalledWith(mockItem.url);
			expect(screen.getByTestId('modal')).toBeInTheDocument();
			expect(screen.getByText('modal open')).toBeInTheDocument();
		});
	});
});
