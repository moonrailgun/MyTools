import got from 'got';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { text, lang } = req.query;

  // 直接转发请求
  try {
    got.stream
      .get(
        `https://translate.google.cn/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${text}`
      )
      .pipe(res);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

export default handler;
