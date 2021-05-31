import { AuthConfig } from '@jsvs/security';
import { environment } from '../../environment/environment-static';

export const oauthConfig: AuthConfig = {
  clientId: environment().oauth.clientId,
  issuer: environment().oauth.url,
  loginUrl: `${environment().oauth.url}/as/authorization.oauth2`,
  logoutUrl: `${environment().oauth.url}/idp/startSLO.ping?TargetResource=${encodeURIComponent(environment().host)}`,
  redirectUri: environment().host,
  silentRefreshRedirectUri: `${environment().host}/silent_refresh.html`,
  customQueryParams: {
    display: 'page'
  }
};
