import { Component } from '@angular/core';

interface Row {
	id?: number | string;
	checked?: boolean;
}

interface User extends Row {
	firstName: string;
	lastName: string;
	age: number;
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public columns = [{ key: 'firstName', label: 'First Name' }, { key: 'lastName', label: 'Last Name' }, { key: 'age', label: 'Age' }];

	public sortingConfig = {
		firstName: {
			sorting: () => {},
			direction: 'down'
		},
		age: {
			sorting: () => {},
			direction: 'down'
		}
	};

	public rows: User[] = [
		{
			id: 1,
			firstName: 'Anderson',
			lastName: 'Contreras',
			age: 28,
			checked: true
		},
		{
			id: 2,
			firstName: 'Nilson',
			lastName: 'Trejo',
			age: 27,
			checked: true
		},
		{
			id: 3,
			firstName: 'Cesar',
			lastName: 'Perez',
			age: 26,
			checked: true
		},
		{
			id: 4,
			firstName: 'Geronimo',
			lastName: 'Diaz',
			age: 25,
			checked: true
		},
		{
			id: 5,
			firstName: 'Jose',
			lastName: 'Fajardo',
			age: 24,
			checked: true
		},
		{
			id: 6,
			firstName: 'Jesus',
			lastName: 'Jimenez',
			age: 23,
			checked: true
		}
	];
}
