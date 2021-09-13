import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Card } from './components/Card';

describe('Card component', () => {
	const country = {
		id: 'ARG',
		name: 'Argentina',
		flag: 'https://restcountries.eu/data/arg.svg',
		region: 'Americas',
		capital: 'Buenos Aires',
		subregion: 'South America',
		area: 2780400,
		population: '43590400'
	};
	const component = render(
		<Card
			flag={country.flag}
			name={country.name}
			region={country.region}
			population={country.population}
		/>
	);
	test('Card component renders the country name', () => {
		//console.log(component);
		//component.debug();
		expect(component.container).toHaveTextContent(country.name);
	});
});

/*
describe('<Activity /> Page', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Activity />);
	});
	it('form should have an input with name "name" and type "text"', () => {
		const { container } = render(<Activity />);
		const element = container.querySelectorAll('input')[0];
		expect(element.type).toBe('text');
		expect(element.name).toBe('name');
	});
});
*/

/* describe('Activity page', () => {
	it('should display a title', () => {
		render(<NavBar />);
		expect(screen.queryByText(/Countries/i)).toBeInTheDocument();
	});
}); */

/*
describe('<Activity /> Mounted', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Activity />);
	});

	it('Form should have a name "name" and a type "text"', () => {
		const { container } = render(<Activity />);
		const element = container.querySelectorAll('input')[0];
		expect(element.type).toBe('text');
		expect(element.name).toBe('name');
	});

});
*/
