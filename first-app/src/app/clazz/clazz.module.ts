import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add/add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { KlassSelectComponent } from './klass-select/klass-select.component';
import { ClazzComponent } from './clazz.component';
import { PageComponent } from './page/page.component';


@NgModule({
  declarations: [AddComponent, KlassSelectComponent, ClazzComponent, PageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClazzModule {
}
