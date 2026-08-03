import { Router, type Request, type Response } from "express";
import { prisma } from "@/lib/prisma.js";
import { eventsBatchSchema } from "@/validators/event.schema.js";
import { eventsRateLimiter } from "@/middleware/rateLimiter.js";

export const eventsRouter = Router();

eventsRouter.post("/", eventsRateLimiter, async (req: Request, res: Response) => {
  const parsedBody = eventsBatchSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({ error: parsedBody.error.flatten() });
    return;
  }

  const storedEvents = await prisma.activityEvent.createMany({
    data: parsedBody.data.events.map((event) => ({
      type: event.type,
      url: event.url,
      tabId: event.tabId,
      elementInfo: event.elementInfo,
      scrollDepth: event.scrollDepth,
      occurredAt: new Date(event.occurredAt),
    })),
  });

  res.status(201).json({ savedCount: storedEvents.count });
});
