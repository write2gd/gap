import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCombinationComponent } from './match-combination.component';
import { ItemsService } from '../../items.service';
import { mockService } from '../../../../../tests/mocked-services';
import { of } from 'rxjs';

describe('MatchCombinationComponent', () => {
  let component: MatchCombinationComponent,
      fixture: ComponentFixture<MatchCombinationComponent>,
      itemsService: ItemsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchCombinationComponent ],
      providers: [
        {provide: ItemsService, useValue: mockService(ItemsService)}
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(MatchCombinationComponent, '')
      .createComponent(MatchCombinationComponent);

    component = fixture.componentInstance;
    itemsService = TestBed.get(ItemsService);

    (itemsService.getItems as jasmine.Spy).and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
