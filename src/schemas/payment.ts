
import { z } from "zod";

export const SubscriptionPlanSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  interval: z.enum(["monthly", "quarterly", "yearly"]),
  features: z.array(z.string()),
  isActive: z.boolean().default(true),
  trialDays: z.number().default(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const UserSubscriptionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  planId: z.string().uuid(),
  status: z.enum([
    "active", 
    "canceled", 
    "incomplete", 
    "incomplete_expired",
    "past_due", 
    "trialing", 
    "unpaid"
  ]),
  currentPeriodStart: z.string().datetime(),
  currentPeriodEnd: z.string().datetime(),
  cancelAtPeriodEnd: z.boolean().default(false),
  trialStart: z.string().datetime().optional(),
  trialEnd: z.string().datetime().optional(),
  canceledAt: z.string().datetime().optional(),
  paymentMethodId: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const InvoiceSchema = z.object({
  id: z.string().uuid(),
  invoiceNumber: z.string(),
  userId: z.string().uuid().optional(),
  facilityId: z.string().uuid().optional(),
  referralId: z.string().uuid().optional(),
  placementId: z.string().uuid().optional(),
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
  subtotal: z.number(),
  taxRate: z.number().optional(),
  taxAmount: z.number().optional(),
  total: z.number(),
  notes: z.string().optional(),
  paymentMethod: z.string().optional(),
  paymentDate: z.string().datetime().optional(),
  paymentReference: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const InvoiceItemSchema = z.object({
  id: z.string().uuid(),
  invoiceId: z.string().uuid(),
  description: z.string(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
  amount: z.number().positive(),
  taxable: z.boolean().default(true),
});

export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;
export type UserSubscription = z.infer<typeof UserSubscriptionSchema>;
export type Invoice = z.infer<typeof InvoiceSchema>;
export type InvoiceItem = z.infer<typeof InvoiceItemSchema>;
