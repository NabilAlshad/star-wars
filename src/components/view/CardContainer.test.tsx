import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'Axios';
import CardContainer from './CardContainer/CardContainer';
import Card from '../compound/Card/Card';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock child components
jest.mock('src/components/compound/Card/Card', () => MockCard);
jest.mock('src/components/compound/Pagination/Pagination', () => MockPagination);

const fakeDataPage1 = {
	data: {
		results: [
			{ id: 1, name: 'John Doe' },
			{ id: 2, name: 'Jane Smith' },
			{ id: 3, name: 'Alice Johnson' },
		],
		total_records: 20,
	},
	status: 200,
};

const fakeDataPage2 = {
	data: {
		results: [
			{ id: 4, name: 'Bob Brown' },
			{ id: 5, name: 'Charlie Green' },
		],
		total_records: 20,
	},
	status: 200,
};

describe('CardContainer', () => {
	const setIsLoading = jest.fn();
	const ModalImage = 'loading.gif';

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('shows loading indicator when isLoading is true', () => {
		render(
			<CardContainer
				isLoading={true}
				setIsLoading={setIsLoading}
				ModalImage={ModalImage}
				searchQuery=''
				limit={3}
			/>
		);

		expect(screen.getByAltText('Loading data...')).toBeInTheDocument();
	});

	it('fetches and renders data, shows cards', async () => {
		mockedAxios.get.mockResolvedValueOnce(fakeDataPage1);

		render(
			<CardContainer
				isLoading={false}
				setIsLoading={setIsLoading}
				ModalImage={ModalImage}
				searchQuery=''
				limit={3}
			/>
		);
		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledWith(
				expect.stringContaining('/api/people?page=1&limit=3')
			);
		});
		expect(screen.getAllByTestId('card').length).toBe(3);
		expect(screen.getByText('John Doe')).toBeInTheDocument();
		expect(screen.getByText('Jane Smith')).toBeInTheDocument();
		expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
	});

	it('filters data based on searchQuery', async () => {
		mockedAxios.get.mockResolvedValueOnce(fakeDataPage1);

		const { rerender } = render(
			<CardContainer
				isLoading={false}
				setIsLoading={setIsLoading}
				ModalImage={ModalImage}
				searchQuery=''
				limit={3}
			/>
		);

		await waitFor(() => expect(screen.getAllByTestId('card').length).toBe(3));
		rerender(
			<CardContainer
				isLoading={false}
				setIsLoading={setIsLoading}
				ModalImage={ModalImage}
				searchQuery='john'
				limit={3}
			/>
		);

		await waitFor(() => {
			const cards = screen.getAllByTestId('card');
			expect(cards.length).toBe(2);
			expect(screen.getByText('John Doe')).toBeInTheDocument();
			expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
		});
	});

	it('shows no results message when searchQuery filters out all data', async () => {
		mockedAxios.get.mockResolvedValueOnce(fakeDataPage1);

		const { rerender } = render(
			<CardContainer
				isLoading={false}
				setIsLoading={setIsLoading}
				ModalImage={ModalImage}
				searchQuery=''
				limit={3}
			/>
		);

		await waitFor(() => expect(screen.getAllByTestId('card').length).toBe(3));

		rerender(
			<CardContainer
				isLoading={false}
				setIsLoading={setIsLoading}
				ModalImage={ModalImage}
				searchQuery='notfound'
				limit={3}
			/>
		);

		await waitFor(() => {
			expect(screen.queryAllByTestId('card').length).toBe(0);
			expect(screen.getByText(/No results found for "notfound"/i)).toBeInTheDocument();
		});
	});

	it('pagination next button fetches next page data', async () => {
		mockedAxios.get.mockResolvedValueOnce(fakeDataPage1);
		mockedAxios.get.mockResolvedValueOnce(fakeDataPage2);

		render(
			<CardContainer
				isLoading={false}
				setIsLoading={setIsLoading}
				ModalImage={ModalImage}
				searchQuery=''
				limit={3}
			/>
		);

		// Wait for first page load
		await waitFor(() => expect(screen.getAllByTestId('card').length).toBe(3));
		expect(screen.getByText('John Doe')).toBeInTheDocument();

		// Click next page button
		fireEvent.click(screen.getByTestId('pagination-next'));

		// Wait for second page data load
		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledWith(
				expect.stringContaining('/api/people?page=2&limit=3')
			);
		});

		await waitFor(() => {
			expect(screen.getAllByTestId('card').length).toBe(2);
			expect(screen.getByText('Bob Brown')).toBeInTheDocument();
			expect(screen.getByText('Charlie Green')).toBeInTheDocument();
		});
	});
});
