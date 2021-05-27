import {Component} from 'react';
import {Button, ButtonGroup, Card, Col, Form, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faPlus, faMinus, faList} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../src/calendar.css'

export default class PatientEntryForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handlePatientInfoChange = this.handlePatientInfoChange.bind(this);
    this.submitPatientInfo = this.submitPatientInfo.bind(this);
  }
  
  initialState = {
    id:'',
    personCode: '',
    firstName: '',
    lastName: '',
    dob: '',
    studyList: [{
      name: '',
      description: '',
      date: new Date(),
    }]
  }
  
  resetPatientInfo = () => {
    let studyList = [{
      name: '',
      description: '',
      date: new Date(),
    }]
    this.initialState.studyList = studyList;
    this.setState(this.initialState)
  }
  
  successNotify = (message) => toast.success(message);
  errorNotify = (message) => toast.error(message);
  
  submitPatientInfo = event => {
    event.preventDefault();
    const patientStudyModel = {
      personCode: this.state.personCode.trim(),
      firstName: this.state.firstName.trim(),
      lastName: this.state.lastName.trim(),
      dob: this.state.dob,
      studyList: this.state.studyList
    };
    
    //console.log('Data of patient' + ': ' + JSON.stringify(patientStudyModel, null, 2));
    
    axios.post("http://localhost:3000/api/patient-info/create",patientStudyModel)
       .then(response=>{
         if(response.data.data != null){
           this.successNotify(response.data.message);
           this.resetPatientInfo();
           setTimeout(()=>{this.patientList()},2000)
         }else {
           this.errorNotify(response.data.message);
         }
       }).catch(()=>{
      this.errorNotify("Something went wrong");
    })
    
  };
  
  updatePatientInfo = event =>{
    event.preventDefault();
    const patientStudyModel = {
      id: this.state.id,
      personCode: this.state.personCode.trim(),
      firstName: this.state.firstName.trim(),
      lastName: this.state.lastName.trim(),
      dob: this.state.dob,
      studyList: this.state.studyList
    };
  
    //console.log('Data of patient' + ': ' + JSON.stringify(patientStudyModel, null, 2));
  
    axios.put("http://localhost:3000/api/patient-info/update", patientStudyModel)
       .then(response=>{
         if(response.data.data != null){
           this.successNotify(response.data.message);
           setTimeout(()=>{this.patientList()},2000)
         }else {
           this.errorNotify(response.data.message);
         }
       }).catch(()=>{
         this.errorNotify("Something went wrong");
    })
   
  }
  
  addStudy =()=>{
    let studyList;
    const newStudy = {
      name: '',
      description: '',
      date: new Date()
    }
    studyList = this.state.studyList;
    studyList.push(newStudy);
    this.setState({studyList: studyList})
  }
  
  removeStudy =(index)=>{
    let studyList = [...this.state.studyList];
    if(studyList.length!==1) {
      studyList.splice(index,1);
      this.setState({ studyList });
    }
  }
  
  handlePatientInfoChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  
  handleDateChange(date, index){
    const studyList = [...this.state.studyList];
    studyList[index]['date'] = date;
    this.setState(studyList);
  }
  
  handleInputStudyChange = (event, index) => {
    const { name, value } = event.target;
    const studyList = [...this.state.studyList];
    studyList[index][name] = value;
    this.setState(studyList);
  };
  
  patientList = () => {
    return this.props.history.push("/")
  }
  
  componentDidMount() {
    const patientId = this.props.match.params.id;
    if(patientId){
      this.findPatientById(patientId);
    }
  }
  
  findPatientById = (patientId) => {
    let responseData;
    axios.get("http://localhost:3000/api/patient-info/get/"+patientId)
       .then(response => {
         if(response.data.data != null){
           responseData = response.data.data;
           for(let index in responseData.studyList){
             responseData.studyList[index].date = new Date(responseData.studyList[index].date)
           }
           this.setState(responseData)
         }
       }).catch(() => {
      this.errorNotify("Something went wrong");
    })
  }
  
  render() {
    
    const {personCode, firstName, lastName, dob} = this.state;
    
    return (
       
       <div>
  
         <ToastContainer autoClose={2000} />
         
         <Card className={'border border-dark bg-dark text-white'}>
           <Card.Header>
             {this.state.id ? "Update Patient info" : "Add New Patient info"}
           </Card.Header>
           <Form onReset={this.resetPatientInfo} onSubmit={ this.state.id ? this.updatePatientInfo : this.submitPatientInfo} id="patientInfoFormId">
             <Card.Body>
               <Form.Row>
                 <Form.Group as={Col}>
                   <Form.Label>Person Code</Form.Label>
                   <Form.Control
                      type="text"
                      maxLength="30"
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
                      maxLength="50"
                      autoComplete="off"
                      value={firstName}
                      required
                      onChange={this.handlePatientInfoChange}
                      className={'bg-dark text-white'}
                      placeholder="Enter First Name"/>
                 </Form.Group>
                 <Form.Group as={Col}>
                   <Form.Label>Last Name</Form.Label>
                   <Form.Control
                      type="text"
                      name="lastName"
                      maxLength="50"
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
                 <Card className={'border border-dark bg-info text-white'}>
                   <Card.Header> <FontAwesomeIcon icon={faList}/> Study info</Card.Header>
                   <Card.Body>
                     <Table striped bordered hover variant="info" className={'table-responsive-lg'}>
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
                                   className={'info text-black'}
                                   placeholder="Enter Study Name"/>
                              </td>
                              <td>
                                <Form.Control
                                 as="textarea"
                                 rows={2}
                                 maxLength={200}
                                 name="description"
                                 autoComplete="off"
                                 value={study.description}
                                 onChange={e => this.handleInputStudyChange(e, index)}
                                 required
                                 className={'info text-black'}
                                 placeholder="Enter Study Description"/></td>
                              <td className={'table-responsive-lg'}>
                                <DateTimePicker
                                   required
                                   className={'info react-calendar'}
                                   onChange={e => this.handleDateChange(e, index)}
                                   value={study.date}
                                />
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
                 <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Update" : "Save"}
               </Button>{' '}
               <Button size={'sm'} variant="info" type="reset">
                 <FontAwesomeIcon icon={faUndo}/> Reset
               </Button>{' '}
               <Button size={'sm'} variant="info" type="button" onClick={this.patientList.bind(this)}>
                 <FontAwesomeIcon icon={faList}/> Patient List
               </Button>
             </Card.Footer>
           </Form>
         </Card>
       </div>
    );
  }
}
