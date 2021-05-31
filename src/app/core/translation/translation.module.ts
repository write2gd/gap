import { NgModule } from '@angular/core';
import { JsvsTranslationModule } from '@jsvs/translation';
import { TranslationStoreModule } from './store/translation-store.module';
import { translationConfig } from './translation.config';

@NgModule({
  imports: [
    JsvsTranslationModule.configure(translationConfig),
    TranslationStoreModule
  ],
  exports: [JsvsTranslationModule]
})
export class TranslationModule {
}
