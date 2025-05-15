import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

jest.mock('@assets/swordsman.png', () => 'mocked-character.png');
jest.mock('../../../assets/single_cover.jpeg', () => 'mocked-cover.jpg');

jest.mock('@root/Table/Table', () => (props: any) => {
	return <div data-testid='table'>Mocked Table with headers: {props.headers.join(', ')}</div>;
});

describe('Modal component', () => {
	const mockData = {
		description: 'A brave warrior from the galaxy.',
		properties: {
			gender: 'male',
			skin_color: 'fair',
			eye_color: 'blue',
			height: '180',
		},
	};

	const defaultProps = {
		isShowing: true,
		name: 'Luke Skywalker',
		hide: jest.fn(),
		data: mockData,
	};

	test('does not render if isShowing is false', () => {
		const { container } = render(<Modal {...defaultProps} isShowing={false} />);
		expect(container).toBeEmptyDOMElement();
	});

	test('renders modal with character data', () => {
		render(<Modal {...defaultProps} />);
		expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
		expect(screen.getByText('A brave warrior from the galaxy.')).toBeInTheDocument();
		expect(screen.getByTestId('table')).toHaveTextContent('Gender, Skin Color, Eye Color, Height');
	});

	test('calls hide when close button is clicked', () => {
		render(<Modal {...defaultProps} />);
		const closeButton = screen.getByRole('button');
		fireEvent.click(closeButton);
		expect(defaultProps.hide).toHaveBeenCalledTimes(1);
	});
});
