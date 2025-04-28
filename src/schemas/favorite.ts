
import { z } from "zod";

export const FavoriteSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  facilityId: z.string().uuid(),
  notes: z.string().optional(),
  createdAt: z.string().datetime(),
});

export type Favorite = z.infer<typeof FavoriteSchema>;
