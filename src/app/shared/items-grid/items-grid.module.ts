import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ItemsGridComponent } from './items-grid.component';

@NgModule({
  imports: [
    CommonModule,
    GridModule,
    FontAwesomeModule
  ],
  declarations: [ItemsGridComponent],
  exports: [ItemsGridComponent],
})
export class ItemsGridModule {
  constructor() {
    library.add(faChevronUp, faChevronDown);
  }
}
