import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultIfEmpty, map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { login, logout } from '../../../security/store/security.actions';
import { MenuItem } from './menu.model';
import { menuConfiguration } from './menu.config';
import { version } from '../../../../../environments/version';
import { User, JsvsUserService } from '@jsvs/security';
import { environment } from '../../../../environment/environment-static';
import { menuOpenSelector } from '../../store/navigation-bar.selectors';
import { currentUserSelector } from '../../../security/store/security.selectors';
import { getRouterStateSelector } from '../../../../store/app.selectors';
import { AppState } from '../../../../store/app.state';
import { openMenu } from '../../store/navigation-bar.actions';
import { BaseRouterStoreState, SerializedRouterStateSnapshot } from '@ngrx/router-store';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'jsvs-navigation-bar-section',
  templateUrl: './navigation-bar-section.component.html',
  styleUrls: ['./navigation-bar-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarSectionComponent implements OnInit {
  public environmentName: string;
  public menuOpen$: Observable<boolean>;
  public menuConfig: MenuItem[] = menuConfiguration;
  public mobileTitle$: Observable<string>;
  public user$: Observable<User>;
  public version: string;

  private routerState$: Observable<BaseRouterStoreState>;

  constructor(private store: Store<AppState>,
              private userService: JsvsUserService) {
  }

  ngOnInit(): void {
    this.menuOpen$ = this.store.select(menuOpenSelector);
    this.routerState$ = this.store.select(getRouterStateSelector);
    this.user$ = this.store.select(currentUserSelector);
    this.mobileTitle$ = this.routerState$.pipe(
      map((routerState: SerializedRouterStateSnapshot) => routerState && routerState.root),
      mergeMap(routerState => this.getMobileTitle(routerState).pipe(
        defaultIfEmpty('MENU.HOME')
      ))
    );
    this.environmentName = environment().environmentName;
    this.version = version;
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  login(): void {
    this.store.dispatch(login());
  }

  logout(): void {
    this.store.dispatch(logout());
  }

  menuOpenChange(menuOpened: boolean): void {
    this.store.dispatch(openMenu({menuOpened}));
  }

  private getMobileTitle(route: ActivatedRouteSnapshot): Observable<string> {
    return new Observable<string>(subscriber => {
      while (!!route && route.firstChild) {
        route = route.firstChild;
        if (route.data.mobileTitle) {
          subscriber.next(route.data.mobileTitle);
        }
      }
      subscriber.complete();
    });
  }

}
