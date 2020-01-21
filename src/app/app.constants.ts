import { Injectable } from '@angular/core';

/**
 * Constant resource file
 * to maintain constants/fixed properties
 */
@Injectable()
export class AppConstant {

  public APIDATEFORMAT = 'YYYY-MM-DDTHH:mm:ss';
  public SAVEDSUCCESSMSG = `Saved successfully!`;
  public DELETEDMSG = `Deleted successfully!`;
  public ERRORMSG = `Error Occured!`;
  public SORRY_MSG = `Sorry. Something went wrong!`;
  public EVENT_CREATED_MSG = `Event Created Successfully`;

}
