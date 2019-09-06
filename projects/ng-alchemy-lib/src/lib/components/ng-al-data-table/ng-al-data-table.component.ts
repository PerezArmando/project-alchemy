import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Column, Dimensions, Row, EditionConfig, Cell, Settings, SelectionMode, ContentAlignment } from './ng-al-data-table.model';

@Component({
	selector: 'ng-al-data-table',
	templateUrl: './ng-al-data-table.component.html',
	styleUrls: ['./ng-al-data-table.component.scss']
})
export class NgAlDataTableComponent<T extends Row> implements OnInit, AfterViewInit {
	@Input()
	public columns: Column[] = [];

	@Input()
	public rows: T[] = [];

	@Input()
	public dimensions: Dimensions = {};

	@Input()
	set editionConfig(config: EditionConfig) {
		this.settings.editionConfig = config;
	}

	@ViewChild('headerRow') headerRow: ElementRef;

	get editionConfig() {
		return this.settings.editionConfig;
	}

	@Input()
	set sortingConfig(config: any) {
		this.settings.sortingConfig = config;
	}

	get sortingConfig() {
		return this.settings.sortingConfig;
	}

	@Input()
	set selectionModeConfig(selectionMode: SelectionMode) {
		this.showCheckboxes = selectionMode === ('checkbox' as SelectionMode);
		this.settings.selectionMode = selectionMode as SelectionMode;
	}

	get selectionModeConfig() {
		return this.settings.selectionMode;
	}

	@Input()
	set contentAlignmentConfig(alignment: ContentAlignment) {
		this.settings.contentAlignmentConfig = alignment;
	}

	get contentAlignmentConfig() {
		return this.settings.contentAlignmentConfig;
	}

	public headerCellConfig(columnKey: string) {
		const config = { [this.contentAlignmentConfig]: true, 'column-header': !!this.sortingConfig[columnKey] };

		if (this.hasScrollBar && this.columns[this.columns.length - 1].key === columnKey) {
			config['last-column-margin'] = true;
		}

		return config;
	}

	public showCheckboxes: boolean = false;
	public topCheckboxChecked: boolean = false;
	public hasScrollBar: boolean = false;
	private settings: Settings = new Settings();

	ngOnInit() {
		this.addOutsideTableAreaClickEvent();
		this.setTopCheckboxAsCheckedOrNot(this.areAllRowsAreChecked());
	}

	ngAfterViewInit() {
		this.alignColumnHeaders();
	}

	private alignColumnHeaders() {
		const rowHeight: number = 36;

		this.hasScrollBar =
			!!this.dimensions.height &&
			!!this.rows.length &&
			navigator.platform.includes('Win') &&
			this.rows.length * rowHeight > Number(this.dimensions.height.split('px')[0]);
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

	private performSort(columnKey: string): void {
		const currDirection = this.settings.sortingConfig[columnKey].direction;
		this.settings.sortingConfig[columnKey].direction = currDirection === 'down' ? 'up' : 'down';

		if (!this.settings.sortingConfig[columnKey].sorting) {
			this.defaultSort(columnKey, this.settings.sortingConfig[columnKey].direction);
		}
	}

	public onColumnHeaderClicked(columnKey: string): void {
		if (!!this.settings.sortingConfig[columnKey]) {
			this.performSort(columnKey);
		}
	}

	private defaultSort(columnKey: string, direction: string): void {
		const type: any = this.settings.sortingConfig[columnKey].type;
		this.rows.sort((rowA, rowB) => {
			const determinant: number = direction === 'up' ? -1 : 1;
			if (type(rowA[columnKey]) < type(rowB[columnKey])) {
				return -1 * determinant;
			} else if (type(rowA[columnKey]) > type(rowB[columnKey])) {
				return 1 * determinant;
			}
			return 0;
		});
	}
}
