import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VideoAnalyzerComponent} from './home/video-analyzer.component';
import {SpeechToTextComponent} from './stt/match-combination.component';

const routes: Routes = [
  { path: '', component: VideoAnalyzerComponent },
  { path: 'speechToText', component: SpeechToTextComponent },
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
