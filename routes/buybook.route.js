import { buyBook } from "../controllers/bookController.js";
import { Router } from "express";
const router = Router();
router.get("/", buyBook);
export const buyBookRouter = router;
