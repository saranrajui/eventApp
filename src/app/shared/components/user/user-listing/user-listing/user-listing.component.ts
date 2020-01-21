import { Component, OnInit, ViewChild } from '@angular/core';
import { User} from '../../../../../shared/model/userlist.model';
import { HttpService } from 'src/app/core/services/http.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { DeleteAlertModel } from 'src/app/shared/model/deletealert.model';
import { DeletealertComponent } from '../../../deletealert/deletealert.component';
import { Router } from '@angular/router';
import { CreateEventComponent } from '../../../../../shared/components/create-event/create-event.component';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { sharedService } from '../../../../../shared/services/shared.service';
import { AppConstant } from 'src/app/app.constants';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss'],
  providers: [HttpService]
})
export class UserListingComponent implements OnInit {
  name: string;
  age: number;
  compnany: string;
  allUser = []; 
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public displayedColumns: string[] = ['name', 'age', 'phone', 'email', 'company', 'action'];
  userListObj = new User();
  deleteAlertDataModel: DeleteAlertModel = new DeleteAlertModel();
  constructor(
    private _http: HttpService ,
    private _router: Router,
    private _appconstant: AppConstant,
    private _sharedService: sharedService,
    public dialog: MatDialog) {
    this.init();
  }

 init = () => {
    const listFromStore = this.fetchUserList();
    if ( !listFromStore ) {
      this.getUserList();
    } else {
      this.renderView( listFromStore );
    }
}
  ngOnInit = () => {
  }
  ngAfterViewInit = () => {
    this._sharedService.showLoader(true);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._sharedService.showLoader(false);
    }, 2500);
  }
  /**
   * Create new Event
   */

  createEvent = ( event: Event ) => {
    // show modal with form
    // allow user to add details and save
    // update the list from store
    // allow user to auto search while create event
    // refresh the view in both the tabs
    const dialogRef = this.dialog.open(CreateEventComponent, {
      height: '400px',
      width: '800px',
      disableClose: true
    });
  }


  getUserList = () => {
    this._sharedService.showLoader(true);
    // this._http.get('https://next.json-generator.com/api/json/get/NyNrlJTX8')
    this._http.getJSON('userlist')
    .subscribe ((result: User | any) => {
      result.forEach((user, index) => {
        this.allUser.push( new User({
          name : user.name,
          Id : user._id,
          age : user.age,
          company : user.company,
          email: user.email,
          phone : user.phone
        }));
      });
    },
    (error) => {
      console.error(error);
    },
    () => {
      this.saveUserListInStore( this.allUser );
      this.renderView(localStorage.getItem('data'));
    });
  }

  saveUserListInStore = (userList: User[] | any) => {
    localStorage.setItem( 'data', JSON.stringify(userList));
    // this._sharedService.openSnackBar(this._appconstant.SAVEDSUCCESSMSG);
    return true;
  }


  renderView = ( data ) => {
    this._sharedService.showLoader(true);
    this.dataSource = new MatTableDataSource(this._http.IsJSON( data ) ? JSON.parse( data ) : data);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._sharedService.showLoader(false);
     }, 1000);
  }

  fetchUserList = () => {
    const data = localStorage.getItem('data');
    return data ? data : false;
  }


  /**
   * @param User
   */
  deleteBooking = (user: User, collection: User[]) => {
    const recordToDelete = user;
    const recordCollection = collection;
    this.deleteAlertDataModel.title = 'Delete!';
    this.deleteAlertDataModel.message = `Are you Sure You want to Delete the User ${user.name}?`;
    this.deleteAlertDataModel.okButtonName = 'Yes';
    this.deleteAlertDataModel.cancelButtonName = 'No';
    const dialogRef = this.dialog.open(DeletealertComponent, {
      width: '450px',
      minHeight: '200px',
      data: this.deleteAlertDataModel
    });

    dialogRef.afterClosed().subscribe(result => {
      this._sharedService.showLoader(true);
      if (result && result['isConfirm']) {
        this._http.deleteFromStore( recordToDelete )
          .subscribe(( updatedCollection: User[]) => {
            if (updatedCollection) {
            try {
              // re render the grid
              this.saveUserListInStore (updatedCollection);
              this.renderView( updatedCollection );
              this._sharedService.openSnackBar(this._appconstant.DELETEDMSG);
            } catch (err) {
             this._sharedService.openSnackBar(this._appconstant.ERRORMSG);
              throw err;
            }
            }
          },
            (err) => {
              console.log(err);
              this._sharedService.openSnackBar(this._appconstant.SORRY_MSG);
            },
            () => {
              this._sharedService.showLoader(false);
            });
      }
    });
  }

}
