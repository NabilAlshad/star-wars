import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Card from './Card';
import { getAllDataById } from '@services/api';
import '@testing-library/jest-dom';

jest.mock('@assets/swordsman.png', () => 'swordsman.png');

jest.mock('@services/api', () => ({
	getAllDataById: jest.fn(),
}));

jest.mock('../Modal/Modal', () => ({ data, name, hide, isShowing }: any) => {
	return isShowing ? (
		<div data-testid='modal'>
			<p>{name} details shown</p>
			<button onClick={hide}>Close</button>
		</div>
	) : null;
});

jest.mock('@root/BasseButton/BaseButton', () => (props: any) => (
	<button onClick={props.onClick} className={props.className}>
		{props.children}
	</button>
));

describe('Card Component', () => {
	const mockItem = {
		name: 'Test Hero',
		url: 'https://fakeapi.com/hero/1',
	};

	const mockCharacterData = {
		name: 'Test Hero',
		power: 'Bravery',
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders character name and button', () => {
		render(<Card item={mockItem} />);
		expect(screen.getByText('Test Hero')).toBeInTheDocument();
		expect(screen.getByText('Hero Details')).toBeInTheDocument();
	});

	it('opens modal and shows loading state when button is clicked', async () => {
		(getAllDataById as jest.Mock).mockResolvedValue({
			status: 200,
			data: { result: mockCharacterData },
		});

		render(<Card item={mockItem} />);
		const button = screen.getByRole('button');

		fireEvent.click(button);

		expect(screen.getByText(/loading/i)).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByTestId('modal')).toBeInTheDocument();
			expect(screen.getByText(/Test Hero details shown/)).toBeInTheDocument();
		});
	});

	it('does not open modal on failed API call', async () => {
		(getAllDataById as jest.Mock).mockResolvedValue({
			status: 500,
		});

		render(<Card item={mockItem} />);
		const button = screen.getByRole('button');
		fireEvent.click(button);

		await waitFor(() => {
			expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
		});
	});
});
