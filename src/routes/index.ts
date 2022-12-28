import express from "express";
var router = express.Router();

import TestRoutes from "./products";

router.use('/', TestRoutes);

export default router;
