import { Injectable } from '@angular/core';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { AppConstant } from 'src/app/app.constants';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn : 'root',
})
  export class sharedService {
    snackBarMsg;
    private API_END_POINT = environment.API_ENDPOINT;
    collectionAsSubject$: BehaviorSubject<any> = new BehaviorSubject([]);
    constructor(
      private _snackBar: MatSnackBar,
      private _appConstant: AppConstant,
    ) {
      this.snackBarMsg = this._appConstant.SAVEDSUCCESSMSG;
    }

    /**
     * arg (boolean) type
     * To Show/Hide Spinner
     */
    showLoader = (value: boolean) => {
        const main_container = document.getElementById('loadingIcon');
        const overlay = document.getElementById('overlay');
        if (value) {
            main_container.style.display = 'block';
            overlay.style.display = 'block';
        } else {
            main_container.style.display = 'none';
            overlay.style.display = 'none';
        }
    }

    openSnackBar(message: string) {
      this._snackBar.openFromComponent(SnackbarComponent, {
        data: message,
        duration: 7000
      });
    }
  }
