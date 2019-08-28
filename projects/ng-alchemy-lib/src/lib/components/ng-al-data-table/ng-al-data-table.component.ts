import { Component, Input, OnInit } from '@angular/core';
import { Column, Dimensions, Row } from './ng-al-data-table.model';

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
    set selectionMode(mode: 'checkbox' | 'multiple' | 'single' | 'none') {
        this.showCheckboxes = (mode === 'checkbox');
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
        this.setTopCheckboxAsCheckedOrNot(this.areAllRowsAreChecked());
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
        this.rows.forEach((row: Row) => row.checked = checked);
    }
}