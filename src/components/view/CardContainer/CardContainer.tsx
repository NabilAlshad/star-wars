import React, { useEffect, useState } from 'react';
import './CardContainer.css';
import Card from 'src/components/compound/Card/Card';
import Pagination from 'src/components/compound/Pagination/Pagination';
import axios from 'Axios';

const LIMIT = 12;

const CardContainer = ({ isLoading, setIsLoading, ModalImage, searchQuery, limit }: any) => {
	const [pageData, setPageData] = useState<any[]>([]);
	const [filteredData, setFilteredData] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalRecords, setTotalRecords] = useState<number>(0);

	const fetchPageData = async (page: number) => {
		try {
			setIsLoading(true);
			const response = await axios.get(
				`${process.env['BASE_URL']}/api/people?page=${page}&limit=${limit}`
			);
			if (response?.status === 200) {
				const results = response.data.results || [];
				setPageData(results);
				setTotalRecords(response.data.total_records || 0);
			}
		} catch (error) {
			console.error('Error fetching page data:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPageData(currentPage);
	}, [currentPage, limit]);

	useEffect(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) {
			setFilteredData(pageData);
			return;
		}

		const filtered = pageData.filter((item: any) => {
			if (!item?.name) return false;
			const words = item.name.toLowerCase().split(/\s+/);
			return words.includes(query);
		});

		setFilteredData(filtered);
	}, [searchQuery, pageData]);

	const totalPages = Math.ceil(totalRecords / LIMIT);

	return (
		<>
			<div className='card-container'>
				{isLoading ? (
					<div className='center-screen'>
						<img
							style={{ width: '200px', height: '200px' }}
							src={ModalImage}
							alt='Loading data...'
						/>
					</div>
				) : filteredData.length > 0 ? (
					filteredData.map((item: any, index: number) => (
						<Card isLoading={isLoading} setIsLoading={setIsLoading} key={index} item={item} />
					))
				) : (
					<div className='no-results'>No results found for "{searchQuery}"</div>
				)}
			</div>

			<Pagination
				isLoading={isLoading}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				totalPages={totalPages}
				limit={limit}
			/>
		</>
	);
};

export default React.memo(CardContainer);
