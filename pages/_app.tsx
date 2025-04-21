import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { isTiktokenAvailable } from '../utils/tiktoken-utils';
import { message } from 'antd';

// 导入全局样式
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [tiktokenReady, setTiktokenReady] = useState(false);

  // 初始化 tiktoken
  useEffect(() => {
    const init = async () => {
      try {
        const available = await isTiktokenAvailable();
        setTiktokenReady(available);
        if (!available) {
          message.error('Tiktoken 初始化失败，token 计数功能可能不可用');
        }
      } catch (error) {
        console.error('Failed to initialize tiktoken:', error);
        message.error('Tiktoken 初始化失败，token 计数功能可能不可用');
      }
    };

    init();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
