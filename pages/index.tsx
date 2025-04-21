import Link from 'next/link';
import Layout from '../components/Layout';
import { Typography } from 'antd';

const IndexPage = () => (
  <Layout title="主页">
    <Typography.Title level={2}>
      Hi, 这里是&nbsp;
      <Link href="http://moonrailgun.com" legacyBehavior>
        <a>moonrailgun</a>
      </Link>
      &nbsp; 的个人工具箱
    </Typography.Title>
  </Layout>
);

export default IndexPage;
