// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {Switch, Route, Redirect} from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import type { Store } from '../reducers/types';
import routes from '../constants/routes';
import RequestsPage from './RequestsPage';
import ServersPage from './ServersPage';
import Header from '../components/Header';

type Props = {
  store: Store,
  history: {}
};

export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <React.Fragment>
            <Header />
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/requests" />} />
              <Route exact path={routes.REQUESTS} component={RequestsPage} />
              <Route exact path={routes.SERVERS} component={ServersPage} />
            </Switch>
          </React.Fragment>
        </ConnectedRouter>
      </Provider>
    );
  }
}
