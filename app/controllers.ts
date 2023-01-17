import { Request, Response } from 'express';
import { Product } from "./types"
import { fetchItems, fetchItem } from "./services"

const controllers = {
  async getProductsList(req: Request, res: Response): Promise<void> {
    const products: Product[] = await fetchItems()
    res.status(200).json(products);
  },
  getProduct: async function(req: Request, res: Response): Promise<void> {
    const product: Product | null = await fetchItem()
    res.status(200).json(product);
  }
}

export default controllers