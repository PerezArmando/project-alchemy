import { Component, Input, OnInit } from '@angular/core';
import { Column, Dimensions, Row, EditionConfig, Cell, SortingConfig } from './ng-al-data-table.model';

@Component({
	selector: 'ng-al-data-table',
	templateUrl: './ng-al-data-table.component.html',
	styleUrls: ['./ng-al-data-table.component.scss']
})
export class NgAlDataTableComponent<T extends Row> implements OnInit {
	@Input()
	public columns: Column[] = [];

	@Input()
	public rows: T[];

	@Input()
	public dimensions: Dimensions = {};

	@Input()
	public editionConfig: EditionConfig = {
		editingEnabled: true,
		isWholeRowEdit: false
	};

	@Input()
	public sortingConfig: SortingConfig = {};

	@Input()
	set selectionMode(mode: 'checkbox' | 'multiple' | 'single' | 'none') {
		this.showCheckboxes = mode === 'checkbox';
		this._selectionMode = mode;
	}

	@Input()
	set contentAlignment(option: 'left' | 'right' | 'center') {
		this._contentAlignment[`content-to-${option}`] = true;
	}

	get contentAlignment() {
		return this._contentAlignment;
	}

	get selectionMode() {
		return this._selectionMode;
	}

	public showCheckboxes: boolean = false;

	public topCheckboxChecked: boolean = false;

	private _selectionMode: any = 'none';
	private _contentAlignment: any = { 'justify-content': 'center' };

	ngOnInit() {
		this.addOutsideTableAreaClickEvent();
		this.setTopCheckboxAsCheckedOrNot(this.areAllRowsAreChecked());
	}

	private addOutsideTableAreaClickEvent(): void {
		document.addEventListener('click', () => {
			if (this.editionConfig.isWholeRowEdit && !this.isRowNotAllocated()) {
				this.editionConfig.currRowIdBeingEdited.edit = false;
				this.editionConfig.currRowIdBeingEdited = null;
			}
		});
	}

	private areAllRowsAreChecked(): boolean {
		return this.rows.filter((row: Row) => row.checked).length === this.rows.length;
	}

	private setTopCheckboxAsCheckedOrNot(checked: boolean): void {
		this.topCheckboxChecked = checked;
	}

	public onCheckboxClicked(checked: boolean, row: Row): void {
		row.checked = checked;
		this.topCheckboxChecked = this.areAllRowsAreChecked();
	}

	public onTopCheckboxClicked(checked: boolean): void {
		this.rows.forEach((row: Row) => (row.checked = checked));
	}

	public onRowBeingClicked(event: Event, row: Row, column: Column): void {
		event.stopPropagation();
		this.switchEditionState(row, column);
	}

	public switchEditionState(row: Row, column: Column): void {
		if (this.editionConfig.editingEnabled) {
			if (this.editionConfig.isWholeRowEdit) {
				this.isRowToBeSwitched(row);
			} else {
				const cellName: string = `${column.key}_${row.id}`;
				row[cellName] = row[cellName] === undefined ? new Cell(true) : !row[cellName];
			}
		}
	}

	private isRowToBeSwitched(row: Row): void {
		if (this.isRowNotAllocated()) {
			this.editionConfig.currRowIdBeingEdited = row;
		}

		if (this.editionConfig.currRowIdBeingEdited.id !== row.id) {
			this.editionConfig.currRowIdBeingEdited.edit = false;
		}

		this.editionConfig.currRowIdBeingEdited = row;
		row.edit = true;
	}

	private isRowNotAllocated(): boolean {
		return this.editionConfig.currRowIdBeingEdited === undefined || this.editionConfig.currRowIdBeingEdited === null;
	}

	public onBlurTableInputCell(value: any, row: T, column: Column, switchState: boolean = true): void {
		row[column.key] = value;
		if (switchState) {
			this.switchEditionState(row, column);
		}
	}
}
