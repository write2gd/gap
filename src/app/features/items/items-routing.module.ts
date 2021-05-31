import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SpeechToTextComponent} from './containers/match-combination/match-combination.component';

const routes: Routes = [
  { path: '', component: SpeechToTextComponent, data: {mobileTitle: 'MENU.ITEMS'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule {
}
