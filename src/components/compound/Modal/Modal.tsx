import ReactDOM from 'react-dom';
import './Modal.scss';
import ModalCover from '@assets/single_cover.jpeg';
import Character from '@assets/swordsman.png';
import React from 'react';
import Table from '@root/Table/Table';
const Modal = (props: any) => {
	const { isShowing, name, hide, data } = props;
	const tableHeaders = ['Gender', 'Skin Color', 'Eye Color', 'Height'];
	return isShowing
		? ReactDOM.createPortal(
				<div className='modal-overlay'>
					<div className='modal-wrapper'>
						<div className='modal'>
							<div className='modal-header'>
								<button type='button' className='modal-close-button' onClick={hide}>
									<span>&times;</span>
								</button>
							</div>
							<div className='modal-body'>
								<h1 className='character-name'>
									<span>
										<img src={Character} alt='' />
									</span>
									{name}
									<span>
										<img src={Character} alt='' />
									</span>
								</h1>
								<p className='character-description'>{data?.description}</p>
								<hr className='border' />
								<Table headers={tableHeaders} values={data?.properties} />
							</div>
						</div>
					</div>
				</div>,
				document.body
		  )
		: null;
};

export default Modal;
