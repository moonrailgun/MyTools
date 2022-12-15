import { NextApiHandler } from 'next';
// import translate from 'google-translate-api';
import {
  getGoogleTranslateTkk,
  setGoogleTranslateTkk,
} from '../../../utils/db/models/google-translate';
import { getTKK, translate } from '../../../utils/translate';

const handler: NextApiHandler = async (req, res) => {
  try {
    const { text, from, to = 'zh-cn' } = req.query;

    if (Array.isArray(text) || Array.isArray(from) || Array.isArray(to)) {
      res.status(500).send('error type!');
      return;
    }

    if (!text) {
      res.status(500).send('require text!');
      return;
    }

    let { tkk, updatedAt } = await getGoogleTranslateTkk();
    if (
      tkk === null ||
      updatedAt === null ||
      new Date().valueOf() - updatedAt.valueOf() > 1000 * 60 * 10
    ) {
      // 如果token为空或上次更新时间低于10分钟
      tkk = (await getTKK())!;
      console.log('更新tkk: ', tkk);

      // 获取token
      await setGoogleTranslateTkk(tkk);
    }

    const result = await translate(tkk, text, { to });

    res.status(200).json({ result: result });
  } catch (err: any) {
    console.error(err);
    res.status(500).json(err.message);
  }
};

export default handler;
