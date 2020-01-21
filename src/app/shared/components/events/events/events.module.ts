import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { eventRoutes } from './events.module.route';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatProgressBarModule, MatPaginatorModule, 
  MatMenuModule, MatIconModule, MatSlideToggleModule, MatButtonToggleModule, MatButtonModule } from '@angular/material';
import { EventCalanderviewComponent } from './event-calanderview/event-calanderview.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpService } from 'src/app/core/services/http.service';
import { sharedService } from 'src/app/shared/services/shared.service';
import { SnackbarComponent } from '../../snackbar/snackbar.component';



@NgModule({
  declarations: [
    EventListComponent,
    EventCalanderviewComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSlideToggleModule ,
    FullCalendarModule,
    RouterModule.forRoot(eventRoutes),
  ],
  providers: [
    sharedService
  ]
})
export class EventsModule { }
