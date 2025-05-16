import React from 'react';
import './Pagination.scss';

const Pagination = ({ isLoading, currentPage, setCurrentPage, totalPages }: any) => {
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			setCurrentPage(page);
		}
	};

	if (!totalPages || isLoading) return null;

	return (
		<div className='button-container'>
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1 || isLoading}
				className='previous-button'>
				Previous
			</button>

			<div className='index-button-container'>
				{[...Array(totalPages)].map((_, index) => {
					const page = index + 1;
					return (
						<button
							key={page}
							onClick={() => handlePageChange(page)}
							className='page-button'
							style={{
								backgroundColor: page === currentPage ? 'green' : 'yellow',
								color: page === currentPage ? 'white' : 'black',
							}}
							disabled={isLoading}>
							{page}
						</button>
					);
				})}
			</div>

			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages || isLoading}
				className='next-button'>
				Next
			</button>
		</div>
	);
};

export default React.memo(Pagination);
