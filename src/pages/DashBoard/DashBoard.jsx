import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import routePath from '../../Routes/Path';
const { Header, Sider, Content } = Layout;

const DashBoard = () => {
    const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} width={300}  collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: <> <div className=""
               onClick={()=> navigate(routePath.STOCK)}
               > Stock</div></>,
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: <> <div className=""
               onClick={()=> navigate(routePath.SALEORDER)}
               > Sale Order</div></>,
            },
            // {
            //   key: '2',
            //   icon: <VideoCameraOutlined />,
            //   label: 'nav ',
            // },
            // {
            //   key: '3',
            //   icon: <UploadOutlined />,
            //   label: 'nav 3',
            // },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
            <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default DashBoard;