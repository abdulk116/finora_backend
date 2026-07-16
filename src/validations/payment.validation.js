import { z } from "zod";

export const createPaymentSchema = z.object({
  amount: z.number().positive(),

  paymentMethod: z.enum([
    "CASH",
    "BANK_TRANSFER",
    "UPI",
    "CARD",
    "OTHER",
  ]),

  paymentDate: z.string().optional(),

  note: z.string().optional(),
});