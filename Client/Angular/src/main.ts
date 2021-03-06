import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { ObservableStore } from '@codewithdan/observable-store';
import { ReduxDevToolsExtension } from '@codewithdan/observable-store-extensions';

if (environment.production) {
  enableProdMode();
}

// Set ObservableStore globalSettings here since 
// it'll be called before the rest of the app loads
ObservableStore.globalSettings = { 
  isProduction: environment.production,
  trackStateHistory: !environment.production,
  logStateChanges: !environment.production
};

// Optional: Initialize store state
ObservableStore.initializeState({});

// Add Redux DevTools extensions support
if (!environment.production) {
  ObservableStore.addExtension(new ReduxDevToolsExtension({ router: Router, ngZone: NgZone }));
}

platformBrowser()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
