import React from 'react';
import styles from '../css/RequestView.sass';
import {InputGroup, FormControl, DropdownButton, MenuItem, Tabs, Tab, Table, Button, Glyphicon} from 'react-bootstrap';
import autobind from 'autobind-decorator';
import methods from '../constants/methods';
import JSONEditor from './JSONEditor';

@autobind
export default class RequestView extends React.Component {
  static lastHeaderID = 0;

  constructor(props) {
    super(props);
    this.state = this.getState(props);
  }

  getState(props) {
    let state = Object.assign({}, props.request, {
      headers: Object.keys(props.request.headers).map(key => ({
        id: RequestView.lastHeaderID++,
        key,
        value: props.request.headers[key]
      }))
    });
    state.headers.push({
      id: RequestView.lastHeaderID++,
      key: '',
      value: ''
    });
    return state;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.request !== nextProps.request) {
      this.setState(this.getState(nextProps));
    }
  }

  onUrlChange(e) {
    this.setState({url: e.target.value});
  }

  onMethodChange(method) {
    this.setState({method});
  }

  onBodyChange(value) {
    this.setState({body: value});
  }

  onHeaderChange(id, key, value) {
    let addNew = false;
    let headers = this.state.headers.map((header, index) => {
      if (header.id === id) {
        if (index + 1 === this.state.headers.length) {
          addNew = true;
        }
        return {id, key, value};
      }
      return header;
    });
    if (addNew) {
      headers.push({
        id: RequestView.lastHeaderID++,
        key: '',
        value: ''
      });
    }
    this.setState({headers});
  }

  onHeaderRemove(id) {
    let headers = this.state.headers.filter((header, index) =>
      header.id !== id || index + 1 === this.state.headers.length
    );
    this.setState({headers});
  }

  renderHeaderSection() {
    let {url, method} = this.state;
    return (
      <div className="request-header">
        <InputGroup>
          <FormControl
            type="text"
            placeholder="url"
            value={url}
            onChange={this.onUrlChange} />
          <DropdownButton
            pullRight
            componentClass={InputGroup.Button}
            onSelect={this.onMethodChange}
            title={method.toUpperCase()}>
            {methods.map(method => (
              <MenuItem eventKey={method}>{method.toUpperCase()}</MenuItem>
            ))}
          </DropdownButton>
        </InputGroup>
      </div>
    );
  }

  renderMainSection() {
    let {headers, body} = this.state;
    return (
      <div className="request-main">
        <Tabs defaultActiveKey={1}>
          <Tab eventKey={1} title="Headers">
            <Table striped bordered condensed hover className="table-headers-view">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {
                  headers.map(({id, key, value}) => (
                    <tr
                      key={id}
                      className="headers-item">
                      <td>
                        <FormControl
                          type="text"
                          placeholder="key"
                          value={key}
                          onChange={e => this.onHeaderChange(id, e.target.value, value)} />
                      </td>
                      <td>
                        <FormControl
                          type="text"
                          placeholder="value"
                          value={value}
                          onChange={e => this.onHeaderChange(id, key, e.target.value)} />
                        <div className="remove-btn">
                          <Button
                            onClick={() => this.onHeaderRemove(id)}>
                            <i className="fas fa-minus fa-xs"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey={2} title="Body">
            <JSONEditor
              value={body}
              onChange={this.onBodyChange} />
          </Tab>
        </Tabs>
      </div>
    );
  }

  renderControllsSection() {
    return (
      <div className="request-controlls-section"></div>
    );
  }

  render() {
    return (
      <div className="rut-request-view">
        {this.renderHeaderSection()}
        {this.renderMainSection()}
        {this.renderControllsSection()}
      </div>
    );
  }
}
