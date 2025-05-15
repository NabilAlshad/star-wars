import axios from 'Axios';

const allData = {
	async getAllData(page = 0, limit = 0): Promise<any> {
		try {
			const response = await axios.get(
				`${process.env['BASE_URL']}/api/people?page=${page}&limit=${limit}`
			);

			return response;
		} catch (error) {
			throw error;
		}
	},

	async getAllDataById(url = ''): Promise<any> {
		try {
			const response = await axios.get(`${url}`);

			return response;
		} catch (error) {
			throw error;
		}
	},
};
export const { getAllData, getAllDataById } = allData;
