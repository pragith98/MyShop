import { 
  Component,
  OnInit
} from '@angular/core';
import { User } from 'src/app/types';
import { UserDetailService } from './user-detail.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{
  user?: User | null

  constructor(private service: UserDetailService) { }

  ngOnInit(): void {
    this.user = this.service.getUser();
  }

}
