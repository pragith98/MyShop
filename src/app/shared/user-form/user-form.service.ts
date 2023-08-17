import { Injectable } from "@angular/core";
import { User } from "src/app/public/types";

@Injectable()
export class UserFormService {

  formatData(
    id: number,
    formData: any
  ): User {
    return  {
      id: id,
      firstName: formData.firstName as string,
      lastName: formData.lastName as string,
      email: formData.email as string,
      phone: formData.phone as string,
      address: { address: formData.address as string },
      username: formData.username as string,
      password: formData.password as string,
    }
  }
}