
// Base schemas
export * from "./client";
export * from "./facility";
export * from "./appointment";
export * from "./invoice";
export * from "./note";
export * from "./user";
export * from "./report";

// Renamed exports to avoid conflicts
export { 
  ConversationSchema,
  ConversationParticipantSchema,
  MessageSchema as ConversationMessageSchema,
  MessageReadReceiptSchema,
  MessageAttachmentSchema,
  Conversation,
  ConversationParticipant,
  Message as ConversationMessage,
  MessageReadReceipt,
  MessageAttachment
} from "./conversation";

export {
  MessageSchema as DirectMessageSchema,
  Message as DirectMessage
} from "./message";

export * from "./favorite";
export * from "./referral";

// Payment exports with renamed Invoice to avoid conflict
export {
  SubscriptionPlanSchema,
  UserSubscriptionSchema,
  InvoiceSchema as PaymentInvoiceSchema,
  InvoiceItemSchema,
  SubscriptionPlan,
  UserSubscription,
  Invoice as PaymentInvoice,
  InvoiceItem
} from "./payment";

export * from "./webinar";
export * from "./audit";
export * from "./professional_facility";
