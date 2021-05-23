import {Component} from 'react';
import {Button, Card, Col, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo} from '@fortawesome/free-solid-svg-icons';


export default class Book extends Component {
  
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.bookInfoChange = this.bookInfoChange.bind(this);
    this.submitBook = this.submitBook.bind(this);
  }
  
  initialState = {
    title: '',
    author: '',
    coverPhotoUrl: '',
    isbnNumber: '',
    price: ''
  }
  
  resetBook = () => {
    this.setState(()=> this.initialState )
  }
  
  submitBook(event) {
    event.preventDefault();
    alert('Title: ' + this.state.title +
          'author: ' + this.state.author +
          'coverPhotoUrl: ' + this.state.coverPhotoUrl +
          'isbnNumber: ' + this.state.isbnNumber);
    
  }
  
  bookInfoChange(event) {
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  
  
  render() {
    
    const {title, author, coverPhotoUrl, isbnNumber, price} = this.state;
    
    return (
       <Card className={'border border-dark bg-dark text-white'}>
         <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> Add New Book</Card.Header>
         <Form onReset={this.resetBook} onSubmit={this.submitBook} id="bookFormId">
           <Card.Body>
             <Form.Row>
               <Form.Group as={Col}>
                 <Form.Label>Title</Form.Label>
                 <Form.Control
                    type="text"
                    name="title"
                    autoComplete="off"
                    value={title}
                    onChange={this.bookInfoChange}
                    required
                    className={'bg-dark text-white'}
                    placeholder="Enter Book Title"/>
               </Form.Group>
               <Form.Group as={Col}>
                 <Form.Label>Author</Form.Label>
                 <Form.Control
                    type="text"
                    name="author"
                    autoComplete="off"
                    value={author}
                    required
                    onChange={this.bookInfoChange}
                    className={'bg-dark text-white'}
                    placeholder="Enter Author Name"/>
               </Form.Group>
             </Form.Row>
             <Form.Row>
               <Form.Group as={Col}>
                 <Form.Label>Cover Photo URL</Form.Label>
                 <Form.Control
                    type="text"
                    name="coverPhotoUrl"
                    autoComplete="off"
                    value={coverPhotoUrl}
                    onChange={this.bookInfoChange}
                    required
                    className={'bg-dark text-white'}
                    placeholder="Enter Book Cover Photo URL"/>
               </Form.Group>
               <Form.Group as={Col}>
                 <Form.Label>ISBN Number</Form.Label>
                 <Form.Control
                    type="text"
                    name="isbnNumber"
                    autoComplete="off"
                    value={isbnNumber}
                    onChange={this.bookInfoChange}
                    required
                    className={'bg-dark text-white'}
                    placeholder="Enter Book ISBN Number"/>
               </Form.Group>
             </Form.Row>
           </Card.Body>
           <Card.Footer style={{"textAlign":"right"}}>
             <Button size={'sm'} variant="success" type="submit">
               <FontAwesomeIcon icon={faSave} /> Submit
             </Button>{' '}
             <Button size={'sm'} variant="info" type="reset">
               <FontAwesomeIcon icon={faUndo} /> Reset
             </Button>
           </Card.Footer>
         </Form>
       </Card>
    );
  }
}
