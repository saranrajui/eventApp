import { Injectable } from '@angular/core';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn : 'root',
})
  export class sharedService {
    private API_END_POINT = environment.API_ENDPOINT;
    collectionAsSubject$: BehaviorSubject<any> = new BehaviorSubject([]);
    constructor() {}


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
  }
