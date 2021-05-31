import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { HttpErrorInterceptor } from '../http/http-error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpEffects } from './store/http.effects';

@NgModule({
  imports: [
    EffectsModule.forFeature([HttpEffects])
  ]
})
export class HttpModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: HttpModule,
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
      ]
    };
  }
}
