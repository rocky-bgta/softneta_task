import {Component} from 'react';
import {Button, ButtonGroup, Card, Col, Form, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faEdit, faTrash, faList} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Notification from './Notification';


export default class Book extends Component {
  
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.bookInfoChange = this.bookInfoChange.bind(this);
    this.submitBook = this.submitBook.bind(this);
  }
  
  
  
  initialState = {
    title: '',
    author: '',
    coverPhotoUrl: '',
    isbnNumber: '',
    price: '',
    studyList: [{
      key: '',
      name: '',
      description: '',
      creationTime: '',
      updateTime: ''
    }]
  }
  resetBook = () => {
    this.setState(()=> this.initialState )
  }
  
  submitBook = event => {
    event.preventDefault();
    const book = {
      title: this.state.title,
      author: this.state.author,
      coverPhotoUrl: this.state.coverPhotoUrl,
      isbnNumber: this.state.isbnNumber,
      price: this.state.price
    };
    
    axios.post("",book)
       .then(response=>{
         if(response.data !=null){
            this.setState({"show":true})
            setTimeout(()=>this.setState({"show":false}),3000);
         }else {
           this.setState({"show":false})
         }
       })
    this.setState(()=>this.initialState);
  };
  
  addStudy =()=>{
    let studyList = [];
    const newStudy = {
      key: '',
      name: '',
      description: '',
      creationTime: '',
      updateTime: ''
    }
    studyList = this.state.studyList;
    studyList.push(newStudy);
    
    this.setState({studyList: studyList})
    console.log(studyList);
  }
  
  removeStudy =(index)=>{
    let studyList = [];
    studyList = this.state.studyList;
    if(studyList.length!=1) {
      studyList = studyList.splice(1, index)
      this.setState({studyList: studyList})
    }
    console.log(studyList);
  }
  
  bookInfoChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  
  
  render() {
    
    const {title, author, coverPhotoUrl, isbnNumber, price} = this.state;
    
    return (
       
       <div>
         <div style={{"display":this.state.show ? "block": "none"}}>
           <Notification children={{show: this.state.show, message:"Book Save Successfully"}}/>
         </div>
         
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
               {
                 <Card className={'border border-dark bg-dark text-white'}>
                   <Card.Header> <FontAwesomeIcon icon={faList}/> Study info</Card.Header>
                   <Card.Body>
                     <Table striped bordered hover variant="dark">
                       <thead>
                       <tr>
                         <th>Name</th>
                         <th>Description</th>
                         <th>Date</th>
                         <th>Action</th>
                       </tr>
                       </thead>
                       <tbody>
                       {
                         this.state.studyList.map((study,index) => (
                            <tr key={index}>
                              <td>
                                <Form.Control
                                   type="text"
                                   name="name"
                                   autoComplete="off"
                                   value={study.name}
                                   onChange={this.bookInfoChange}
                                   required
                                   className={'bg-dark text-white'}
                                   placeholder="Enter Study Name"/>
                              </td>
                              <td>
                                <Form.Control
                                 type="text"
                                 name="description"
                                 autoComplete="off"
                                 value={study.description}
                                 onChange={this.bookInfoChange}
                                 required
                                 className={'bg-dark text-white'}
                                 placeholder="Enter Study Description"/></td>
                              <td>
                                <Form.Control
                                   type="dateTime"
                                   name="updateTime"
                                   autoComplete="off"
                                   value={study.updateTime}
                                   onChange={this.bookInfoChange}
                                   required
                                   className={'bg-dark text-white'}
                                   placeholder="Enter Study updateTime"/>
                              </td>
                              <td>
                                <ButtonGroup>
                                  <Button size={'sm'} variant={'outline-primary'} onClick={this.addStudy} style={{margin: 6}}>
                                    <FontAwesomeIcon icon={faSave}/>
                                    </Button>
                                  
                                  <Button size={'sm'} variant={'outline-danger'} onClick={()=>this.removeStudy(index)} style={{margin: 6}}>
                                    <FontAwesomeIcon icon={faUndo}/>
                                  </Button>
                                </ButtonGroup>
                              </td>
                            </tr>
                         ))
                       }
                       </tbody>
                     </Table>
                   </Card.Body>
                 </Card>
    
               }
             </Card.Body>
             <Card.Footer style={{'textAlign': 'right'}}>
               <Button size={'sm'} variant="success" type="submit">
                 <FontAwesomeIcon icon={faSave}/> Submit
               </Button>{' '}
               <Button size={'sm'} variant="info" type="reset">
                 <FontAwesomeIcon icon={faUndo}/> Reset
               </Button>
               <Button size={'sm'} variant="success" onClick={this.addStudy} type="button">
                 <FontAwesomeIcon icon={faSave}/> Add
               </Button>{' '}
             </Card.Footer>
           </Form>
         </Card>
       </div>
    );
  }
}
