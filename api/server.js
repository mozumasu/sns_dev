//インポート
const express = require('express');
app = express();
const authRoute = require('./routers/auth');

require('dotenv').config();

const PORT = 5000;

//expressでjson形式を使用する
app.use(express.json());

// /api/authがエンドポイントの先頭につくようにする
app.use('/api/auth', authRoute);

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
