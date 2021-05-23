import {Component} from 'react';
import {Card, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList} from '@fortawesome/free-solid-svg-icons';

export default class BookList extends Component {
  render() {
    return (
       <Card className={"border border-dark bg-dark text-white"}>
         <Card.Header> <FontAwesomeIcon icon={faList} /> Book List</Card.Header>
         <Card.Body>
           <Table striped bordered hover variant="dark">
             <thead>
             <tr>
               <th>Title</th>
               <th>Author</th>
               <th>ISBN Number</th>
               <th>Price</th>
               <th>Action</th>
             </tr>
             </thead>
             <tbody>
             
             <tr align="center">
               <td colSpan="6">No Book Available.</td>
             </tr>
             </tbody>
           </Table>
         </Card.Body>
       </Card>
    );
  }
}
