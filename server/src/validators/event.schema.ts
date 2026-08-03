import { z } from "zod";

export const eventTypeSchema = z.enum(["VISIT", "CLICK", "SCROLL"]);

export const activityEventSchema = z.object({
  type: eventTypeSchema,
  url: z.string().url(),
  tabId: z.number().int(),
  elementInfo: z.string().max(200).optional(),
  scrollDepth: z.number().int().min(0).max(100).optional(),
  occurredAt: z.string().datetime(),
});

export const eventsBatchSchema = z.object({
  events: z.array(activityEventSchema).min(1).max(200),
});

export type ActivityEventInput = z.infer<typeof activityEventSchema>;
export type EventsBatchInput = z.infer<typeof eventsBatchSchema>;
