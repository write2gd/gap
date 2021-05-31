import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterModule } from './footer/footer.module';
import { SecurityModule } from './security/security.module';
import { JsvsCacheModule } from '@jsvs/cache';
import { TranslationModule } from './translation/translation.module';
import { NotificationModule } from './notification/notification.module';
import { TranslateModule } from '@ngx-translate/core';
import { JsvsWebStorageModule } from '@jsvs/web-storage';
import { EnvironmentModule } from '../environment/environment.module';
import { NavigationBarModule } from './navigation-bar/navigation-bar.module';
import { HttpModule } from './http/http.module';

const modules = [
  EnvironmentModule,
  BrowserAnimationsModule,
  NavigationBarModule,
  FooterModule,
  SecurityModule,
  JsvsCacheModule.configure({
    prefix: 'jsvs.',
    expire: 3600
  }),
  TranslationModule,
  TranslateModule.forRoot(),
  NotificationModule,
  JsvsWebStorageModule.forRoot(),
  HttpModule
];

const exported = [
  TranslationModule,
  NotificationModule,
  NavigationBarModule,
  FooterModule,
  EnvironmentModule
];

@NgModule({
  imports: modules,
  exports: exported
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
