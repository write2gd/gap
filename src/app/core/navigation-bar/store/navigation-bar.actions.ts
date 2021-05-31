import { createAction, props, union } from '@ngrx/store';

export const navigationBarFeatureName: string = 'navigationBar';

export const openMenu = createAction(
  `[${navigationBarFeatureName}] Menu Open`,
  props<{menuOpened: boolean}>()
);
const allActions = union({openMenu});
export type NavigationBarActions = typeof allActions;
