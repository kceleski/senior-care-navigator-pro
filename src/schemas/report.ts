
import { z } from "zod";

export const ReportSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum([
    "monthly",
    "quarterly",
    "yearly",
    "custom"
  ]),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  metrics: z.array(z.object({
    name: z.string(),
    value: z.number(),
    previousValue: z.number().optional(),
    change: z.number().optional(),
  })).optional(),
  format: z.enum([
    "pdf",
    "csv",
    "xlsx"
  ]).default("pdf"),
  createdBy: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Report = z.infer<typeof ReportSchema>;
