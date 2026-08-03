import "dotenv/config";
import express from "express";
import cors from "cors";
import { eventsRouter } from "@/routes/events.js";

const app = express();
const port = process.env.PORT ?? 4000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use("/api/events", eventsRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
