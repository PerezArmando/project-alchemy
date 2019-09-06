export interface Column {
	key: string;
	label: string;
}

export interface Dimensions {
	height?: string;
	width?: string;
}

export class Cell {
	constructor(public edit: boolean) {}
}

export interface EditionConfig {
	editingEnabled?: boolean;
	isWholeRowEdit?: boolean;
	currRowIdBeingEdited?: Row;
}

export class SortingColumnConfig {
	columnKey?: string;
	direction?: 'up' | 'down' = 'down';
	sorting?: Function;
}

export interface SortingConfig {
	sortingEnabled?: boolean;
	onColumns?: SortingColumnConfig;
}

export interface Row {
	id: number | string;
	checked?: boolean;
	edit?: boolean;
}
