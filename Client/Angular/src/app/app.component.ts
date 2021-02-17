import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { UserSettingsService } from './core/services/user-settings.service';
import { Theme } from './shared/enums';
import { UserSettings } from './shared/interfaces';
import { Observable, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AADAuthService } from './core/services/aad-auth.service';
import { SubSink } from 'subsink';
import { TeamsAuthService } from './core/services/teams-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  teamsInitialized = false;
  customersLength$: Observable<number>;
  userSettings$: Observable<UserSettings>;
  subsink: SubSink = new SubSink();
  isLoggedIn = false;

  constructor(@Inject(DOCUMENT) private document: HTMLDocument,  
    private router: Router,
    private aadAuthService: AADAuthService,
    private teamsAuthService: TeamsAuthService,
    private userSettingsService: UserSettingsService) { }

  ngOnInit() {
    this.isLoggedIn = this.aadAuthService.loggedIn;
    this.getUserSettings();

    this.subsink.sink = this.aadAuthService.authChanged$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.getUserSettings();
    });

    this.subsink.sink = this.teamsAuthService.teamsInitialized
      .subscribe((initialized: boolean) => {
          this.teamsInitialized = initialized;
          this.getUserSettings();
      });
  }

  getUserSettings() {
    if (this.isLoggedIn) {
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
  }

  logout() {
    if (this.aadAuthService.loggedIn) {
        this.aadAuthService.logout();
    }
    this.redirectToLogin();
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  updateTheme(userSettings: UserSettings) {      
      this.document.documentElement.className = (userSettings && userSettings.theme === Theme.Dark) ? 'dark-theme' : 'light-theme';
      return userSettings;
  }

  ngOnDestroy() {
    this.subsink.unsubscribe();
  }

}