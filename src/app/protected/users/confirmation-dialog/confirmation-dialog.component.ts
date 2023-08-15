import { 
  Component,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface ConfirmationDetails {
  action: string,
  content: any
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  config: any = {
    create: {
      action: 'Create',
      message: 'create',
      confirmationButtonText: 'Create',
      confirmationButtonColor: 'primary',
    },
    update: {
      action: 'Update',
      message: 'update',
      confirmationButtonText: 'Update',
      confirmationButtonColor: 'primary',
    }
  }

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ConfirmationDetails
  ) { }

  get confirmationDetails(): any {
    return this.config[this.data.action];
  }

  get content(): string {
    return this.data.content;
  }

  onClickConfirm(): void {
    this.dialogRef.close(true);
  }
}
