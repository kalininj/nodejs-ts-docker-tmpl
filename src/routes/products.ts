import express, { Request, Response } from "express"

import { Product } from "../types"
import ProductsController from "../controllers/products"

const router = express.Router()

router.get("/", async (req: Request, res: Response) => {
  const controller = new ProductsController()
  const products: Product[] = await controller.getList()
  return res.json(products)
})

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id
  const controller = new ProductsController()
  const product = await controller.getOne(id)
  if (product) {
    return res.send(product)
  } else {
    return res.status(404)
  }  
})

export default router
