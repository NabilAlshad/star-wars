import React, { useState } from 'react';
import './Card.scss';
import Character from '@assets/swordsman.png';
import BaseButton from '@root/BasseButton/BaseButton';
import Modal from '../Modal/Modal';
import { getAllDataById } from '@services/api';

const Card: React.FC = (props: any) => {
	const { item } = props;

	const [isShowing, setIsShowing] = useState(false);
	const [characterData, setCharacterData] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	const modalClose = async () => {
		setIsShowing(false);
	};
	const modalOpen = async () => {
		setLoading(true);
		const response = await getAllDataById(item?.url);
		if (response?.status === 200) {
			setLoading(true);
			setCharacterData(response?.data?.result);
			setIsShowing(true);
			setLoading(false);
		}
		if (response?.status !== 200) {
			setIsShowing(false);
			setLoading(true);
		}
	};

	return (
		<div className='card'>
			<div className='img'></div>
			<h1 className='name'>
				<span>
					<img src={Character} alt='icon-sword' />
				</span>
				{item?.name}
				<span>
					<img src={Character} alt='icon-sword' />
				</span>
			</h1>
			<BaseButton onClick={modalOpen} className='button'>
				{loading ? (
					<span>....loading</span>
				) : (
					<span>{loading ? '...loading' : 'Click Details'} </span>
				)}
			</BaseButton>
			<Modal data={characterData} name={item?.name} hide={modalClose} isShowing={isShowing}>
				<p>modal open</p>
			</Modal>
		</div>
	);
};

export default React.memo(Card);
