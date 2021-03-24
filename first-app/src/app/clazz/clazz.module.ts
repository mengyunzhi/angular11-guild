import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add/add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { KlassSelectComponent } from './klass-select/klass-select.component';


@NgModule({
  declarations: [AddComponent, KlassSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClazzModule {
}
