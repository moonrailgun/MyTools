import React from 'react';
import BaseLayout from '../../components/Layout';
import { Button } from 'antd';

const OtherToolPage: React.FC = () => {
  const list = [
    {
      name: 'Nginx Config',
      url: 'https://www.digitalocean.com/community/tools/nginx',
    },
    {
      name: '网站SSL测试',
      url: 'https://www.ssllabs.com/ssltest/index.html',
    },
    {
      name: '服务器测试脚本',
      url: 'https://github.com/ernisn/superspeed',
    },
    {
      name: '在线GIF编辑',
      url: 'http://www.gifntext.com/',
    },
    {
      name: '代码片段生成',
      url: 'https://carbon.now.sh/',
    },
    {
      name: 'Mermaid Live Editor',
      url: 'https://mermaid-js.github.io/mermaid-live-editor/',
    },
    {
      name: '排序算法',
      url: 'https://www.toptal.com/developers/sorting-algorithms',
    },
    {
      name: 'waifulabs',
      url: 'https://waifulabs.com/',
    },
    {
      name: '在线纯前端图片加水印',
      url: 'https://github.com/dxcweb/watermark',
    },
  ];

  return (
    <BaseLayout title="其他工具" link="/tools/other-tools">
      {list.map((item) => (
        <div key={`${item.name}#${item.url}`}>
          <Button type="link" onClick={() => window.open(item.url)}>
            {item.name}
          </Button>
        </div>
      ))}
    </BaseLayout>
  );
};

export default OtherToolPage;
