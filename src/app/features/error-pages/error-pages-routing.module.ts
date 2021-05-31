import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationMissingPageComponent } from './containers/configuration-missing-page/configuration-missing-page.component';
import { ConfigurationMissingGuard } from './guards/configuration-missing.guard';

const routes: Routes = [
  { path: 'config-missing', component: ConfigurationMissingPageComponent, canActivate: [ConfigurationMissingGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ErrorPagesRoutingModule { }
