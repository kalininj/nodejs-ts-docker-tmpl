// import axios from "axios"
import { Product } from "./types"

const products: Product[] = [
  { id: 1, name: "a" }, 
  { id: 2, name: "b", description: 'dfg' }
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