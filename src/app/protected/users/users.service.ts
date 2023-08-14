import { Injectable } from '@angular/core';
import { UserState } from 'src/app/store';
import { User } from 'src/app/types';

@Injectable()
export class UsersService {

  constructor(private userState: UserState) { }

  /**
   * Submit form data to create or update user. If form data has no ID, 
   * that form data submit to create a user. otherwise submit to update the user.
   */
  submitFormData(id: number, formData: any): void {
    const data = {
      id: id,
      firstName: formData.firstName as string,
      lastName: formData.lastName as string,
      email: formData.email as string,
      phone: formData.phone as string,
      address: { address: formData.address as string },
      username: formData.username as string,
      password: formData.password as string,
    }

    if (data.id === 0) {
      this.createUser(data);
    } else this.updateUser(data.id, data);
  }

  private createUser(user: User): void {
    this.userState.createUser(user);
  }

  private updateUser(id: number, user: User): void {
    this.userState.updateUser(id, user);
  }
}