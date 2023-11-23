const admin = (req, res, next) => {
  const { user } = req || {};

  if (!user) {
    res.status(400);
    throw new Error("User not found!");
  }

  if (!user.isAdmin) {
    res.status(400);
    throw new Error("Need Admin Access!");
  }

  next();
};

export default admin;
