
import { z } from "zod";

// Enhanced client schema with additional HIPAA fields
export const ClientSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(), // If client has user account
  name: z.string(),
  status: z.enum([
    "assessment", 
    "search", 
    "tour", 
    "paperwork",
    "move-in",
    "invoice",
    "follow-up-1w",
    "follow-up-1m",
    "follow-up-6m",
    "closed"
  ]),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  dateOfBirth: z.string().optional(),
  careNeeds: z.array(z.string()).optional(),
  budget: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
  }).optional(),
  notes: z.string().optional(),
  emergencyContact: z.object({
    name: z.string(),
    relationship: z.string(),
    phone: z.string(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    isPowerOfAttorney: z.boolean().optional(),
  }).optional(),
  alternateContact: z.object({
    name: z.string(),
    relationship: z.string(),
    phone: z.string(),
    email: z.string().email().optional(),
  }).optional(),
  medicalInformation: z.object({
    primaryPhysician: z.string().optional(),
    physicianPhone: z.string().optional(),
    medicalConditions: z.array(z.string()).optional(),
    medications: z.array(z.object({
      name: z.string(),
      dosage: z.string().optional(),
      frequency: z.string().optional(),
      notes: z.string().optional(),
    })).optional(),
    allergies: z.array(z.string()).optional(),
    dietaryRestrictions: z.array(z.string()).optional(),
    mobilityStatus: z.string().optional(),
    cognitiveStatus: z.string().optional(),
  }).optional(),
  insuranceInformation: z.object({
    medicareNumber: z.string().optional(),
    medicaidNumber: z.string().optional(),
    privateInsurance: z.object({
      provider: z.string().optional(),
      policyNumber: z.string().optional(),
      groupNumber: z.string().optional(),
    }).optional(),
    longTermCareInsurance: z.object({
      provider: z.string().optional(),
      policyNumber: z.string().optional(),
      dailyBenefit: z.number().optional(),
      lifetimeMaximum: z.number().optional(),
    }).optional(),
  }).optional(),
  financialInformation: z.object({
    monthlyIncome: z.number().optional(),
    assets: z.number().optional(),
    financialPowerOfAttorney: z.string().optional(),
    paymentSource: z.array(z.string()).optional(),
  }).optional(),
  hipaaConsentDate: z.string().datetime().optional(),
  isEncrypted: z.boolean().default(true),
  lastContact: z.string().datetime().optional(),
  assignedProfessionalId: z.string().uuid().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Client = z.infer<typeof ClientSchema>;
