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

	test('shows loading state while fetching data', async () => {
		let resolvePromise: any;
		const mockPromise = new Promise((resolve) => {
			resolvePromise = resolve;
		});

		(getAllDataById as jest.Mock).mockReturnValue(mockPromise);

		render(<Card item={item} />);
		fireEvent.click(screen.getByText(/Click Details/i));

		expect(screen.getByText(/....loading/i)).toBeInTheDocument();

		resolvePromise(mockResponse);
		await waitFor(() => {
			expect(screen.getByTestId('modal')).toBeInTheDocument();
		});
	});

	test('renders without crashing even if item.name is undefined', () => {
		const brokenItem = { ...item, name: undefined };
		render(<Card item={brokenItem} />);
		// Should render button and two images
		expect(screen.getAllByRole('img')).toHaveLength(2);
		expect(screen.getByText(/Click Details/i)).toBeInTheDocument();
	});

	test('renders without crashing even if item.url is undefined', async () => {
		const brokenItem = { ...item, url: undefined };
		render(<Card item={brokenItem} />);
		fireEvent.click(screen.getByText(/Click Details/i));

		await waitFor(() => {
			expect(getAllDataById).toHaveBeenCalledWith(undefined);
		});
	});
	test('does not show modal content if API response is not 200', async () => {
		(getAllDataById as jest.Mock).mockResolvedValueOnce({
			status: 404,
			data: {},
		});

		render(<Card item={item} />);
		fireEvent.click(screen.getByText(/Click Details/i));

		await waitFor(() => {
			expect(getAllDataById).toHaveBeenCalledWith(item.url);
			const modal = screen.getByTestId('modal');
			expect(modal).toBeEmptyDOMElement(); // modal container exists but no modal content

			// The card header 'Luke Skywalker' remains in DOM
			// But modal-specific content should NOT be present:
			expect(screen.queryByText('Jedi Master of the Rebellion')).not.toBeInTheDocument();
		});
	});

	test('handles undefined item.url gracefully', async () => {
		const itemWithoutUrl = { ...item, url: undefined };
		(getAllDataById as jest.Mock).mockResolvedValueOnce({
			status: 400,
			data: {},
		});

		render(<Card item={itemWithoutUrl} />);
		fireEvent.click(screen.getByText(/Click Details/i));

		await waitFor(() => {
			expect(getAllDataById).toHaveBeenCalledWith(undefined);
			const modal = screen.getByTestId('modal');
			expect(modal).toBeEmptyDOMElement();
		});
	});

	test('shows loading state while fetching data', async () => {
		let resolvePromise: any;
		const mockPromise = new Promise((resolve) => {
			resolvePromise = resolve;
		});

		(getAllDataById as jest.Mock).mockReturnValue(mockPromise);

		render(<Card item={item} />);
		fireEvent.click(screen.getByText(/Click Details/i));
		expect(screen.getByText(/....loading/i)).toBeInTheDocument();

		resolvePromise(mockResponse);
		await waitFor(() => {
			expect(screen.queryByText(/....loading/i)).not.toBeInTheDocument();
			expect(screen.getByTestId('modal')).toBeInTheDocument();
		});
	});

	test('loading state toggles during modal open lifecycle', async () => {
		let resolveFn;
		const mockPromise = new Promise((resolve) => {
			resolveFn = resolve;
		});
		(getAllDataById as jest.Mock).mockReturnValue(mockPromise);

		render(<Card item={item} />);
		fireEvent.click(screen.getByText(/Click Details/i));

		expect(screen.getByText(/....loading/i)).toBeInTheDocument();

		resolveFn(mockResponse);

		await waitFor(() => {
			expect(screen.queryByText(/....loading/i)).not.toBeInTheDocument();
			expect(screen.getByTestId('modal')).toBeInTheDocument();
		});
	});
});
