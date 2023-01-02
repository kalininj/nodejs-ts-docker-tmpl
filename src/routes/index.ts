import express from "express";
var router = express.Router();

import ProductsRoutes from "./products";

router.use('/', ProductsRoutes);

export default router;
