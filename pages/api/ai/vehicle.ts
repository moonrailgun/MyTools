import { NextApiHandler } from 'next';
import { env } from '../../../config/env';

const AipImageClassifyClient = require('baidu-aip-sdk').imageClassify;

const APP_ID = env.ai.appId;
const API_KEY = env.ai.appKey;
const SECRET_KEY = env.ai.secretKey;

// https://sourcegraph.com/github.com/Baidu-AIP/nodejs-sdk@master/-/blob/src/AipImageClassify.js?utm_source=share#L119

const handler: NextApiHandler = async (req, res) => {
  try {
    // 新建一个对象，建议只保存一个对象调用服务接口
    const client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);
    const imageBase64: string = req.body.imageBase64;

    if (!imageBase64) {
      res.status(500).send('require imageBase64!');
      return;
    }

    const result = await client.carDetect(imageBase64);

    res.status(200).json({ result });
  } catch (err: any) {
    console.error(err);
    res.status(500).json(err.message);
  }
};

export default handler;
