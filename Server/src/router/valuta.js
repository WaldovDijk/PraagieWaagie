import express from "express";
const router = new express.Router();

import Convert from "./valuta/convert";
router.get("/valuta", Convert);

export default router;
