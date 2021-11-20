import ReactDOM from 'react-dom';

import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import  {AuthContextProvider} from './store/auth-context';



ReactDOM.render(
  <AuthContextProvider>
    <HashRouter>
      <App />  
    </HashRouter>
  </AuthContextProvider>,
  document.getElementById('root')
);
