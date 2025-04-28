
import { z } from "zod";

export const NoteSchema = z.object({
  id: z.string().uuid(),
  clientId: z.string().uuid().optional(),
  facilityId: z.string().uuid().optional(),
  referralId: z.string().uuid().optional(),
  placementId: z.string().uuid().optional(),
  title: z.string().optional(),
  content: z.string(),
  category: z.enum([
    "assessment",
    "tour",
    "follow-up",
    "medical",
    "financial",
    "general"
  ]).optional(),
  isPrivate: z.boolean().default(false),
  isEncrypted: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
  createdBy: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Note = z.infer<typeof NoteSchema>;
