import { Menu } from "antd";
import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    current: "mail",
  };

  handleClick = (e) => {
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key="deadlines" icon={<MailOutlined />}>
          What's due?
        </Menu.Item>
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Navigation Two
        </Menu.Item>
      </Menu>
    );
  }
}

ReactDOM.render(<App />, mountNode);
