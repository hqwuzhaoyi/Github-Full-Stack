import { useState, useCallback } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { withRouter, Router } from "next/router";
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Input,
  Avatar,
  Tooltip,
  Dropdown
} from "antd";
import getConfig from "next/config";
import Container from "./Container";
import { logout } from "../store/store";

import axios from "axios";

const { Header, Content, Footer } = Layout;

const { publicRuntimeConfig } = getConfig();

const githubIconStyle = {
  color: "white",
  fontSize: 40,
  display: "block",
  paddingTop: 10,
  marginRight: 20
};

const footerStyle = {
  textAlign: "center"
};

const Comp = ({ color, children, style }) => (
  <div style={{ color, ...style }}>{children}</div>
);

function MyLayout({ children, user, logout, router }) {
  const urlQuery = router.query && router.query.query

  const [search, setsearch] = useState(urlQuery || '');

  const handleSearchChange = useCallback(
    event => {
      setsearch(event.target.value);
    },
    []
  );

  const handleOnSearch = useCallback(() => {
    router.push(`/search?query=${search}`);
  }, [search]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleGotoAuth = useCallback(e => {
    e.preventDefault();
    console.log(router);
    axios
      .get(`/prepare-auth?${router.asPath}`)
      .then(resp => {
        if (resp.status === 200) {
          location.href = publicRuntimeConfig.OAUTH_URL;
        } else {
          console.log("prepare auth failed", resp);
        }
      })
      .catch(err => console.log("prepare auth failed", err));
  }, []);

  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a onClick={handleLogout}>登 出</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="log">
              <Link href="/">
                <a>
                  <Icon type="github" style={githubIconStyle}></Icon>
                </a>
              </Link>
            </div>
            <div>
              <Input.Search
                placeholder="搜索仓库"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <Dropdown overlay={userDropDown}>
                  <a href="/">
                    <Avatar size="40" src={user.avatar_url} />
                  </a>
                </Dropdown>
              ) : (
                <Tooltip title="点击进行登录">
                  <a
                    href={`/prepare-auth?${router.asPath}`}
                    // onClick={handleGotoAuth}
                  >
                    <Avatar size="40" icon="user" />
                  </a>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container renderer={<Comp style={{ fontSize: "14px" }} />}>
          {children}
        </Container>
      </Content>
      <Footer style={footerStyle}>
        Develop by Prajna @
        <a href="mailto:hqwuzhaoyi@qq.com">hqwuzhaoyi@qq.com</a>
      </Footer>
      <style jsx>
        {`
          .header-inner {
            display: flex;
            justify-content: space-between;
          }
          .header-left {
            display: flex;
            justify-content: flex-start;
          }

          .content {
            color: red;
          }
        `}
      </style>
      <style jsx global>{`
      #__next {
          height: 100%;
        }
        .ant-layout {
          min-height 100%;
        }
        .ant-layout-header {
          padding-left:0;
          padding-right:0;
        }
        .ant-layout-content {
          background: #fff
        }
        `}</style>
    </Layout>
  );
}

export default connect(
  function mapState(state) {
    return {
      user: state.user
    };
  },
  function mapReducer(dispatch) {
    return {
      logout: () => dispatch(logout())
    };
  }
)(withRouter(MyLayout));
