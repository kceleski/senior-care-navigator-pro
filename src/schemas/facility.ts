
import { z } from "zod";

export const FacilitySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum([
    "assisted-living",
    "memory-care",
    "independent-living",
    "nursing-home",
    "continuing-care",
  ]),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  phone: z.string(),
  email: z.string().email(),
  website: z.string().url().optional(),
  rating: z.number().min(0).max(5).optional(),
  priceRange: z.object({
    min: z.number(),
    max: z.number(),
  }),
  amenities: z.array(z.string()).optional(),
  availableBeds: z.number().int().nonnegative(),
  photos: z.array(z.string()).optional(),
  contactPerson: z.object({
    name: z.string(),
    title: z.string(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
  }).optional(),
  notes: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Facility = z.infer<typeof FacilitySchema>;
