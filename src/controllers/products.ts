import { Get, Route, Query, Response } from "tsoa";

import { Product } from "../types"
import { fetchItems, fetchItem } from "../services/products"

@Route("products")
export default class UniversitiesController {
  @Get("/")
  public async getList(@Query() country?: string): Promise<Product[]> {
    console.log("dfgdfgf")
    const a = 2
    const b = 3
    return await fetchItems()
  }
  @Response('404', 'Bad request')
  @Get("/{name}")
  public async getOne(name: string): Promise<Product | null> {
    const a = 2
    const b = 3
    console.log("dfgdfgf2222")
    return await fetchItem()
  }
}