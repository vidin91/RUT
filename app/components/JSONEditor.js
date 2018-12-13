import autobind from 'autobind-decorator';
import React from 'react';
import Editor from 'jsoneditor';
import ReactDOM from 'react-dom';
import 'jsoneditor/dist/jsoneditor.min.css';

@autobind
export default class JSONEditor extends React.Component {
  componentDidMount() {
    this.editor = new Editor(ReactDOM.findDOMNode(this), {
      mode: 'code',
      onChange: this.onChange
    });
    this.editor.setText(this.props.value || "");
  }

  onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.editor.getText());
    }
  }

  render() {
    return (
      <div className="json-editor" />
    );
  }
}
