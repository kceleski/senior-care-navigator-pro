
import { z } from "zod";

export const ConversationSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  type: z.enum(["direct", "group", "facility", "referral", "system"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lastMessageAt: z.string().datetime().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const ConversationParticipantSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(["owner", "admin", "member"]).default("member"),
  joinedAt: z.string().datetime(),
  leftAt: z.string().datetime().optional(),
  isActive: z.boolean().default(true),
});

export const MessageSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  senderId: z.string().uuid(),
  content: z.string(),
  contentType: z.enum(["text", "image", "file", "system"]).default("text"),
  isEncrypted: z.boolean().default(true),
  metadata: z.record(z.string(), z.any()).optional(),
  replyToId: z.string().uuid().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const MessageReadReceiptSchema = z.object({
  id: z.string().uuid(),
  messageId: z.string().uuid(),
  userId: z.string().uuid(),
  readAt: z.string().datetime(),
});

export const MessageAttachmentSchema = z.object({
  id: z.string().uuid(),
  messageId: z.string().uuid(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
  size: z.number(),
  isEncrypted: z.boolean().default(true),
});

export type Conversation = z.infer<typeof ConversationSchema>;
export type ConversationParticipant = z.infer<typeof ConversationParticipantSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type MessageReadReceipt = z.infer<typeof MessageReadReceiptSchema>;
export type MessageAttachment = z.infer<typeof MessageAttachmentSchema>;
