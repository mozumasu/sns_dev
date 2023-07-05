//インポート
const express = require('express');
app = express();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const PORT = 5000;

const prisma = new PrismaClient();

//expressでjson形式を使用する
app.use(express.json());

//新規ユーザー登録API
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  //passwordをハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return res.json({ user }); //jsonオブジェクトで返す
});

//ユーザーログインAPI
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  //ユーザーが存在するかemailで確認
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: 'そのユーザーは存在しません' });
  }

  //入力されたパスワードが登録されたパスワードと一致しているか確認
  const isPasswordVaild = await bcrypt.compare(password, user.password);

  if (!isPasswordVaild) {
    return res.status(401).json({ error: 'そのパスワードは間違っています' });
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: '1d',
  });

  return res.json({ token });
});

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
