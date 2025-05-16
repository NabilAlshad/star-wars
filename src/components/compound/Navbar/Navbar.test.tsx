import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

jest.mock('@assets/navlogo.png', () => 'navlogo.png');

describe('Navbar', () => {
	it('renders the logo image with correct alt text', () => {
		render(<Navbar />);
		const logo = screen.getByAltText('Navbar logo');
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('src', 'navlogo.png');
	});
});
