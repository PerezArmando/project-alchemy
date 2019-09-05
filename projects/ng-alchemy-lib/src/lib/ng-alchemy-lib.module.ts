import { NgModule } from '@angular/core';
import { NgAlDataTableComponent, NgAlCheckboxComponent, NgAlInputComponent } from './components';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

const components = [NgAlDataTableComponent, NgAlCheckboxComponent, NgAlInputComponent];

@NgModule({
	declarations: [...components],
	imports: [CommonModule, FormsModule, AngularFontAwesomeModule],
	exports: [...components]
})
export class NgAlchemyLibModule {}
