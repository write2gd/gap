import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationMissingPageComponent } from './containers/configuration-missing-page/configuration-missing-page.component';
import { ErrorPagesRoutingModule } from './error-pages-routing.module';
import { Store } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { TranslationState } from '../../core/translation/store/translation.state';
import { registerModule } from '../../core/translation/store/translation.actions';


@NgModule({
  declarations: [ConfigurationMissingPageComponent],
  imports: [
    CommonModule,
    ErrorPagesRoutingModule,
    FontAwesomeModule
  ]
})
export class ErrorPagesModule {
  constructor(private store: Store<TranslationState>) {
    this.store.dispatch(registerModule({modulePath: 'features/error-pages'}));
    library.add(faCogs);
  }
}
