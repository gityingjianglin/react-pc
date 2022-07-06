import { Component } from 'react';
import './index.less';
// import {checkIsLogin} from '@/assets/utils/utils'
// import Vconsole from 'vconsole';
// new Vconsole();

interface TYPE {
  [key: string]: any;
}

class IndexPage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      list: [],
    };
  }
  render() {
    return (
      <div className="indexPage">首页</div>
    );
  }
  componentDidMount() {
    // checkIsLogin().then(() => {
    // })
  }
}

export default IndexPage;
