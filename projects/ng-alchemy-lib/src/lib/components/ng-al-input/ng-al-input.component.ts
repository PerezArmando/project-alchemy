import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'ng-al-input',
	templateUrl: './ng-al-input.component.html',
	styleUrls: ['./ng-al-input.component.scss']
})
export class NgAlInputComponent {
	@Output()
	public valueEmitter: EventEmitter<string> = new EventEmitter<string>();

	@ViewChild('input')
	public input: ElementRef;

	@Input()
	public transparent: boolean = false;

	@Input()
	public type: string;

	@Input()
	public value: any;

	@Input()
	public autofocus: boolean = false;

	@Input()
	public useWholeWidth: boolean = false;

	ngAfterViewInit(): void {
		this.setInputAsFocused();
	}

	private setInputAsFocused(): void {
		if (this.autofocus) {
			this.input.nativeElement.focus();
		}
	}

	public onBlur(): void {
		this.valueEmitter.emit(this.input.nativeElement.value);
	}
}
