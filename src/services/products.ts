// import axios from "axios"
import { Product } from "../types"

const products: Product[] = [
  { name: "a" }, 
  { name: "b" }
]

export async function fetchItems(): Promise<Product[]> {
  try {
    return Promise.resolve(products);
  } catch (error) {
    return []
  }
}

export async function fetchItem(): Promise<Product | null> {
  try {
    return Promise.resolve(products[0]);
  } catch (error) {
    return null
  }
}