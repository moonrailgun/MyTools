import { NextApiHandler } from 'next';
import { getGithubData } from '../../../../utils/db/models/github-data';

const handler: NextApiHandler = async (req, res) => {
  const { username } = req.query;

  try {
    const cache = await getGithubData(String(username), 'starrepo');
    res
      .status(200)
      .json({ result: true, repos: cache.data, updatedAt: cache.updatedAt });
  } catch (err: any) {
    res.status(500).json(err);
  }
};

export default handler;
