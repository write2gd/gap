import { NgModule } from '@angular/core';
import { environment } from './environment-static';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule
  ]
})
export class EnvironmentModule {
  constructor(private router: Router) {
    if (!environment().loaded) {
      this.router.navigate(['error', 'config-missing']);
    }
  }
}
