import { NgModule } from '@angular/core';
import { Store } from '@ngrx/store';
import { JsvsSecurityModule } from '@jsvs/security';
import { oauthConfig } from './oauth.config';
import { OAuthModule, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { localStorageFactory, LocalStorageRefService } from '@jsvs/globals';
import { EnvironmentModule } from '../../environment/environment.module';
import { registerModule } from '../translation/store/translation.actions';
import { TranslationState } from '../translation/store/translation.state';
import { SecurityStoreModule } from './store/security-store.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

const modules = [
  EnvironmentModule,
  JsvsSecurityModule,
  SecurityStoreModule,
  OAuthModule.forRoot({
    resourceServer: {
      sendAccessToken: true
    }
  })
];

const providers = [
  {provide: OAuthStorage, useFactory: localStorageFactory, deps: [LocalStorageRefService]},
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];

@NgModule({
  imports: modules,
  providers,
  exports: [JsvsSecurityModule]
})
export class SecurityModule {
  constructor(private oAuthService: OAuthService, private store: Store<TranslationState>) {
    this.store.dispatch(registerModule({modulePath: 'core/security'}));
    this.oAuthService.configure(oauthConfig);
  }
}
