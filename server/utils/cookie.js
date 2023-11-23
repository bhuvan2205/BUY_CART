import generateToken from "./generateToken.js";

let setCookieOptions = {
  maxAge: 10 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "strict",
};

let removeCookieOptions = {
  maxAge: 0,
  httpOnly: true,
  sameSite: "strict",
};

export const setCookie = async (res, userID) => {
  const token = await generateToken(userID);
  await res.cookie("jwt", token, setCookieOptions);
};

export const removeCookie = async (res) => {
  await res.cookie("jwt", null, removeCookieOptions);
};
