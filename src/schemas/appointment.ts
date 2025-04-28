
import { z } from "zod";

export const AppointmentSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  type: z.enum([
    "assessment",
    "tour",
    "follow-up",
    "paperwork",
    "consultation",
    "medical",
    "other"
  ]),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  location: z.string().optional(),
  facilityId: z.string().uuid().optional(),
  isVirtual: z.boolean().default(false),
  virtualMeetingUrl: z.string().url().optional(),
  notes: z.string().optional(),
  status: z.enum([
    "scheduled",
    "confirmed",
    "completed",
    "cancelled",
    "rescheduled",
    "no_show"
  ]),
  reminderSent: z.boolean().default(false),
  reminderTime: z.enum([
    "fifteen_minutes",
    "thirty_minutes",
    "one_hour",
    "three_hours",
    "one_day", 
    "two_days"
  ]).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const AppointmentParticipantSchema = z.object({
  id: z.string().uuid(),
  appointmentId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(["organizer", "attendee"]).default("attendee"),
  status: z.enum(["pending", "accepted", "declined", "tentative"]).default("pending"),
  notificationsEnabled: z.boolean().default(true),
});

export type Appointment = z.infer<typeof AppointmentSchema>;
export type AppointmentParticipant = z.infer<typeof AppointmentParticipantSchema>;
