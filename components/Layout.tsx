import React, { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Input, Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  CodeSandboxOutlined,
  FileSearchOutlined,
  GithubOutlined,
  HomeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { routes, RouteItem } from '../routes';
import styled from 'styled-components';
import { useLocalStorage } from 'react-use';
import Fuse from 'fuse.js';
import _flatten from 'lodash/flatten';

const ContentMain = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const SearchContainer = styled.div`
  padding: 10px;
`;

/**
 * 搜索
 */
function useSearch() {
  const allNames = useMemo(
    () => _flatten(Object.values(routes)).map((item) => item[1]),
    []
  );
  const fuse = useMemo(() => {
    return new Fuse(allNames);
  }, []);

  const [result, setResult] = useState(allNames);

  const handleSearch = useCallback(
    (text: string) => {
      if (text === '') {
        setResult(allNames);
        return;
      }

      const res = fuse.search(text);

      setResult(res.map((d) => d.item));
    },
    [fuse]
  );

  return {
    result,
    handleSearch,
  };
}

const BaseLayout: React.FC<{
  title: string;
  link?: string;
}> = React.memo((props) => {
  const { title, link = '/', children } = props;
  const [collapsed, setCollapsed] = useLocalStorage('collapsed', false);
  const { result, handleSearch } = useSearch();

  const toggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const renderLink = useCallback(
    ([link, title]: RouteItem): React.ReactElement => {
      if (!result.includes(title)) {
        return <div />;
      }

      return (
        <Menu.Item key={link}>
          <Link href={link} legacyBehavior>
            <a>{title}</a>
          </Link>
        </Menu.Item>
      );
    },
    [result]
  );

  const renderSidebar = () => {
    return (
      <Layout.Sider
        theme="light"
        width={200}
        collapsible={true}
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
      >
        <SidebarContainer>
          <SearchContainer>
            <Input
              placeholder={'快速搜索'}
              prefix={<SearchOutlined />}
              allowClear={true}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </SearchContainer>
          <Menu
            mode="inline"
            selectedKeys={[link]}
            defaultOpenKeys={Object.keys(routes)}
            style={{ overflow: 'auto', flex: 1 }}
          >
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <Link href="/" legacyBehavior>
                <a>主页</a>
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              key="tools"
              icon={<AppstoreOutlined />}
              title="工具箱"
            >
              {routes['tools'].map(renderLink)}
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sandbox"
              icon={<CodeSandboxOutlined />}
              title="沙盒"
            >
              {routes['sandbox'].map(renderLink)}
            </Menu.SubMenu>
            <Menu.SubMenu key="github" icon={<GithubOutlined />} title="Github">
              {routes['github'].map(renderLink)}
            </Menu.SubMenu>
            <Menu.SubMenu
              key="query"
              icon={<FileSearchOutlined />}
              title="查询"
            >
              {routes['query'].map(renderLink)}
            </Menu.SubMenu>
          </Menu>
        </SidebarContainer>
      </Layout.Sider>
    );
  };

  const renderContent = () => {
    return (
      <Layout.Content
        style={{
          padding: '12px 24px 0',
          minHeight: 280,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100vh',
          overflow: 'auto',
        }}
      >
        <ContentMain>{children}</ContentMain>
        <Layout.Footer style={{ textAlign: 'center' }}>
          Powered by <a href="http://moonrailgun.com">moonrailgun</a> with ❤
        </Layout.Footer>
      </Layout.Content>
    );
  };

  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Layout style={{ height: '100%' }}>
        {renderSidebar()}
        {renderContent()}
      </Layout>
    </div>
  );
});
BaseLayout.displayName = 'BaseLayout';

export default BaseLayout;
