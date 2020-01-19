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
    this.allUser = [];
    const listFromStore = this.fetchUserList();
    if(!listFromStore) {
      this.getUserList ();
    }
  }


  ngOnInit = () => {
    console.log('ngOnInit called');
  }
  ngAfterViewInit = () => {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
      console.log(this.allUser);
      this.saveUserListInStore ( this.allUser );
      this.dataSource.sort = this.sort;
      this.renderView(localStorage.getItem('data'));
      this._sharedService.showLoader(false);
    });
  }

  saveUserListInStore = (userList: User[]) => {
    console.log('setting to store');
    localStorage.setItem( 'data', JSON.stringify(userList));
  }


  renderView = ( data ) => {
    let dataToStore;
    console.log('rendering View');
    dataToStore = this._http.IsJSON( data ) ? JSON.parse( data ) : data;
    this.dataSource = new MatTableDataSource(dataToStore);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._sharedService.showLoader(false);
    }, 5000);
  }

  fetchUserList = () => {
    console.log('fetching from store');
    const list = localStorage.getItem('data');
    if ( list ) {
      this.renderView( list );
      return true;
    }
    return false;
  }


  /**
   * @param User
   */
  deleteBooking = (user: User) => {
    this.deleteAlertDataModel.title = 'Delete!';
    this.deleteAlertDataModel.message = `Are you Sure You want to Delete the User${user.name}?`;
    this.deleteAlertDataModel.okButtonName = 'Yes';
    this.deleteAlertDataModel.cancelButtonName = 'No';
    const dialogRef = this.dialog.open(DeletealertComponent, {
      width: '400px',
      height: 'auto',
      data: this.deleteAlertDataModel
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._http.deleteFromStore( user, this.allUser )
          .subscribe((collection: User[]) => {
            try {
              // this._sharedService.displayLoader(false);
              // re render the grid
              this.renderView( collection );
            } catch (err) {
              throw err;
            }
          },
            (err) => {
              console.log(err);
            },
            () => {
              // this._sharedService.displayLoader(false);
            });
      }
    });
  }

}
