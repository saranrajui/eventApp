import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventCalanderviewComponent } from './event-calanderview/event-calanderview.component';

export const eventRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'event-list' },
    {
        path: 'event-list',
        component: EventListComponent,
        data: { 'title': 'Event List' },
    },
    {
      path: 'events-calander',
      component: EventCalanderviewComponent,
    }
];
export const EventRoutes = RouterModule.forRoot(eventRoutes);
