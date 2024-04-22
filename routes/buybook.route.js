import { buyBook } from "../controllers/bookController.js";
import { Router } from "express";
const router = Router();
router.route("/payment").post(buyBook);
export const bookRouter = router;
