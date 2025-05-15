import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Card from './Card';
import { getAllDataById } from 'src/services/api';

jest.mock('src/services/api', () => ({
	getAllDataById: jest.fn(),
}));

jest.mock('@assets/swordsman.png', () => 'mocked-character.png');

jest.mock('../Modal/Modal', () => (props: any) => (
	<div data-testid='modal'>
		{props.isShowing ? (
			<div>
				<p>{props.name}</p>
				<p>{props.data?.description}</p>
				<button onClick={props.hide}>Close</button>
			</div>
		) : null}
	</div>
));

jest.mock('../../root/BasseButton/BaseButton', () => (props: any) => (
	<button onClick={props.onClick} className={props.className}>
		{props.children}
	</button>
));

describe('Card Component', () => {
	const item = {
		name: 'Luke Skywalker',
		url: 'https://swapi.dev/api/people/1/',
	};

	const mockResponse = {
		status: 200,
		data: {
			result: {
				description: 'Jedi Master of the Rebellion',
				properties: {
					height: '172',
					gender: 'male',
				},
			},
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(getAllDataById as jest.Mock).mockResolvedValue(mockResponse);
	});

	test('renders card with character name and image', () => {
		render(<Card item={item} />);
		expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
		expect(screen.getAllByRole('img')).toHaveLength(2); // both icons
		expect(screen.getByText(/Click Details/i)).toBeInTheDocument();
	});

	test('opens modal on button click with data', async () => {
		render(<Card item={item} />);

		fireEvent.click(screen.getByText(/Click Details/i));

		await waitFor(() => {
			expect(getAllDataById).toHaveBeenCalledWith(item.url);
			expect(screen.getByTestId('modal')).toHaveTextContent('Luke Skywalker');
			expect(screen.getByTestId('modal')).toHaveTextContent('Jedi Master of the Rebellion');
		});
	});

	test('closes modal when hide is triggered', async () => {
		render(<Card item={item} />);
		fireEvent.click(screen.getByText(/Click Details/i));

		await waitFor(() => screen.getByText('Close'));

		fireEvent.click(screen.getByText('Close'));
	});
});
