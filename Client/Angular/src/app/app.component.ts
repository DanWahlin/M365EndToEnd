import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { CustomersService } from './customers/customers.service';
import { UserSettingsService } from './core/services/user-settings.service';
import { Theme } from './shared/enums';
import { UserSettings } from './shared/interfaces';
import { Observable, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AADAuthService } from './core/services/aad-auth.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  customersLength$: Observable<number>;
  userSettings$: Observable<UserSettings>;
  subsink: SubSink = new SubSink();

  constructor(@Inject(DOCUMENT) private document: HTMLDocument, 
    private aadAuthService: AADAuthService,
    private userSettingsService: UserSettingsService) { }

  ngOnInit() {
    this.subsink.sink = this.aadAuthService.authChanged$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.userSettings$ = merge(
          this.userSettingsService.getUserSettings(),     // Get initial data
          this.userSettingsService.userSettingsChanged()  // Handle any changes
            .pipe(
              // tap(userSettings => console.log('userSettingsChanged: ', userSettings)),
              map(userSettings => {
                return this.updateTheme(userSettings);
              })
            )
        );
      }
    });
  }

  updateTheme(userSettings: UserSettings) {      
      this.document.documentElement.className = (userSettings && userSettings.theme === Theme.Dark) ? 'dark-theme' : 'light-theme';
      return userSettings;
  }

  ngOnDestroy() {
    this.subsink.unsubscribe();
  }

}