import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { Store } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppStoreModule } from './store/app-store.module';
import { TranslationState } from './core/translation/store/translation.state';
import { registerModule } from './core/translation/store/translation.actions';
import { HomeModule } from './features/home/home.module';
import 'hammerjs';
import {ItemsModule} from './features/items/items.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const modules = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  AppStoreModule,
  CoreModule,
  ItemsModule,
  NgbModule,
  HomeModule
];

@NgModule({
  imports: modules,
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private store: Store<TranslationState>) {
    this.store.dispatch(registerModule({modulePath: ''}));
  }
}
