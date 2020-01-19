import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { UserModule } from './shared/components/user/user.module';
import { Routes, RouterModule } from '@angular/router';
import { UserListingComponent } from './shared/components/user/user-listing/user-listing/user-listing.component';
import { EventListComponent } from './shared/components/events/events/event-list/event-list.component';
import { EventsModule } from './shared/components/events/events/events.module';
import { HttpService } from '../app/core/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatDialogModule, MatTabsModule, MatOptionModule, 
  MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatProgressSpinner, MatProgressBarModule, MatSpinner, MatProgressSpinnerModule } from '@angular/material';
import { DeletealertComponent } from './shared/components/deletealert/deletealert.component';
import { CreateEventComponent } from './shared/components/create-event/create-event.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { sharedService } from './shared/services/shared.service';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!


const appRoute: Routes = [
  { path: '', component: UserListingComponent },
  {
    path: 'user-list',
    component: UserListingComponent,
    data: { 'title' : 'User Listing'}
    // loadChildren: 'src/app/shared/components/user/user.module#UserModule'
  },
  {
    path: 'event-list',
    component: EventListComponent,
    data: { 'title': 'Event List' },
  },
  {
    path: 'create-event',
    component: CreateEventComponent,
    data: { 'title' : 'Create Event' }
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DeletealertComponent,
    CreateEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    UserModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    EventsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatTabsModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [
    HttpService,
    sharedService,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateEventComponent]
})
export class AppModule { }
