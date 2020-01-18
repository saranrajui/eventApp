import { Injectable } from '@angular/core';

@Injectable()
export class AppConstant {

  public apiDateFormat = 'YYYY-MM-DDTHH:mm:ss';
}
export enum EventType {
    User = 1,
}