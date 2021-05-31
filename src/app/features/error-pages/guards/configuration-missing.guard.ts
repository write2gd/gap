import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from '../../../environment/environment-static';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationMissingGuard implements CanActivate {
  constructor(private router: Router) {
  }

  public canActivate(): boolean {
    if (environment().loaded) {
      this.router.navigate(['/']);
    }
    return !environment().loaded;
  }
}
