import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AppComponent } from './app.component';
import { TestStore } from '../tests/test.store';
import { TranslationState } from './core/translation/store/translation.state';
import { tryLogin } from './core/security/store/security.actions';

describe('AppComponent', () => {

  let component: AppComponent,
      fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: Store, useClass: TestStore}
      ]
    });

    fixture = TestBed
      .overrideTemplate(AppComponent, '')
      .createComponent(AppComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should be initialized and dispatch action TryLogin', async(() => {
    const store: Store<TranslationState> = TestBed.get(Store);
    expect(store.dispatch).toHaveBeenCalledWith(tryLogin());
  }));
});
