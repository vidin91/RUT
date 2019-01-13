import React from 'react';
import RequestView from '../components/RequestView';
import autobind from 'autobind-decorator';

@autobind
export default class RequestsPage extends React.Component {
  state = {
    request: {
      method: 'post',
      url: 'hostname/api',
      headers: {
        'header-a': 'header-a-value',
        'header-b': 'header-b-value'
      },
      body: 'some text',
      response: {
        status: 200,
        headers: {},
        body: null
      },
      _metadata: {
        collection: 1,
        dirty: false
      }
    }
  }
  
  onChange(request) {
    this.setState({request});
  }

  render() {
    return (
      <div className="rut-requests-page">
        <RequestView
          request={this.state.request}
          onChange={this.onChange} />
      </div>
    );
  }
}
