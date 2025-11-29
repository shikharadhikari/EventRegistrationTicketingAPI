import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventsRoutes.js";
import ticketsRoutes from "./routes/ticketsRoutes.js";
import logger from "./middleware/logger.js";
import notFound from "./middleware/404handler.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);


app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketsRoutes);


app.use(notFound);
app.use(errorHandler);

export default app;
