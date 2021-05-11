import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { TokenInterceptor } from './interceptors/token.interceptor';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
// Note that this won't work on mobile (iOS anyway) when in Teams
const isIFrame = window.self !== window.top;
// Check if we're running in Teams on mobile
const teamsMobile = navigator.userAgent.toLowerCase().includes('teamsmobile');

// If running in Teams don't include the MSAL interceptor
const msalProviders = (!isIFrame && !teamsMobile) ? {
  provide: HTTP_INTERCEPTORS,
  useClass: MsalInterceptor,
  multi: true
} : [];

const port = (window.location.port) ? ':' + window.location.port : '';
const url = `${window.location.protocol}//${window.location.hostname}${port}`;

@NgModule({
  imports: [
    CommonModule, RouterModule, HttpClientModule,
    MsalModule.forRoot({
      auth: {
        clientId: environment.appId,
        authority: environment.authority,
        redirectUri: url
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // set to true for IE 11
      },
    },
    {
      popUp: !isIE,
      consentScopes: [
        'user.read',
        'openid',
        'profile',
      ],
      protectedResourceMap: [
        ['https://graph.microsoft.com/v1.0/me', ['user.read']],
        ['https://learntogethercrm.ngrok.io/api/*', ['access_as_user']]
      ],
      extraQueryParameters: {}
    })
  ],
  exports: [RouterModule, HttpClientModule],
  providers: [
    msalProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: 'Window', useFactory: () => window }
  ] // these should be singleton
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {    // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

}



