import {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class NavigationBar extends Component {
  render() {
    return (
       <Navbar bg="dark" variant="dark">
         <Link to={""} className="navbar-brand">
           Softneta Task
         </Link>
       </Navbar>
    );
  }
}
