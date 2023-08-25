import { Injectable } from "@angular/core";
import { 
  Observable, 
  of, 
  switchMap 
} from "rxjs";
import { ConfirmationService } from "src/app/core/services/confirmation.service";
import { User } from "src/app/public/types";
import { UserState } from "src/app/store";

@Injectable()
export class UsersService {

  constructor(
    private confirmation: ConfirmationService,
    private userState: UserState
  ) { }

  updateUser(formData: User): Observable<User | null> {
    return this.confirmation.getConfirmation(formData.firstName,'update')
      .pipe(switchMap(response => {
          return response? 
            this.userState.updateUser(
              formData.id, 
              formData
            ) :
            of (null);
      }));
  }
}