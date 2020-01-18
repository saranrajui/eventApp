import { Component, OnInit, Inject } from '@angular/core';
import { DeleteAlertModel } from '../../model/deletealert.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, 
    FormsModule,
    Validators, FormArray, } from '@angular/forms';
import { EventObj } from '../../model/eventlist.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
    form: FormGroup;
    stores;
    addEventModel = new EventObj();
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateEventComponent>,
  ) { }

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
    console.log('Add Event Triggered!');
    console.log(this.form)
  }

  onCloseDialog() {
    this.dialogRef.close();
  }
  submit() {
    this.dialogRef.close(this.form.value);
  }
}
