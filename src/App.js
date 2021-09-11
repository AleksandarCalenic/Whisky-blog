import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './components/Pages/Home';
import Whiskies from './components/Pages/Whiskies';
import Login from './components/Pages/Login';
import WhiskyDetail from './components/Pages/WhiskyDetail';
import PageNotFound from './components/Pages/PageNotFound';

import './App.css';
import StoreContext from './store/store-context';

function App() {

  const context = useContext(StoreContext);

  const login = context.isLogin;

  return (
    <div className='container'>
      <Layout>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home' >
            <Home />
          </Route>
          <Route path='/whiskies' exact>
            {login && <Whiskies />}
            {!login && <Redirect to='/login' />}
          </Route>
          <Route path='/whiskies/:whiskyId' exact>
            {login && <WhiskyDetail />}
            {!login && <Redirect to='/login' />}
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </Layout>
    </div>

  );
}

export default App;