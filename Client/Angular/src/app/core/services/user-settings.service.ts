import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Theme, Actions } from '../../shared/enums';
import { ObservableStore } from '@codewithdan/observable-store';
import { StoreState, UserSettings } from '../../shared/interfaces';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService extends ObservableStore<StoreState> {

  apiUrl = 'api/userSettings/';

  constructor(private http: HttpClient) {
    // Can add a stateSliceSelector to filter all incoming data to stateChanged, etc.
    super({ /* stateSliceSelector: state => state.userSettings */ });
  }

  getUserSettings() : Observable<UserSettings> {
    return this.http.get<UserSettings>(this.apiUrl)
      .pipe(
        map(userSettings => {
          this.setState({ userSettings }, Actions.SetUserSettings, false); // false will stop stageChanged notifications from going out
          return userSettings;
        }),
        catchError(this.handleError)
      );
  }

  updateUserSettings(userSettings: UserSettings) {
    return this.http.put(this.apiUrl + userSettings.id, userSettings)
        .pipe(
            switchMap(settings => {
                // update local store with updated settings data
                // not required of course unless the store cache is needed 
                this.setState( { userSettings }, Actions.UpdateUserSettingsTheme);
                return this.getUserSettings();
            }),
            catchError(this.handleError)
        );
  }

  userSettingsChanged() : Observable<UserSettings> {
    return this.stateChanged
      .pipe(
        // stateSliceSelector could be added to UserSettingsService contructor to filter the store down to userSettings
        map(stateChange => {
          if (stateChange && stateChange.userSettings) {
            return stateChange.userSettings;
          }
        }) 
      );
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'Server error');
  }
}
