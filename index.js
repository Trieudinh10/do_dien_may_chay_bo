const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');

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
app.use(authRoutes);


const ModbusRTU = require('modbus-serial');
const client = new ModbusRTU();
const serialPort = 'COM5'; // Cổng COM RS485
const options = {
  baudRate: 9600, // Tốc độ truyền dữ liệu
  dataBits: 8,    // Số bit dữ liệu
  stopBits: 1,    // Số bit dừng
  parity: 'none'  // Kiểu kiểm tra lỗi
};

// Kết nối với thiết bị Modbus qua cổng COM
client.connectRTU(serialPort, options, connected);
var dataArr = []; // Mảng chung để lưu trữ giá trị
var dataArr1 = []; // Mảng chung để lưu trữ giá trị

async function connected() {
    console.log('Đã kết nối với thiết bị Modbus qua cổng COM');
    const unitId = 1; // Địa chỉ thiết bị Modbus
    const addresses = [8192,8193,8194,8195,8196]; // ĐỌC CƠ SỐ 16
    const quantity = 1; // Số lượng thanh ghi cần đọc
    client.setID(unitId);

    for (let i = 0; i < addresses.length; i++) {
        const startAddress = addresses[i];
        try {
            const data = await readdata(startAddress, quantity);
            dataArr[i] = data;
            dataArr1[0] = dataArr[1] + dataArr[2];
        } catch (err) {
            console.error('Lỗi khi đọc dữ liệu Modbus là:', err);
        }
    }
    console.log('Dữ liệu Modbus:', dataArr);
    console.log('Dữ liệu Modbus1:', dataArr1);
    console.log('Dữ liệu Modbus1 từng biến:', dataArr[0],dataArr[1],dataArr[2],dataArr[3] );
}

setInterval(() => {
    connected();
}, 500);

function readdata(startAddress, quantity) {
    return new Promise((resolve, reject) => {
        client.readHoldingRegisters(startAddress, quantity)
            .then(data => {
                resolve(data.data[0]);
            })
            .catch(err => {
                reject(err);
            });
    });
}
