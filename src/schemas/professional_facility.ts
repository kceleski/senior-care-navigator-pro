
import { z } from "zod";

// Association between professionals and facilities
export const ProfessionalFacilitySchema = z.object({
  id: z.string().uuid(),
  professionalId: z.string().uuid(),
  facilityId: z.string().uuid(),
  relationship: z.enum([
    "referral_partner",
    "employee",
    "consultant",
    "preferred_provider"
  ]),
  isActive: z.boolean().default(true),
  commissionRate: z.number().optional(),
  notes: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ProfessionalFacility = z.infer<typeof ProfessionalFacilitySchema>;
