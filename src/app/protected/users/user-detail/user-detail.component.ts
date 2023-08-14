import { 
  Component,
  OnInit
} from '@angular/core';
import { User } from 'src/app/types';
import { UserDetailService } from './user-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{
  user?: User | null

  constructor(
    private service: UserDetailService,
    private router: Router  
  ) { }

  ngOnInit(): void {
    // this.user = this.service.getUser();
  }

  onClickUpdate(): void {
    this.router.navigate(
      ['users/form'],
      {queryParams: {action: 'update'}}
    );
  }

}
