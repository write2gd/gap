import { NgModule } from '@angular/core';
import { FooterSectionComponent } from './containers/footer-section/footer-section.component';
import { TranslationModule } from '../translation/translation.module';
import { Store } from '@ngrx/store';
import { registerModule } from '../translation/store/translation.actions';
import { TranslationState } from '../translation/store/translation.state';

@NgModule({
  imports: [TranslationModule],
  declarations: [FooterSectionComponent],
  exports: [FooterSectionComponent]
})
export class FooterModule {
  constructor(private store: Store<TranslationState>) {
    this.store.dispatch(registerModule({modulePath: 'core/footer'}));
  }
}
