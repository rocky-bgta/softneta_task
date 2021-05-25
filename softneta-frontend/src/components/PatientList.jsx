import {Component} from 'react';
import {Button, ButtonGroup, Card, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash,faList} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class PatientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }
  
  componentDidMount() {
    this.getBooks();
  }
  
  getBooks(){
    // axios.get("http://localhost:8080")
    //    .then(response=>response.data)
    //    .then((data) => {
    //      this.setState({books: data})
    //    })
  }
  
  render() {
    return (
       <Card className={'border border-dark bg-dark text-white'}>
         <Card.Header> <FontAwesomeIcon icon={faList}/> Book List</Card.Header>
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
             {
               this.state.books.length === 0 ?
                  <tr align="center">
                    <td colSpan="6">No Book Available.</td>
                  </tr> :
                  this.state.books.map((book) => (
                     <tr key={book.id}>
                       <td>{book.title}</td>
                       <td>{book.author}</td>
                       <td>{book.isbnNumber}</td>
                       <td>{book.price}</td>
                       <td>
                         <ButtonGroup>
                           <Button size={"sm"} variant={"outline-primary"}></Button> <FontAwesomeIcon icon={faEdit}/>
                           <Button size={"sm"} variant={"outline-danger"}></Button> <FontAwesomeIcon icon={faTrash}/>/>
                         </ButtonGroup>
                       </td>
                     </tr>
                  ))
             }
             </tbody>
           </Table>
         </Card.Body>
       </Card>
    );
  }
}
