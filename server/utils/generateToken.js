import jwt from "jsonwebtoken";

const generateToken = async (userId) => {
  return await jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d",
  });
};

export default generateToken;
