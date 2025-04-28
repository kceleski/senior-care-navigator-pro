
import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string().uuid(),
  clientId: z.string().uuid().optional(),
  facilityId: z.string().uuid().optional(),
  senderId: z.string().uuid(),
  recipientId: z.string().uuid(),
  subject: z.string(),
  body: z.string(),
  isRead: z.boolean().default(false),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string(),
    type: z.string(),
    size: z.number(),
  })).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Message = z.infer<typeof MessageSchema>;
