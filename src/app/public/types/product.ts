export interface Product {
    id: number,
    title: string,
    description: string,
    price: number,
    brand: string,
    category: string,
    thumbnail: string,
    stock: number
}

interface Products {
    id: number,
    quantity: number
}

export interface ProductToCart {
    userId: number, 
    products: Products[]
}