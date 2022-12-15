import { NextApiHandler } from 'next';
import {
  fetchFinanceRate,
  getFinanceRate,
} from '../../../utils/db/models/finance-rate';

const handler: NextApiHandler = async (req, res) => {
  try {
    let { base = 'CNY' } = req.query;

    if (Array.isArray(base)) {
      base = base[0];
    }

    if (!base) {
      res.status(500).send('require code!');
      return;
    }

    let data = await getFinanceRate(base);
    if (!data) {
      data = await fetchFinanceRate(base);
    }

    res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json(err.message);
  }
};

export default handler;
