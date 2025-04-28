
import { z } from "zod";

export const AppointmentSchema = z.object({
  id: z.string().uuid(),
  clientId: z.string().uuid(),
  facilityId: z.string().uuid().optional(),
  title: z.string(),
  type: z.enum([
    "assessment",
    "tour",
    "follow-up",
    "paperwork",
    "other"
  ]),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  location: z.string().optional(),
  isVirtual: z.boolean().default(false),
  notes: z.string().optional(),
  status: z.enum([
    "scheduled",
    "completed",
    "cancelled",
    "rescheduled"
  ]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Appointment = z.infer<typeof AppointmentSchema>;
