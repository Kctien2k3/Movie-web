const User = require("../models/user");

const authenticateUser  = (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // lấy danh sách user
  const users = User.all();
  // xác thực
  const user = users.find((user) => user.token === token);

  if (!user) {
    return res.status(400).json({ message: "Not found that user token" });
  }

  // Nếu hợp lệ, chuyển tiếp tới route tiếp theo
  next();
};

module.exports = authenticateUser;

