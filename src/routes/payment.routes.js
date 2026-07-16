import { Router } from "express";

import protect from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import { createPaymentSchema } from "../validations/payment.validation.js";

import {
  payLoan,
  getLoanPayments,
} from "../controllers/payment.controller.js";

const router = Router();

router.use(protect);

router.post(
  "/:loanId",
  validate(createPaymentSchema),
  payLoan
);

router.get(
  "/:loanId",
  getLoanPayments
);

export default router;