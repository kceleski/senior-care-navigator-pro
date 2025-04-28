
import { z } from "zod";

// Define amenity schema for reuse
export const AmenitySchema = z.object({
  id: z.string().uuid(),
  facilityId: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
});

// Define care type schema for reuse
export const CareTypeSchema = z.object({
  id: z.string().uuid(),
  facilityId: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  level: z.number().optional(),
  monthlyRate: z.number().optional(),
  availableSpots: z.number().optional(),
});

// Define facility image schema
export const FacilityImageSchema = z.object({
  id: z.string().uuid(),
  facilityId: z.string().uuid(),
  url: z.string(),
  caption: z.string().optional(),
  isPrimary: z.boolean().default(false),
  order: z.number().default(0),
});

// Enhanced facility schema with related data
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
  description: z.string().optional(),
  medicareApproved: z.boolean().default(false),
  medicaidApproved: z.boolean().default(false),
  vaApproved: z.boolean().default(false),
  licenseNumber: z.string().optional(),
  capacity: z.number().int().positive().optional(),
  establishedYear: z.number().int().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  amenities: z.array(AmenitySchema).optional(),
  careTypes: z.array(CareTypeSchema).optional(),
  images: z.array(FacilityImageSchema).optional(),
});

export type Facility = z.infer<typeof FacilitySchema>;
export type Amenity = z.infer<typeof AmenitySchema>;
export type CareType = z.infer<typeof CareTypeSchema>;
export type FacilityImage = z.infer<typeof FacilityImageSchema>;
