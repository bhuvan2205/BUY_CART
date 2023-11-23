import bcrypt from "bcrypt";

export const users = [
  {
    name: "Admin",
    email: "bhuvancs2205@gmail.com",
    isAdmin: true,
    password: bcrypt.hashSync("Bhuvan@123", 8),
  },
  {
    name: "Bhuvan",
    email: "bhuvan052000@gmail.com",
    isAdmin: false,
    password: bcrypt.hashSync("Bhuvan@123", 8),
  },
];
