import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CardContainer from './CardContainer';
import axios from 'Axios';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

jest.mock('@compound/Card/Card', () => (props: any) => (
	<div data-testid='card'>{props.item.name}</div>
));

jest.mock('@compound/Pagination/Pagination', () => (props: any) => (
	<div data-testid='pagination'>
		Page {props.currentPage} of {props.totalPages}
		<button onClick={() => props.setCurrentPage(props.currentPage + 1)}>Next</button>
	</div>
));
beforeAll(() => {
	jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
	(console.error as jest.Mock).mockRestore();
});
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CardContainer', () => {
	const mockSetIsLoading = jest.fn();
	const mockModalImage = 'mock-image.jpg';
	const limit = 12;

	const mockApiData = {
		data: {
			results: [{ name: 'Luke Skywalker' }, { name: 'Leia Organa' }, { name: 'Han Solo' }],
			total_records: 36,
		},
		status: 200,
	};

	beforeEach(() => {
		jest.clearAllMocks();
		mockedAxios.get.mockResolvedValue(mockApiData);
	});

	test('displays loading state and then cards after API call', async () => {
		render(
			<CardContainer
				isLoading={false}
				setIsLoading={mockSetIsLoading}
				ModalImage={mockModalImage}
				searchQuery=''
				limit={limit}
			/>
		);

		expect(mockSetIsLoading).toHaveBeenCalledWith(true);

		await waitFor(() => {
			expect(screen.getAllByTestId('card')).toHaveLength(3);
			expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
		});

		expect(mockSetIsLoading).toHaveBeenCalledWith(false);
	});

	test('filters cards based on searchQuery', async () => {
		render(
			<CardContainer
				isLoading={false}
				setIsLoading={mockSetIsLoading}
				ModalImage={mockModalImage}
				searchQuery='leia'
				limit={limit}
			/>
		);

		await waitFor(() => {
			expect(screen.queryByText('Leia Organa')).toBeInTheDocument();
			expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
		});
	});

	test('shows no results message when nothing matches search', async () => {
		render(
			<CardContainer
				isLoading={false}
				setIsLoading={mockSetIsLoading}
				ModalImage={mockModalImage}
				searchQuery='yoda'
				limit={limit}
			/>
		);

		await waitFor(() => {
			expect(screen.getByText(/No results found/i)).toBeInTheDocument();
		});
	});

	test('renders and interacts with pagination', async () => {
		render(
			<CardContainer
				isLoading={false}
				setIsLoading={mockSetIsLoading}
				ModalImage={mockModalImage}
				searchQuery=''
				limit={limit}
			/>
		);

		await waitFor(() => {
			expect(screen.getByTestId('pagination')).toBeInTheDocument();
			expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
		});

		// Simulate clicking "Next" pagination
		userEvent.click(screen.getByText('Next'));
		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('page=2'));
		});
	});
	test('handles items without a name property', async () => {
		mockedAxios.get.mockResolvedValue({
			data: {
				results: [{ name: null }, { someOtherProp: 'value' }],
				total_records: 2,
			},
			status: 200,
		});

		render(
			<CardContainer
				isLoading={false}
				setIsLoading={mockSetIsLoading}
				ModalImage={mockModalImage}
				searchQuery='anything'
				limit={limit}
			/>
		);

		await waitFor(() => {
			expect(screen.getByText(/No results found/i)).toBeInTheDocument();
		});
	});
	test('handles items without a name property', async () => {
		mockedAxios.get.mockResolvedValue({
			data: {
				results: [{ name: null }, { someOtherProp: 'value' }],
				total_records: 2,
			},
			status: 200,
		});

		render(
			<CardContainer
				isLoading={false}
				setIsLoading={mockSetIsLoading}
				ModalImage={mockModalImage}
				searchQuery='anything'
				limit={limit}
			/>
		);

		await waitFor(() => {
			expect(screen.getByText(/No results found/i)).toBeInTheDocument();
		});
	});
	test('refetches data when limit prop changes', async () => {
		const { rerender } = render(
			<CardContainer
				isLoading={false}
				setIsLoading={mockSetIsLoading}
				ModalImage={mockModalImage}
				searchQuery=''
				limit={limit}
			/>
		);

		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining(`limit=${limit}`));
		});

		const newLimit = 6;
		rerender(
			<CardContainer
				isLoading={false}
				setIsLoading={mockSetIsLoading}
				ModalImage={mockModalImage}
				searchQuery=''
				limit={newLimit}
			/>
		);

		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining(`limit=${newLimit}`));
		});
	});
	test('renders all cards when searchQuery is only whitespace', async () => {
		render(
			<CardContainer
				isLoading={false}
				setIsLoading={mockSetIsLoading}
				ModalImage={mockModalImage}
				searchQuery='   '
				limit={limit}
			/>
		);

		await waitFor(() => {
			expect(screen.getAllByTestId('card')).toHaveLength(3);
		});
	});
	test('handles API error and sets loading to false', async () => {
		mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

		render(
			<CardContainer
				isLoading={false}
				setIsLoading={mockSetIsLoading}
				ModalImage={mockModalImage}
				searchQuery=''
				limit={limit}
			/>
		);

		await waitFor(() => {
			expect(mockSetIsLoading).toHaveBeenCalledWith(false);
		});
	});
	test('pagination respects total pages (does not go past last page)', async () => {
		mockedAxios.get.mockResolvedValueOnce({
			data: {
				results: [{ name: 'Obi-Wan Kenobi' }],
				total_records: 12,
			},
			status: 200,
		});

		render(
			<CardContainer
				isLoading={false}
				setIsLoading={mockSetIsLoading}
				ModalImage={mockModalImage}
				searchQuery=''
				limit={limit}
			/>
		);

		await waitFor(() => {
			expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
		});
		userEvent.click(screen.getByText('Next'));
		expect(mockedAxios.get).not.toHaveBeenCalledWith(expect.stringContaining('page=2'));
	});
});
