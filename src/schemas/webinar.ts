
import { z } from "zod";

export const WebinarSchema = z.object({
  id: z.string().uuid(),
  facilityId: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  meetingUrl: z.string().url().optional(),
  registrationUrl: z.string().url().optional(),
  maxAttendees: z.number().int().positive().optional(),
  hostName: z.string(),
  hostTitle: z.string().optional(),
  topics: z.array(z.string()).optional(),
  isPublic: z.boolean().default(true),
  recordingUrl: z.string().url().optional(),
  status: z.enum([
    "scheduled",
    "live",
    "completed",
    "cancelled"
  ]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const WebinarRegistrationSchema = z.object({
  id: z.string().uuid(),
  webinarId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  registrationDate: z.string().datetime(),
  attended: z.boolean().default(false),
  attendanceTime: z.string().datetime().optional(),
  feedback: z.string().optional(),
  feedbackRating: z.number().min(1).max(5).optional(),
});

export type Webinar = z.infer<typeof WebinarSchema>;
export type WebinarRegistration = z.infer<typeof WebinarRegistrationSchema>;
