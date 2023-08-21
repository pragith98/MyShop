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
      message: 'create this?',
      confirmationButtonText: 'Create',
      confirmationButtonColor: 'primary',
    },
    update: {
      action: 'Update',
      message: 'update this?',
      confirmationButtonText: 'Update',
      confirmationButtonColor: 'primary',
    },
    addToCart: {
      action: 'Add to cart',
      message: 'add this to cart?',
      confirmationButtonText: 'Add',
      confirmationButtonColor: 'primary',
    },
    deleteFromCart: {
      action: 'Delete from cart',
      message: 'delete this from cart?',
      confirmationButtonText: 'Delete',
      confirmationButtonColor: 'warn',
      confirmationButtonIcon: 'delete',
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
