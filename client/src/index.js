import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux'

// import store from './store/index'
import App from './App';

// 样式
import 'normalize.css'
import 'antd/dist/antd.css';
import './style/index.scss'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ,
  document.getElementById('root')
);

