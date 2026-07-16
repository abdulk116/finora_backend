import { Router } from "express";

import protect from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import { createLoanSchema } from "../validations/loan.validation.js";

import {
  createLoan,
  getLoans,
  getLoanById,
  updateLoan,
  deleteLoan,
} from "../controllers/loan.controller.js";

const router = Router();

router.use(protect);

router.post(
  "/",
  validate(createLoanSchema),
  createLoan
);

router.get("/", getLoans);

router.get("/:id", getLoanById);

router.patch("/:id", updateLoan);

router.delete("/:id", deleteLoan);

export default router;