import { 
  Component,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface ConfirmationDetails {
  action: string,
  content: any
}

const defaultConfirmationDialog = {
  action: '',
  message: '',
  ConfirmationButtonVisible: true,
  ConfirmationButtonText: '',
  confirmationButtonColor: 'primary',
  confirmationButtonIconVisible: false,
  confirmationButtonIcon: '',
}


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styles: [`
    .content {
      text-align: center;
    }
  `]
})
export class ConfirmationDialogComponent {

  config: any = {
    create: {
      ...defaultConfirmationDialog,
      action: 'Create',
      message: 'create this?',
      confirmationButtonText: 'Create',
    },
    update: {
      ...defaultConfirmationDialog,
      action: 'Update',
      message: 'update this?',
      confirmationButtonText: 'Update',
    },
    addToCart: {
      ...defaultConfirmationDialog,
      action: 'Add to cart',
      message: 'add this to cart?',
      confirmationButtonText: 'Add',
    },
    deleteFromCart: {
      ...defaultConfirmationDialog,
      action: 'Delete from cart',
      message: 'delete this from cart?',
      confirmationButtonText: 'Delete',
      confirmationButtonColor: 'warn',
      confirmationButtonIconVisible: true,
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
