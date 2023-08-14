import { Injectable } from "@angular/core";
import { 
  AuthState, 
  UserState 
} from "src/app/store";
import { User } from "src/app/types";

@Injectable()
export class UserDetailService {

  constructor(
    private authState: AuthState,
    private userState: UserState,
  ) { }

  getUser(): User | null {
    const loggedUserId = this.authState.getAuthUser.id;
    this.userState.getUser(loggedUserId);
    return this.userState.getAvailableUser;
  }
  

}