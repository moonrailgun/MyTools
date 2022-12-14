import { NextApiHandler } from 'next';
import axios from 'axios';
import { load } from 'cheerio';

const handler: NextApiHandler = async (req, res) => {
  try {
    const { data: html } = await axios.get('https://steamstats.cn/xi', {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      },
    });
    const $ = load(html);
    const table = $('table');

    const trs = table.first().find('tbody > tr');
    const list = trs.toArray().map((tr) =>
      $(tr)
        .find('td')
        .toArray()
        .map((d, i) => {
          if (i === 6) {
            return $(d).find('a').attr('href');
          } else {
            return $(d).text().trim();
          }
        })
    );

    const data = list.map((item) => ({
      name: item[1],
      type: item[2],
      start: item[3],
      end: item[4],
      forever: item[5],
      link: item[6],
    }));

    res.status(200).json({ result: true, data });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default handler;
