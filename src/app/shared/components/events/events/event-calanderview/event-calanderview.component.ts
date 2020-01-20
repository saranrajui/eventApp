import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service.js';
import { Calendar } from '@fullcalendar/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { sharedService } from 'src/app/shared/services/shared.service';
import { EventInput } from '@fullcalendar/core';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { User } from 'src/app/shared/model/userlist.model';
import { EventObj } from 'src/app/shared/model/eventlist.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateEventComponent } from '../../../create-event/create-event.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-event-calanderview',
  templateUrl: './event-calanderview.component.html',
  styleUrls: ['./event-calanderview.component.scss'],
  providers: [FormBuilder]
})
export class EventCalanderviewComponent implements OnInit {
  @ViewChild('calendar', {static : true }) calendarComponent: FullCalendarComponent; // the #calendar in the template

  public FullCalendar;
  public selectViewForm: FormGroup;
  public currentUser;
  constructor(
    private formBuilder: FormBuilder,
    private _https: HttpService,
    private _router: ActivatedRoute ,
    private _sharedService: sharedService,
    public dialog: MatDialog,
  ) {
    this.currentUser = this._router.snapshot.paramMap.get('user');
  }

  ngOnInit() {
    this.selectViewForm = this.formBuilder.group({
      view: [{ value: 'year' }],
    });
    // check if there is event list from store
    this.getEventList();
    // retrive it
    // build event list
    // render it into calander
    // get the event data where user coming from
    // add more details for comments
    this.getScheduledEventList(this.currentUser);
  }
  options = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  };

  calendarVisible = true;
  calendarPlugins = [
    dayGridPlugin,
    timeGrigPlugin,
    interactionPlugin
  ];
  calendarWeekends = true;

  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date() }
  ];

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  }

  renderEvents = (events) => {
    console.log('rendering New Evevnt');
    setTimeout(() => {
      this.calendarEvents = [];
      this.calendarEvents = events ? events : new Date();
    }, 1500);
  }

  handleDateClick(arg) {
    const dialogRef = this.dialog.open(CreateEventComponent, {
      height: '400px',
      width: '800px',
      disableClose: true,
      data: { arg: arg, d : this.calendarEvents },
    }).afterClosed().subscribe((events) => {
      console.log(events);
      this.renderEvents ( events );
    })
  }

  handleDateClick1(arg) {
    var d = window.prompt('Would you like to add an event to ' + arg.dateStr + ' ?')
    if (d) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: d,
        start: arg.date,
        allDay: arg.allDay
      })
    }
  }

  getScheduledEventList = (userName: any) => {
    const tempArr = [];
    this._https.getJSON('eventlist')
    .subscribe((eventList: EventObj[]) => {
      eventList.forEach(event => {
        Object.keys(event).forEach(key=>{
          console.log(`${key} : ${event[key]}`);
          if ( key == 'organizer' ) {
            if ( userName == event[key]["first"] + ' ' + event[key]["last"] ) {
              // push the date to caledar event list
              this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
                title: event['company'],
                start: new Date(event['scheduled_at']),
                allDay: true
              })
              // tempArr.push({ title: event['company'], start: new Date(event['scheduled_at']) });
            }
          } else {
            console.log('No Event assigned')
          }
       });
      });
    },
    (error) => {

    },
    () => {
     
      // this.calendarEvents = [];
      // this.calendarEvents = tempArr;
    })
  }
  getEventList = () => {
    this.renderCalanderView();
    this._sharedService.showLoader(false);
  }

  renderCalanderView = () => {
  }

}
