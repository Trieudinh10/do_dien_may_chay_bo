const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const connection = require('../config/database');

// Hàm chuyển đổi email thành chữ thường
function validateEmail(email) {
  return isEmail(email) ? email.toLowerCase() : null;
}

// Hàm tạo password hash
async function hashPassword(password) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}


// const createUser = async (req, res) => {
//     let email = req.body.email; // Di chuyển lên đầu hàm
//     let name = req.body.name;   // Di chuyển lên đầu hàm
//     let password = req.body.password; // Di chuyển lên đầu hàm

//     email = validateEmail(email);
//     if (!email) throw new Error('Invalid email');
//     password = await hashPassword(password);

//     console.log('reqbody',  email, name, password);

//     let [results, fields] = await connection.query(
//         `INSERT INTO 
//         users ( email,  password, name, admin) VALUES( ?, ?, ?, ?)`,[ email, password, name, admin]
//     );
//     console.log('ket qua', results)
//     res.send('create success!')
// }


// Hàm tạo user mới
async function createUser(email,  password, name , admin = false) {
  email = validateEmail(email);
  if (!email) throw new Error('Invalid email');
  password = await hashPassword(password);
  const [rows] = await connection.query('INSERT INTO users (email, password, name, admin) VALUES (?, ?, ?, ?)', [email, password, name, admin]);
  return { id: rows.insertId, email, name, admin };
}

// Hàm đăng nhập
async function loginUser(email, password) {
  email = validateEmail(email);
  if (!email) throw new Error('Invalid email');
  const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) throw new Error('User not found');
  const user = rows[0];
  const auth = await bcrypt.compare(password, user.password);
  if (!auth) throw new Error('Incorrect password');
  return { id: user.id, name: user.name, email: user.email, admin: user.admin };
}

module.exports = {
  createUser,
  loginUser
};
