import express, { Request, Response } from "express"

import { Product } from "../types"
import ProductsController from "../controllers/products"

const router = express.Router()

router.get("/", async (req: Request, res: Response) => {
  const country = req.query.country ? String(req.query.country) : ""
  const controller = new ProductsController()
  const universities: University[] = await controller.getList(country)
  return res.json(universities)
})

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id
  const controller = new CitiesController()
  const university = await controller.getOne(id)
  if (university) {
    return res.send(university)
  } else {
    return res.status(404)
  }  
})

export default router
