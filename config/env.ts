export const env = {
  mongoUrl: process.env.MONGO_URL,

  ai: {
    appId: process.env.BAIDU_AI_ID,
    appKey: process.env.BAIDU_AI_AK,
    secretKey: process.env.BAIDU_AI_SK,
  },

  uptimeKumaToken: process.env.UPTIME_KUMA_TOKEN,
  tailchatNotifyId: process.env.TAILCHAT_NOTIFY_ID,
};
