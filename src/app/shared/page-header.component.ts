import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <mat-card class="page-header">
      <mat-card-header>
          <mat-card-title>{{ pageTitle }}</mat-card-title>
      </mat-card-header>
    </mat-card>
  `,
  styles: [`@import '../../scss/page-style';`]
})
export class PageHeaderComponent {
  @Input('pageTitle') pageTitle = '';
}
