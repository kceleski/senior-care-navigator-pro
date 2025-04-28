
import { z } from "zod";

export const ReferralSchema = z.object({
  id: z.string().uuid(),
  endUserId: z.string().uuid(),
  professionalId: z.string().uuid(),
  facilityId: z.string().uuid(),
  status: z.enum([
    "pending",
    "accepted",
    "declined",
    "tour_scheduled",
    "tour_completed",
    "application_submitted",
    "approved",
    "moved_in",
    "cancelled"
  ]),
  notes: z.string().optional(),
  careNeeds: z.array(z.string()).optional(),
  moveInTimeframe: z.enum([
    "immediate",
    "within_30_days",
    "1_to_3_months",
    "3_to_6_months",
    "6_plus_months",
    "unknown"
  ]).optional(),
  referralFee: z.number().optional(),
  hipaaConsent: z.boolean().default(false),
  consentDate: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const PlacementSchema = z.object({
  id: z.string().uuid(),
  referralId: z.string().uuid(),
  moveInDate: z.string().datetime(),
  careLevel: z.string(),
  monthlyRate: z.number(),
  initialFee: z.number().optional(),
  commissionAmount: z.number().optional(),
  commissionPaid: z.boolean().default(false),
  commissionPaidDate: z.string().datetime().optional(),
  contractTermMonths: z.number().optional(),
  notes: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Referral = z.infer<typeof ReferralSchema>;
export type Placement = z.infer<typeof PlacementSchema>;
