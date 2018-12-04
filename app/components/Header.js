import React from 'react';
import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import {withRouter} from 'react-router';
import autobind from 'autobind-decorator';

@autobind
class Header extends React.Component {
  static paths = [
    {label: 'Requests', path: '/requests', value: 1.1},
    {label: 'Servers', path: '/servers', value: 1.2}
  ]

  onNavigate(value) {
    // MAGIC - NOT WORKING!?!?!?!?
    // let location = paths.find(p => p.value === value).path;
    // this.props.history.push(location);
    let path;
    switch(value) {
      case 1.1: path = '/requests'; break;
      case 1.2: path = '/servers'; break;
      default: path = '/';
    }
    this.props.history.push(path);
  }

  render() {
    let {pathname} = this.props.location;
    let path = Header.paths.find(p => p.path === pathname)
    let label = path && path.label;
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            RUT
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight onSelect={this.onNavigate}>
          <NavDropdown eventKey={1} title={label}>
          {
            Header.paths.map(p => (
              <MenuItem eventKey={p.value}>{p.label}</MenuItem>
            ))
          }
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter(Header);
