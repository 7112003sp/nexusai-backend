import express from "express";

import { protect } from "../middlewares/auth.js";
import { getPlans, purchasePlans } from "../controllers/creditcontroller.js";

const creditRouter = express.Router();

creditRouter.get("/plan", getPlans);
creditRouter.post("/purchase", protect, purchasePlans);

export default creditRouter;