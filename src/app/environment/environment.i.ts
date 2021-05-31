export interface Environment {
  readonly host: string;
  readonly api: string;
  readonly oauth: {
    url: string,
    clientId: string;
  };
  readonly environmentName: string;
  loaded: boolean;
}
