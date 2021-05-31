import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'jsvs-navigation-bar-menu-item',
  templateUrl: './navigation-bar-menu-item.component.html',
  styleUrls: ['./navigation-bar-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarMenuItemComponent {
  @Input() onClickCollapse: boolean = true;
  @Output() clickEmitter: EventEmitter<boolean> = new EventEmitter();

  @HostBinding('attr.tabindex') tabindex: string = '';

  onClick(event: Event): void {
    event.preventDefault();
    this.clickEmitter.emit(this.onClickCollapse);
  }
}
