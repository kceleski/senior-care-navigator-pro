
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum([
    "admin",
    "placement_coordinator",
    "care_manager",
    "accounting",
    "viewer"
  ]),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  settings: z.object({
    notifications: z.object({
      email: z.boolean().default(true),
      app: z.boolean().default(true),
    }).optional(),
    theme: z.enum(["light", "dark", "system"]).default("system"),
  }).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;
