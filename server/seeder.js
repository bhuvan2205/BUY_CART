import User from "./models/user.js";
import Product from "./models/products.js";
import Orders from "./models/order.js";
import expressAsyncHandler from "express-async-handler";
import { users } from "./data/user.js";
import products from "./data/product.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const importData = expressAsyncHandler(async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Orders.deleteMany();

    const insertedUsers = await User.insertMany(users);
    console.log(
        insertedUsers ? "Users Added" : "Error occurs while adding Users"
      );

    const updatedProducts = products.map((product) => ({
      ...product,
      user: insertedUsers?.[0]._id,
    }));

    const insertedProducts = await Product.insertMany(updatedProducts);
    console.log(
      insertedProducts ? "Products Added" : "Error occurs while adding Products"
    );
    process.exit();
  } catch (error) {
    console.log(error?.message || error);
    process.exit(1);
  }
});

const destroyData = expressAsyncHandler(async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    process.exit();
  } catch (error) {
    console.log(error?.message || error);
  }
});

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
