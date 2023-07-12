const express = require('express');
const app = express();

//port番号を指定
const PORT = 5000;

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));
