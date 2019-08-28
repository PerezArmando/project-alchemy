import { NgModule } from "@angular/core";
import {
  NgAlDataTableComponent,
  NgAlCheckboxComponent,
  NgAlInputComponent
} from "./components";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

const components = [
  NgAlDataTableComponent,
  NgAlCheckboxComponent,
  NgAlInputComponent
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, FormsModule],
  exports: [...components]
})
export class NgAlchemyLibModule {}
