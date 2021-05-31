import { TestBed, inject } from '@angular/core/testing';
import globalThis from 'core-js/es7/globalThis';
import { ConfigurationMissingGuard } from './configuration-missing.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ConfigurationMissingGuard', () => {
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [ConfigurationMissingGuard]
    });
    router = TestBed.get(Router);
    spyOn(router, 'navigate');
  });

  beforeEach(() => {
    globalThis['__env'] = {
      host: '',
      api: '',
      oauth: {
        url: '',
        clientId: ''
      },
      environmentName: '',
      loaded: false
    };
  });

  it('should allow CanActivate if configuration wasn\'t loaded',
    inject([ConfigurationMissingGuard], (guard: ConfigurationMissingGuard) => {
      expect(guard.canActivate()).toEqual(true);
    }));

  it('should redirect to default path if configuration was loaded',
    inject([ConfigurationMissingGuard], (guard: ConfigurationMissingGuard) => {
      globalThis['__env'] = {
        host: '',
        api: '',
        oauth: {
          url: '',
          clientId: ''
        },
        environmentName: '',
        loaded: true
      };
      expect(guard.canActivate()).toEqual(false);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    }));
});
