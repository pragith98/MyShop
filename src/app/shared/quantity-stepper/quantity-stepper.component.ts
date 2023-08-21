import { 
  Component, 
  EventEmitter, 
  Input, 
  Output, 
} from '@angular/core';

@Component({
  selector: 'app-quantity-stepper',
  templateUrl: './quantity-stepper.component.html',
  styleUrls: ['./quantity-stepper.component.scss']
})
export class QuantityStepperComponent {

  @Input('stock') stock: number = 0;
  @Input('quantity') quantity: number = 0;
  @Output('value') value = new EventEmitter<number>();


  onClickAdd(): void {
    if(this.stock > this.quantity)
    this.value.emit(++this.quantity);
  }

  onClickRemove(): void {
    if(this.quantity > 1)
    this.value.emit(--this.quantity);
  }
}
