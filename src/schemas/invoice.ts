
import { z } from "zod";

export const InvoiceSchema = z.object({
  id: z.string().uuid(),
  invoiceNumber: z.string(),
  clientId: z.string().uuid(),
  facilityId: z.string().uuid().optional(),
  amount: z.number(),
  date: z.string().datetime(),
  dueDate: z.string().datetime(),
  status: z.enum([
    "draft",
    "sent",
    "paid",
    "pending",
    "overdue",
    "cancelled"
  ]),
  description: z.string().optional(),
  items: z.array(z.object({
    description: z.string(),
    quantity: z.number().int().positive(),
    unitPrice: z.number().positive(),
    amount: z.number().positive(),
  })),
  subtotal: z.number(),
  taxRate: z.number().optional(),
  taxAmount: z.number().optional(),
  total: z.number(),
  notes: z.string().optional(),
  paymentMethod: z.string().optional(),
  paymentDate: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
