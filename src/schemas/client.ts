
import { z } from "zod";

export const ClientSchema = z.object({
  id: z.string().uuid(),
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
  }).optional(),
  lastContact: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Client = z.infer<typeof ClientSchema>;
