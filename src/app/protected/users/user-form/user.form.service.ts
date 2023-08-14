import { Injectable } from '@angular/core';
import { UserState } from 'src/app/store';
import { User } from 'src/app/types';

@Injectable()
export class UserFormService {

    constructor(private userState: UserState) { }

    createUser(user: User): void {
        this.userState.createUser(user);
    }

    updateUser(id: number, user: User): void {
        this.userState.updateUser(id, user);
    }
}