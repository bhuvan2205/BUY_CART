import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import productRoutes from "./routes/products.js";
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";
import uploadFileRoutes from "./routes/images.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 8000;

app.use((req, res, next) => {
  console.log(`URL: ${req.url}, METHOD: ${req.method}`);
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/config/paypal", (req, res) => {
  res.status(200).json({ clientID: process.env.PAYPAL_CLIENT_ID });
});
app.use("/api/uploads", uploadFileRoutes);

const dirname = path.resolve();
app.use("/uploads", express.static(path.join(dirname, "/uploads")));

if (process.env.NODE_ENV !== "development") {
  // Static folder
  app.use(express.static(path.join(dirname, "/client/dist")));

  // Home page
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(dirname, "client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("API is running..."));
}

app.use(notFound);
app.use(errorHandler);

connectDB();

app.listen(port, () =>
  console.log(`App is running on http://localhost:${port}`)
);
