import { NextApiHandler } from 'next';
import { fetchGroupLink } from '../../../../utils/tencent/fetchGroupLink';

const handler: NextApiHandler = async (req, res) => {
  const { num } = req.query;

  try {
    const link = await fetchGroupLink(Number(num));
    res.status(200).json({ result: true, link });
  } catch (err: any) {
    res.status(500).json(err);
  }
};

export default handler;
