import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import {SpeechToTextComponent} from './features/items/containers/match-combination/match-combination.component';

const routes: Routes = [
  { path: '', component: SpeechToTextComponent },
  // { path: 'error', loadChildren: () => import('./features/error-pages/error-pages.module').then(module => module.ErrorPagesModule) },
  // { path: 'newForm', loadChildren: () => import('./features/newForm/newForm.module').then(module => module.NewFormModule)},
  // { path: 'items', loadChildren: () => import('./features/items/items.module').then(module => module.ItemsModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
