import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationMissingPageComponent } from './configuration-missing-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ConfigurationMissingPageComponent', () => {
  let component: ConfigurationMissingPageComponent;
  let fixture: ComponentFixture<ConfigurationMissingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FontAwesomeModule ],
      declarations: [ ConfigurationMissingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationMissingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
