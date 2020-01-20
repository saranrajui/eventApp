import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DeleteAlertModel } from '../../model/deletealert.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, 
    FormsModule,
    Validators, FormArray, } from '@angular/forms';
import { EventObj } from '../../model/eventlist.model';
import { HttpService } from 'src/app/core/services/http.service';
import { Router, Route } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import { EventCalanderviewComponent } from '../events/events/event-calanderview/event-calanderview.component';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
    form: FormGroup;
    modalData;
    stores;
    addEventModel = new EventObj();
    @ViewChild('calanderView', { static : true}) EventCalanderviewComponent: EventCalanderviewComponent;
    @ViewChild('calendar', {static : true }) calendarComponent: FullCalendarComponent; // the #calendar in the template

  constructor(
    private _http: HttpService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateEventComponent
  ) { 
    this.modalData = data;
  }

  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date() }
  ];

  ngOnInit() {
    this.form = this.formBuilder.group({
        org_fname: ['', [Validators.required]],
        org_lname: ['', [Validators.required]],
        company: ['', [Validators.required]],
        about: ['', [Validators.required]],
        scheduled_at: [new Date(), [Validators.required]],
        duration: ['', [Validators.required]],
        capacity: ['', [Validators.required]]
    });
  }

  onAddEventSubmit = (eventDetails: EventObj) => {
    const eventArray = [];
    let Obj = new EventObj();
    const controls = (this.form.controls);
    for (const name in controls) {
      if (controls[name].valid) {
        Obj[name] = controls[name].value;
      }
    }
    Obj.isToggled = true;
    Obj.isMe = true;
    Obj.scheduled_at = this.modalData.arg.date;
    eventArray.push(Obj);
    this._http.putEventDataToStore('event-data', eventArray)
    .then(response => {
      this.renderEvents ( response );
    },
    (error) => {
      console.log(error);
    });
  }

  renderEvents = (event) => {
    const t = event[0]['company'];
    console.log('rendering New Evevnt');
    this.calendarEvents = [];
    this.calendarEvents = (this.modalData.d ) ? this.modalData.d : [];
    this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
      title: t,
      start: this.modalData.arg.date,
      allDay: true
    });
  }
  onCloseDialog() {
    this.dialogRef.close();
  }
  submit() {
    this.dialogRef.close(this.calendarEvents);
  }
}
