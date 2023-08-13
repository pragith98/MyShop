import { 
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailService } from './product-detail.service';
import { Product } from 'src/app/types';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product?: Product

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ProductDetailService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => 
        this.product = this.service.getSelectedProduct(params['id']));
  }

  onClickBack() {
    this.router.navigate(['']);
  }
}
