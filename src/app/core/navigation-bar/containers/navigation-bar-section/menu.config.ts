import { MenuItem } from './menu.model';

export const menuConfiguration: MenuItem[] = [
  {
    label: 'Match Combination',
    route: ['items'],
    authenticated: false,
    onClickCollapse: true,
  },
  {
    label: 'Page 2',
    route: ['newForm'],
    authenticated: false,
    onClickCollapse: true
  }
];
