export interface MenuItem {
  readonly label: string;
  readonly route: string[];
  readonly authenticated: boolean;
  readonly onClickCollapse?: boolean;
}
