import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';
import { NavigationBarMenuItemComponent } from '../navigation-bar-menu-item/navigation-bar-menu-item.component';
import { from } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'jsvs-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent implements AfterContentInit {
  @Input() mobileTitle: string;
  @Input() menuOpen: boolean;
  @Input() menuAriaLabel: string;

  @Output() menuOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ContentChild('header', {static: false}) headerTemplate?: TemplateRef<any>;
  @ContentChild('leftMenu', {static: false}) leftMenuTemplate?: TemplateRef<any>;
  @ContentChild('rightMenu', {static: false}) rightMenuTemplate?: TemplateRef<any>;
  @ContentChildren(NavigationBarMenuItemComponent) menuItems: QueryList<NavigationBarMenuItemComponent>;

  ngAfterContentInit(): void {
    this.menuItems.changes.pipe(
      mergeMap(menuItems => from(menuItems.toArray())),
      filter((menuItem: NavigationBarMenuItemComponent) => menuItem.onClickCollapse !== false),
      mergeMap((menuItem: NavigationBarMenuItemComponent) => menuItem.clickEmitter)
    ).subscribe(() => this.closeMenu());
  }

  toggleMenu(): void {
    this.menuOpenChange.emit(!this.menuOpen);
  }

  closeMenu(): void {
    this.menuOpenChange.emit(false);
  }
}
