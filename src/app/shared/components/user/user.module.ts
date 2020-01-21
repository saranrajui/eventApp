import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListingComponent } from './user-listing/user-listing/user-listing.component';
import { UserRoutes } from './user.module.route';
import { RouterModule } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { MatTableModule, MatIconModule, MatMenuModule,
         MatDialogModule, MatButtonModule, MatSortModule, 
         MatPaginatorModule, MatSnackBar, MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material';
import { DeletealertComponent } from '../deletealert/deletealert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppConstant } from 'src/app/app.constants';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@NgModule({
  declarations: [
    UserListingComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    MatPaginatorModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule.forRoot( UserRoutes ),
  ],
  exports: [
    UserListingComponent
  ],
  providers: [
    HttpService,
    AppConstant,
    { provide: MAT_SNACK_BAR_DATA, useValue: {} }
  ],
  entryComponents:[
    DeletealertComponent,
]
})
export class UserModule { }
