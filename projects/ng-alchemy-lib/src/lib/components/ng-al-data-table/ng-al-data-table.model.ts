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

export interface SortingConfig {}

export interface Row {
	id: number | string;
	checked?: boolean;
	edit?: boolean;
}
