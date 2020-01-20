import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatProgressBarModule, MatButtonToggleModule  } from '@angular/material';
import { HttpService } from 'src/app/core/services/http.service';
import { EventObj } from 'src/app/shared/model/eventlist.model';
import * as d3 from 'd3';
import * as $ from 'jquery';
import { sharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  organizer: string;
  company: string;
  about: string;
  scheduled: string;
  duration: string;
  capacity: number;
  allEventList = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource = new MatTableDataSource();
  
  public displayedColumns: string[] = [
    'organizer',
    'company',
    'about',
    'scheduled',
    'duration',
    'capacity',
    'action'
  ];
  eventObj = new EventObj();
  constructor(private _http: HttpService, private _sharedService: sharedService) {

    const listFromStore = this.fetchUserList();
    if (!listFromStore) {
      this.getEventList();
    }
  }

  isToggle = (event: any) => {
    console.log(event);
  }

  ngOnInit() {
    console.log(' ngOnInit - Event List');
  }
  ngAfterViewInit = () => {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 2500);
  }
  fetchUserList = () => {
    console.log('fetching from store');
    const list = localStorage.getItem('event-data');
    if (list) {
      this.renderView(list);
      return true;
    }
    return false;
  }

  getEventList = () => {
    console.log('get Event list triggered');
    this._sharedService.showLoader(true);
    // this._http.get('https://next.json-generator.com/api/json/get/Vk7OTypQ8')
    this._http.getJSON('eventlist')
      .subscribe((result: EventObj[] | any) => {
        console.log(result);
        result.forEach((event, index) => {
          this.allEventList.push(new EventObj({
            organizer: event.organizer,
            Id: event._id,
            about: event.about,
            company: event.company,
            scheduled_at: event.scheduled_at,
            duration: event.duration,
            capacity: event.capacity,
            isToggled: event.isToggled
          }));
        });
      },
        (error) => {
          console.log(error);
          this._sharedService.showLoader(false);

        },
        () => {
          console.log(this.allEventList);
          this.saveEventListInStore(this.allEventList);
          this.dataSource.sort = this.sort;
          this.renderView(localStorage.getItem('event-data'));
          this._sharedService.showLoader(false);
        });
  }

  renderView = (data) => {
    this._sharedService.showLoader(true);
    this.dataSource = new MatTableDataSource(this._http.IsJSON( data ) ? JSON.parse( data ) : data);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._sharedService.showLoader(false);
     }, 2000);

  }

  saveEventListInStore = (eventList: EventObj[]) => {
    console.log('setting to store');
    localStorage.setItem('event-data', JSON.stringify(eventList));
  }

}
