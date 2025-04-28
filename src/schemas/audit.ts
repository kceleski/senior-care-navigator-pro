
import { z } from "zod";

export const AuditLogSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  action: z.enum([
    "create",
    "read",
    "update",
    "delete",
    "login",
    "logout",
    "export",
    "import",
    "share",
    "print"
  ]),
  resourceType: z.string(), // e.g., "user", "facility", "client", etc.
  resourceId: z.string().uuid().optional(),
  description: z.string(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  timestamp: z.string().datetime(),
});

export const DataRetentionPolicySchema = z.object({
  id: z.string().uuid(),
  resourceType: z.string(),
  retentionPeriodDays: z.number().int(),
  isActive: z.boolean().default(true),
  description: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type AuditLog = z.infer<typeof AuditLogSchema>;
export type DataRetentionPolicy = z.infer<typeof DataRetentionPolicySchema>;
