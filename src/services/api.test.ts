import axios from 'Axios';
import { getAllData, getAllDataById } from './api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
	const mockResponse = { status: 200, data: { result: 'mocked data' } };

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getAllData', () => {
		it('should return data on successful call', async () => {
			mockedAxios.get.mockResolvedValue(mockResponse);
			const result = await getAllData(1, 10);
			expect(mockedAxios.get).toHaveBeenCalledWith(
				`${process.env['BASE_URL']}/api/people?page=1&limit=10`
			);
			expect(result).toEqual(mockResponse);
		});

		it('should throw an error on failed call', async () => {
			const error = new Error('Network error');
			mockedAxios.get.mockRejectedValue(error);

			await expect(getAllData(1, 10)).rejects.toThrow('Network error');
		});
	});

	describe('getAllDataById', () => {
		it('should return data on successful call', async () => {
			mockedAxios.get.mockResolvedValue(mockResponse);
			const result = await getAllDataById('https://api.com/character/1');
			expect(mockedAxios.get).toHaveBeenCalledWith('https://api.com/character/1');
			expect(result).toEqual(mockResponse);
		});

		it('should throw an error on failed call', async () => {
			const error = new Error('Fetch failed');
			mockedAxios.get.mockRejectedValue(error);

			await expect(getAllDataById('https://api.com/character/1')).rejects.toThrow('Fetch failed');
		});
	});
});
