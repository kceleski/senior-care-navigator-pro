
// Base schemas
export * from "./client";
export * from "./facility";
export * from "./appointment";
export * from "./invoice";
export * from "./note";
export * from "./user";
export * from "./report";

// Renamed exports to avoid conflicts
export { ConversationSchema } from "./conversation";
export type { 
  ConversationParticipant,
  Message as ConversationMessage,
  MessageReadReceipt,
  MessageAttachment,
  Conversation
} from "./conversation";
export { 
  ConversationParticipantSchema,
  MessageSchema as ConversationMessageSchema,
  MessageReadReceiptSchema,
  MessageAttachmentSchema
} from "./conversation";

export { MessageSchema as DirectMessageSchema } from "./message";
export type { Message as DirectMessage } from "./message";

export * from "./favorite";
export * from "./referral";

// Payment exports with renamed Invoice to avoid conflict
export { 
  SubscriptionPlanSchema,
  UserSubscriptionSchema,
  InvoiceSchema as PaymentInvoiceSchema,
  InvoiceItemSchema 
} from "./payment";
export type {
  SubscriptionPlan,
  UserSubscription,
  Invoice as PaymentInvoice,
  InvoiceItem
} from "./payment";

export * from "./webinar";
export * from "./audit";
export * from "./professional_facility";
