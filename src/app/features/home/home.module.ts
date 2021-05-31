import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';

const components = [
  HomeComponent,
];

@NgModule({
  declarations: components,
  exports: components,
})
export class HomeModule {
}
