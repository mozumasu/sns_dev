const express = require('express');
const app = express();
const authRoute = require('./routers/auth');
const cors = require('cors');

//port番号を指定
const PORT = 5000;

//localhost3000からlocalhost5000にアクセスできるように許可
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));
