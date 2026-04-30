exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

exports.isMember = (req, res, next) => {
  if (req.user.role !== "member") {
    return res.status(403).json({ message: "Members only" });
  }
  next();
};