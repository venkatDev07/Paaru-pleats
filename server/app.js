import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import workRoutes from "./routes/workRoutes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
app.use((req, res, next) => {
  console.log("=== Incoming request ===");
  console.log("Method:", req.method, "URL:", req.originalUrl);
  console.log("All headers:", req.headers);
  next();
});
const app = express();
console.log("CLIENT_URL is:", process.env.CLIENT_URL);
app.set("trust proxy", 1);

// Security & performance middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(compression());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Rate limiting - prevents abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use("/api", limiter);

// Body parsing - MUST come before routes
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Logging (only in development)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes - come after all middleware above
app.get("/", (req, res) => res.send("Saree Pleating API is running"));
app.use("/api/auth", authRoutes);
app.use("/api/works", workRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

export default app;
