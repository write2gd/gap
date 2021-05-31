import { NgModule } from '@angular/core';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { CommonModule } from '@angular/common';
import { NavigationBarMenuItemComponent } from './components/navigation-bar-menu-item/navigation-bar-menu-item.component';
import { NavigationBarStoreModule } from './store/navigation-bar-store.module';
import { TranslationModule } from '../translation/translation.module';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationBarSectionComponent } from './containers/navigation-bar-section/navigation-bar-section.component';
import { Store } from '@ngrx/store';
import { TranslationState } from '../translation/store/translation.state';
import { registerModule } from '../translation/store/translation.actions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const modules = [
  CommonModule,
  NavigationBarStoreModule,
  TranslationModule,
  RouterModule,
  FontAwesomeModule
];

const components = [
  NavigationBarComponent,
  NavigationBarMenuItemComponent,
  NavigationBarSectionComponent
];

@NgModule({
  imports: modules,
  declarations: components,
  exports: [...components]
})
export class NavigationBarModule {
  constructor(private store: Store<TranslationState>) {
    this.store.dispatch(registerModule({modulePath: 'core/navigation-bar'}));
    library.add(faShoppingCart, faUser);
  }
}
