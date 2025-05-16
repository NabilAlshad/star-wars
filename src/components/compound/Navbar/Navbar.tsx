import React from 'react';
import './Navbar.scss';
import Navlogo from '@assets/navlogo.png';

const Navbar = () => {
	return (
		<div className='navbar'>
			<img className='logo' src={Navlogo} alt='Navbar logo' />
		</div>
	);
};

export default Navbar;
