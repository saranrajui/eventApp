import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service.js';
import { Calendar } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import {  } from '@fullcalendar/interaction'


@Component({
  selector: 'app-event-calanderview',
  templateUrl: './event-calanderview.component.html',
  styleUrls: ['./event-calanderview.component.scss'],
  providers: [FormBuilder]
})
export class EventCalanderviewComponent implements OnInit {
  calendarEvents = [];
  public FullCalendar;
  public selectViewForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _https: HttpService,
  ) { }

  ngOnInit() {
    this.selectViewForm = this.formBuilder.group({
      view: [{ value: 'year' }],
    });
    // check if there is event list from store
    this.getEventList();
    // retrive it
    // build event list
    // render it into calander

  }

  getEventList = () => {
    this.renderCalanderView();
  }

  renderCalanderView = () => {
  }

}
