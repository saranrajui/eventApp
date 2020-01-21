import {
    HttpClient,
    HttpErrorResponse, HttpHeaders
  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/model/userlist.model';
import { EventObj } from 'src/app/shared/model/eventlist.model';


@Injectable({
  providedIn : 'root',
})
  export class HttpService {
    private API_END_POINT = environment.API_ENDPOINT;
    collectionAsSubject$: BehaviorSubject<any> = new BehaviorSubject([]);
    constructor(private _http: HttpClient) {}

    /**
     * HTTP Get call
     * @param  {string} URL
     */

    public get = (URL: string): Observable<any> => {
      const expandedHeaders = this.prepareHeader(null);
      return this._http.get ( URL, expandedHeaders);
    }

    /**
     * To get resource from same workspace 
     */
    public getJSON = (fileName: string): Observable<any> => {
      return this._http.get(`../../../assets/json/${fileName}.json`);
    }
    /**
     * HTTP Post call
     * @param  {string} url
     * @param  {any} body
     */
    public post = (url: string, body: any): Observable<any> => {
      const expandedHeaders = this.prepareHeader(null, url, 'Post');
      return this._http.post(`${this.API_END_POINT}` + url, body, expandedHeaders)
      .catch(this.handleError);
    }

    /**
     * @param  {string} url
     * @param  {string} body
     */
    public deleteData = (url: string, body: string | any): Observable<any> => {
      return this._http.delete(`${this.API_END_POINT}` + url + body)
      .catch(this.handleError);
    }

    /**
     * Remove data from local store
     */
    public deleteFromStore = (record: User): Observable<any> => {
      let updatedCollection: User[];
      if ( record ) {
        const collection = JSON.parse(localStorage.getItem('data'));
        for ( let index = 0; index < collection.length; index++ ) {
          if ( collection[index].Id === record.Id ) {
            collection.splice ( index, 1);
            updatedCollection = collection;
          }
        }
      }
      return new Observable( observer => {
        observer.next(updatedCollection);
      });

    }

    /**
     * Save Event related data to store with different use cases
     */
    public putEventDataToStore = (key: string, data: any) => {
      let ExistingCollection;
      // tslint:disable-next-line: no-unused-expression
      return new Promise ((resolve, reject) => {
        if (data) {
        const isDataPresent = localStorage.getItem(key);
        if ( isDataPresent ) {
          ExistingCollection = JSON.parse(localStorage.getItem(key));
          ExistingCollection.push(data[0]);
          localStorage.setItem(key, this.IsJSON(data) || Array.isArray(data) ? JSON.stringify(ExistingCollection) : data );
        } else {
          localStorage.setItem(key, this.IsJSON(data) || Array.isArray(data) ? JSON.stringify(data) : data);
        }
        resolve(data);
      } else {
        reject();
      }
    });
    }

    /**
     * @param  {HttpErrorResponse} error
     */
    public handleError = (error: HttpErrorResponse) => {
      return throwError(error);
    }

    /**
     * @param  {HttpHeaders|null} headers
     */
    private prepareHeader = (
        headers: HttpHeaders | null,
        url: string = '',
        method: string = '' ) => {
        headers = headers || new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');
        return { headers };
        }

        /**
         * Utility to findout the param is valid Object
         */
      public IsJSON = ( data ) => {
        try {
            JSON.parse(data);
        } catch (e) {
            return false;
        }
        return true;
    }
  }
