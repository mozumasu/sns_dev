//インポート
const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//インスタンス化
const prisma = new PrismaClient();

//呟き投稿API
router.post('/post', async (req, res) => {
  const { content } = req.body;

  //呟き内容が空の時はDBに登録しない
  if (!content) {
    return res.status(400).json({ message: '投稿内容がありません。' });
  }

  try {
    //DBへ登録
    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: 1, //動的にIDを埋め込む機能を実装予定
      },
    });
    //status(201)=ok
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ massege: 'サーバーエラーです。' });
  }
});

//最新呟き取得API
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   //ユーザーが存在するかemailで確認
//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     return res.status(401).json({ error: 'そのユーザーは存在しません' });
//   }

//   //入力されたパスワードが登録されたパスワードと一致しているか確認
//   const isPasswordVaild = await bcrypt.compare(password, user.password);

//   if (!isPasswordVaild) {
//     return res.status(401).json({ error: 'そのパスワードは間違っています' });
//   }

//   const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
//     expiresIn: '1d',
//   });

//   return res.json({ token });
// });

module.exports = router;
