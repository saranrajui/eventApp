import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Event Management | Home';
  breadCrumb;
  constructor( private _activatedRoute: ActivatedRoute, private _router: Router){
    this._router.events
      .filter(e => e instanceof NavigationEnd)
      .forEach(e => {
        this.breadCrumb = this._activatedRoute.root.firstChild.snapshot.data['breadCrumb'];
    });
  }
  ngOnInIt() {

  }
}
