import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: "root"
})
export class AlertService {
  config: any = {
    success: 'success-snackbar',
    false: 'false-snackbar'
  }
  constructor(private snackBar: MatSnackBar) { }

  alertMessage(status: string, message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: [this.config[status]]
    })
  }
}