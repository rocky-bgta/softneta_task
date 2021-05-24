import {Component} from 'react';
import {Button, ButtonGroup, Card, Col, Form, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faPlus, faMinus, faList} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Notification from './Notification';

export default class PatientEntryForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    //this.bookInfoChange = this.bookInfoChange.bind(this);
    //this.submitBook = this.submitBook.bind(this);
  }
  
  initialState = {
    personCode: '',
    firstName: '',
    lastName: '',
    dob: '',
    studyList: [{
      name: '',
      description: '',
      date: '',
    }]
  }
  resetBook = () => {
    this.setState(()=> this.initialState )
  }
  
  submitBook = event => {
    event.preventDefault();
    const patientStudyModel = {
      personCode: this.state.personCode,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      dob: this.state.dob,
      studyList: this.state.studyList
    };
    
    console.log("Data: "+ JSON.stringify(patientStudyModel));
    
    
    axios.post("",patientStudyModel)
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
    let studyList;
    const newStudy = {
      name: '',
      description: '',
      date:''
    }
    studyList = this.state.studyList;
    studyList.push(newStudy);
    
    this.setState({studyList: studyList})
    console.log(studyList);
  }
  
  removeStudy =(index)=>{
    let studyList = [...this.state.studyList];
    studyList = this.state.studyList;
    if(studyList.length!=1) {
      studyList.splice(index,1);
      this.setState({ studyList });
    }
  }
  
  handlePatientInfoChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  
  handleInputStudyChange = (event, index) => {
    const { name, value } = event.target;
    const studyList = [...this.state.studyList];
    studyList[index][name] = value;
    this.setState(studyList);
  };
  
  render() {
    
    const {personCode, firstName, lastName, dob} = this.state;
    
    return (
       
       <div>
         <div style={{"display":this.state.show ? "block": "none"}}>
           <Notification children={{show: this.state.show, message:"Book Save Successfully"}}/>
         </div>
         
         <Card className={'border border-dark bg-dark text-white'}>
           <Card.Header>Add New Patient info</Card.Header>
           <Form onReset={this.resetBook} onSubmit={this.submitBook} id="bookFormId">
             <Card.Body>
               <Form.Row>
                 <Form.Group as={Col}>
                   <Form.Label>Person</Form.Label>
                   <Form.Control
                      type="text"
                      name="personCode"
                      autoComplete="off"
                      value={personCode}
                      onChange={this.handlePatientInfoChange}
                      required
                      className={'bg-dark text-white'}
                      placeholder="Enter Person Code"/>
                 </Form.Group>
                 <Form.Group as={Col}>
                   <Form.Label>First Name</Form.Label>
                   <Form.Control
                      type="text"
                      name="firstName"
                      autoComplete="off"
                      value={firstName}
                      required
                      onChange={this.handlePatientInfoChange}
                      className={'bg-dark text-white'}
                      placeholder="Enter Author Name"/>
                 </Form.Group>
                 <Form.Group as={Col}>
                   <Form.Label>Last Name</Form.Label>
                   <Form.Control
                      type="text"
                      name="lastName"
                      autoComplete="off"
                      value={lastName}
                      onChange={this.handlePatientInfoChange}
                      required
                      className={'bg-dark text-white'}
                      placeholder="Enter Last Name"/>
                 </Form.Group>
                 <Form.Group as={Col}>
                   <Form.Label>Date of Birth</Form.Label>
                   <Form.Control
                      type="date"
                      name="dob"
                      autoComplete="off"
                      value={dob}
                      onChange={this.handlePatientInfoChange}
                      required
                      className={'bg-dark text-white'}
                      placeholder="Enter Patient DOB"/>
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
                                   onChange={e => this.handleInputStudyChange(e, index)}
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
                                 onChange={e => this.handleInputStudyChange(e, index)}
                                 required
                                 className={'bg-dark text-white'}
                                 placeholder="Enter Study Description"/></td>
                              <td>
                                <Form.Control
                                   type="date"
                                   name="date"
                                   autoComplete="off"
                                   value={study.date}
                                   onChange={e => this.handleInputStudyChange(e, index)}
                                   required
                                   className={'bg-dark text-white'}
                                   placeholder="Enter Study date"/>
                              </td>
                              <td>
                                <ButtonGroup>
                                  <Button size={'sm'} variant={'outline-primary'} onClick={this.addStudy} style={{margin: 6}}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                    </Button>
                                  
                                  <Button size={'sm'} variant={'outline-danger'} onClick={()=>this.removeStudy(index)} style={{margin: 6}}>
                                    <FontAwesomeIcon icon={faMinus}/>
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
             </Card.Footer>
           </Form>
         </Card>
       </div>
    );
  }
}
