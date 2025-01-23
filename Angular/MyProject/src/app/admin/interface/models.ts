export interface Product {
    _id: string
    name: string
    details: string
    price: number
    category: string
    image: string
    discount: number
    rating: number
    images: string[]
  }
  export interface Category {
    _id: number;
    name: string;
  }
  
  export interface ApiResponse<T> {
    status: string;
    data: T;
  }