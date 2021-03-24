import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add/add.component';
import {FormsModule} from '@angular/forms';
import { KlassSelectComponent } from './klass-select/klass-select.component';


@NgModule({
  declarations: [AddComponent, KlassSelectComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ClazzModule {
}
