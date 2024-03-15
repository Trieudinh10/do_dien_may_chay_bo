const jwt = require('jsonwebtoken');

// Middleware kiểm tra xem người dùng đã xác thực hay chưa
const requireAuth = (req, res, next) => {
  const accessToken = req.cookies.jwt;

  // Kiểm tra xem token JWT có tồn tại và hợp lệ không
  if (accessToken) {
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, token) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(token);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// Middleware kiểm tra thông tin người dùng hiện tại
const checkUser = (req, res, next) => {
  const accessToken = req.cookies.jwt;
  if (accessToken) {
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, token) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        // Lấy thông tin người dùng từ token JWT
        const { email, admin } = token;
        res.locals.user = { email, admin };
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
// Middleware kiểm tra thông tin người dùng hiện tại
const checkAdmin = (req, res, next) => {
  const accessToken = req.cookies.jwt;
  if (accessToken) {
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, token) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        // Lấy thông tin người dùng từ token JWT
        const { email, admin } = token;
        res.locals.user = { email, admin };
        if (admin === '1') {
          next();
        } else {
          res.redirect('/'); // Chuyển hướng về trang home nếu không phải là admin
        }
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};



module.exports = { requireAuth, checkUser, checkAdmin };
