
import { z } from "zod";

export const UserBaseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Role-specific profile schemas
export const EndUserProfileSchema = z.object({
  userId: z.string().uuid(),
  preferredContactMethod: z.enum(["email", "phone", "text"]).optional(),
  careNeeds: z.array(z.string()).optional(),
  budget: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
  }).optional(),
  locationPreferences: z.array(z.string()).optional(),
  emergencyContact: z.object({
    name: z.string(),
    relationship: z.string(),
    phone: z.string(),
  }).optional(),
});

export const ProfessionalProfileSchema = z.object({
  userId: z.string().uuid(),
  title: z.string(),
  license: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  bio: z.string().optional(),
  yearsOfExperience: z.number().optional(),
  availableForNewClients: z.boolean().default(true),
});

export const FacilityAdminProfileSchema = z.object({
  userId: z.string().uuid(),
  facilityId: z.string().uuid(),
  position: z.string(),
  department: z.string().optional(),
});

// Enhanced user schema with role information
export const UserSchema = UserBaseSchema.extend({
  role: z.enum([
    "admin",
    "end_user", 
    "professional", 
    "facility_admin",
    "placement_coordinator",
    "care_manager",
    "accounting",
    "viewer"
  ]),
  settings: z.object({
    notifications: z.object({
      email: z.boolean().default(true),
      app: z.boolean().default(true),
    }).optional(),
    theme: z.enum(["light", "dark", "system"]).default("system"),
    hipaaConsent: z.boolean().default(false),
    twoFactorEnabled: z.boolean().default(false),
  }).optional(),
});

export type User = z.infer<typeof UserSchema>;
export type EndUserProfile = z.infer<typeof EndUserProfileSchema>;
export type ProfessionalProfile = z.infer<typeof ProfessionalProfileSchema>;
export type FacilityAdminProfile = z.infer<typeof FacilityAdminProfileSchema>;
