import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './Table';

describe('Table component', () => {
	const headers = ['Gender', 'Skin Color', 'Eye Color', 'Height'];
	const values = {
		gender: 'male',
		skin_color: 'fair',
		eye_color: 'blue',
		height: '180',
	};

	test('renders the table with headers', () => {
		render(<Table headers={headers} values={values} />);

		headers.forEach((header) => {
			expect(screen.getByRole('columnheader', { name: header })).toBeInTheDocument();
		});
	});

	test('renders the correct row data', () => {
		render(<Table headers={headers} values={values} />);

		expect(screen.getByText('male')).toBeInTheDocument();
		expect(screen.getByText('fair')).toBeInTheDocument();
		expect(screen.getByText('blue')).toBeInTheDocument();
		expect(screen.getByText('180m')).toBeInTheDocument();
	});

	test('table has role region for accessibility', () => {
		render(<Table headers={headers} values={values} />);
		expect(screen.getByRole('region')).toBeInTheDocument();
	});
});
