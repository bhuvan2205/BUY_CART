import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import productRoutes from "./routes/products.js";
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT || 8000;

app.use((req, res, next) => {
  console.log(`URL: ${req.url}, METHOD: ${req.method}`);
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

app.use(notFound);
app.use(errorHandler);

connectDB();

app.listen(port, () =>
  console.log(`App is running on http://localhost:${port}`)
);
