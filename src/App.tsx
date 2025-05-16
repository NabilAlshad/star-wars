import React, { lazy, Suspense, useState } from 'react';
import ModalImage from '@assets/modal.gif';
import Input from './components/root/Input/Input';
import BaseButton from './components/root/BasseButton/BaseButton';
import './style.scss';
import DropDown from './components/root/DropDown/DropDown';
import Navbar from '@compound/Navbar/Navbar';

const CardContainer = lazy(() => import('@view/CardContainer/CardContainer'));

const App: React.FC = () => {
	const [inputData, setInputData] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [limit, setLimit] = useState(12);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData(e.target.value);
	};

	const onSearchClick = () => {
		setSearchTerm(inputData.trim());
	};
	const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSearchClick();
		}
	};
	const onLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLimit(Number(e.target.value));
	};
	console.log('limit', limit);
	return (
		<>
			<Suspense
				fallback={
					<div className='center-screen'>
						<img style={{ width: '300px', height: '300px' }} src={ModalImage} alt='Loading...' />
					</div>
				}>
				<Navbar />
				<div className='form-section'>
					<Input onChangeHandler={onChangeHandler} onKeyDownHandler={onKeyDownHandler} />
					<BaseButton className='submit-button' onClick={onSearchClick}>
						Search
					</BaseButton>
				</div>
				<DropDown limit={limit} onLimitChange={onLimitChange} />
				<CardContainer
					ModalImage={ModalImage}
					isLoading={isLoading}
					setIsLoading={setIsLoading}
					limit={limit}
					searchQuery={searchTerm}
				/>
			</Suspense>
		</>
	);
};

export default App;
