import { z } from "zod";

export const createLoanSchema = z.object({
  loanName: z.string().min(2),

  lender: z.string().min(2),

  loanType: z.enum([
    "BANK",
    "EDUCATION",
    "HOME",
    "VEHICLE",
    "PERSONAL",
    "CREDIT_CARD",
    "FRIEND",
    "FAMILY",
    "OTHER",
  ]),

  principalAmount: z.number().positive(),

  outstandingAmount: z.number().positive(),

  interestRate: z.number().min(0).optional(),

  emiAmount: z.number().min(0).optional(),

  emiDay: z.number().min(1).max(31).optional(),

  startDate: z.string(),

  endDate: z.string().optional(),

  notes: z.string().optional(),
});