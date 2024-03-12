const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const indexRoutes = require('./routes/indexRoutes');

//.ENV
dotenv.config();

const app = express();

app.use(express.static("public"));
app.use(express.json()); //phản hồi ở dạng json
app.set('view engine', 'ejs');
app.set("views", "./views");
app.set('views', path.resolve(__dirname, 'views'));

var server = require("http").Server(app);

//CONECT SERVER
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
});


app.use(indexRoutes);