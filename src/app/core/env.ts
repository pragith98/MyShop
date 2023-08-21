export class EndPoints {
    
    //product endpoints
    static getAllProducts = 'products';

    //auth endpoints
    static login = 'auth/login';

    //users endpoints
    static getUserById = 'users';
    static createUser = 'users/add';
    static updateUser = 'users';

    //carts endpoints
    static getCartByUserID = 'carts/user';
    static addCart = 'carts/add';
    static updateCart = 'carts/1';
}