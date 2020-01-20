import { Component, OnInit, Inject } from '@angular/core';
import { DeleteAlertModel } from '../../model/deletealert.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-deletealert',
  templateUrl: './deletealert.component.html',
  styleUrls: ['./deletealert.component.scss']
})
export class DeletealertComponent implements OnInit {
  deleteAlertDataModel: DeleteAlertModel = new DeleteAlertModel();

  constructor(
      public dialogRef: MatDialogRef<DeletealertComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DeleteAlertModel) {
        this.deleteAlertDataModel = data;
  }

  ngOnInit() {
  }

  onConfirm = (): void => {
    this.dialogRef.close({isConfirm : true});
  }

  onCancel(): any {
    this.dialogRef.close({isConfirm : false});
  }
}
