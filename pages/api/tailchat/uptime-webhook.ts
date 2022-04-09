import { NextApiHandler } from 'next';
import { env } from '../../../config/env';
import axios from 'axios';

/**
 * 从uptime kuma转发到tailchat
 *
 * 使用方法
 * uptime kuma创建Webhook 通知
 * https://api.moonrailgun.com/api/tailchat/uptime-webhook?token=<HERE IS WITH $UPTIME_KUMA_TOKEN>
 * Content Type: application/json
 */
const handler: NextApiHandler = async (req, res) => {
  const token = req.query.token;

  if (!env.tailchatNotifyId) {
    res.status(500).send('tailchatNotifyId is invalid.');
    return;
  }

  if (token !== env.uptimeKumaToken) {
    res.status(500).send('Token is invalid.');
    return;
  }

  const { heartbeat, monitor, msg } = req.body;

  const text = `来自[uptime-kuma]: ${msg}\nheartbeat: ${heartbeat}|monitor: ${monitor}`;

  await axios.post(
    'https://paw-server-test.moonrailgun.com/api/plugin:com.msgbyte.simplenotify/webhook/callback',
    {
      subscribeId: env.tailchatNotifyId,
      text,
    }
  );

  res.status(200).json({});
};

export default handler;
