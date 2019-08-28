import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ng-al-checkbox',
    templateUrl: 'ng-al-checkbox.component.html',
    styleUrls: ['ng-al-checkbox.component.scss']
})
export class NgAlCheckboxComponent {
    @Output()
    public onCheckboxClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

    public onCheckboxChanged(checked: boolean) {
        this.checked = checked;
        this.onCheckboxClicked.emit(this.checked);
    }

    @Input()
    public checked: boolean = false;
}