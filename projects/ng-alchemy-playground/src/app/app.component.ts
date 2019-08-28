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

	public rows: User[] = [
		{
			id: 1,
			firstName: 'Cesar',
			lastName: 'Perez',
			age: 28,
			checked: true
		},
		{
			id: 2,
			firstName: 'Lyza',
			lastName: 'Parra',
			age: 26,
			checked: true
		},
		{
			id: 3,
			firstName: 'Cesar',
			lastName: 'Perez',
			age: 28,
			checked: true
		},
		{
			id: 4,
			firstName: 'Lyza',
			lastName: 'Parra',
			age: 26,
			checked: true
		},
		{
			id: 5,
			firstName: 'Cesar',
			lastName: 'Perez',
			age: 28,
			checked: true
		},
		{
			id: 6,
			firstName: 'Cesar',
			lastName: 'Perez',
			age: 28,
			checked: true
		}
	];
}
