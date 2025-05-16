import React from 'react';
import './Table.scss';

const Table = (props): any => {
	const { headers, values } = props;
	return (
		<div className='table_component' role='region'>
			<table>
				<thead>
					<tr>
						{headers?.map((header: string, index: number) => (
							<th key={index} scope='col'>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{values?.gender}</td>
						<td>{values?.skin_color}</td>
						<td>{values?.eye_color}</td>
						<td>{values?.height}m</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Table;
