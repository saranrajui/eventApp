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
    private _sharedService: sharedService,
    public dialog: MatDialog) {
    this.init();
  }

 init = () => {
    const listFromStore = this.fetchUserList();
    if ( !listFromStore ) {
      this.getUserList();
      // this.saveUserListInStore( userList );
      // this.renderView( listFromStore );
    } else {
      this.renderView( listFromStore );
    }
}
  ngOnInit = () => {
    console.log('ngOnInit called');
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
    console.log('get user list triggered');
    // this._http.get('https://next.json-generator.com/api/json/get/NyNrlJTX8')
    this._http.getJSON('userlist')
    .subscribe ((result: User | any) => {
      console.log(result);
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
      // return new Promise(this.allUser);
      // console.log(this.allUser);
      this.saveUserListInStore( this.allUser );
      // this.dataSource.sort = this.sort;
      this.renderView(localStorage.getItem('data'));
      // this._sharedService.showLoader(false);
    });
  }

  saveUserListInStore = (userList: User[] | any) => {
    console.log('setting to store');
    localStorage.setItem( 'data', JSON.stringify(userList));
    return true;
  }


  renderView = ( data ) => {
    this._sharedService.showLoader(true);
    this.dataSource = new MatTableDataSource(this._http.IsJSON( data ) ? JSON.parse( data ) : data);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._sharedService.showLoader(false);
     }, 2000);
  }

  fetchUserList = () => {
    console.log('fetching from store');
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
              console.log('rendering in subscribe of delete no');
              this.saveUserListInStore (updatedCollection);
              this.renderView( updatedCollection );
            } catch (err) {
              throw err;
            }
            }
          },
            (err) => {
              console.log(err);
            },
            () => {
              this._sharedService.showLoader(false);
            });
      }
    });
  }

}
