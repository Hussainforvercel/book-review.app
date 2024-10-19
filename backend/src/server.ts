import express, { Application, Request, Response, NextFunction } from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
connectDB();
const app: Application = express();

if (!process.env.PORT) {
  throw new Error("PORT environment variable is not defined");
}
const PORT = parseInt(process.env.PORT, 10);

const allowedOrigins = ["https://book-review-app-rouge.vercel.app"];

const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials: true,
  exposedHeaders: ["Access-Control-Allow-Origin"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
