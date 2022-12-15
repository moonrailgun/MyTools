import { NextApiHandler } from 'next';
import { env } from '../../../config/env';

const AipOcrClient = require('baidu-aip-sdk').ocr;

const APP_ID = env.ai.appId;
const API_KEY = env.ai.appKey;
const SECRET_KEY = env.ai.secretKey;

// https://cloud.baidu.com/doc/OCR/s/Ek3h7ycyg

type LanguageType =
  | 'CHN_ENG'
  | 'ENG'
  | 'POR'
  | 'FRE'
  | 'GER'
  | 'ITA'
  | 'SPA'
  | 'RUS'
  | 'JAP'
  | 'KOR';

const handler: NextApiHandler = async (req, res) => {
  try {
    // 新建一个对象，建议只保存一个对象调用服务接口
    const client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
    const imageBase64: string = req.body.imageBase64;
    const language: LanguageType = req.body.language ?? 'CHN_ENG';

    if (!imageBase64) {
      res.status(500).send('require imageBase64!');
      return;
    }

    const result = await client.generalBasic(imageBase64, {
      language_type: language,
    });

    res.status(200).json({ result });
  } catch (err: any) {
    console.error(err);
    res.status(500).json(err.message);
  }
};

export default handler;
