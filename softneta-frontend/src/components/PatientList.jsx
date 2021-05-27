import {Component} from 'react';
import {Button, ButtonGroup, Card, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash, faList} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

export default class PatientList extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    
  }
  initialState = {
    patientStudyList: []
  }
  
  componentDidMount() {
    this.getPatientStudyList();
  }
  
  successNotify = (message) => toast.success(message);
  errorNotify = (message) => toast.error(message);
  
  getPatientStudyList(){
    axios.get("http://localhost:3000/api/patient-info/list")
       .then(response=> response.data)
       .then((data)=>{
         this.initialState.patientStudyList = data.data;
         this.setState(this.initialState)
       }).catch((response)=>{
         console.log(response);
    })
  }
  
  deletePatientInfo = (patientId) => {
    axios.delete("http://localhost:3000/api/patient-info/delete/"+patientId)
       .then(response=> {
         if(response.data!=null){
           this.successNotify("Delete Patient successfully");
           this.setState({
             patientStudyList: this.state.patientStudyList.filter(patient => patient.id !== patientId)
           })
         }else {
           this.errorNotify("Failed to delete patient");
         }
       })
  }
  
  addPatientInfo = () =>{
    return this.props.history.push("/add")
  }
  
  editPatientInfo = (patientId) =>{
    return this.props.history.push("/edit/"+patientId)
  }
  
  
  
  render() {
    return (
       <div>
         <ToastContainer autoClose={2000} />
         <Card className={'border border-dark bg-dark text-white'}>
           <Card.Header>
                   <FontAwesomeIcon icon={faList}/> Patient Study List
             
               <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                 <Button size={'sm'}
                         variant={'outline-primary'}
                         onClick={this.addPatientInfo.bind(this)}
                         style={{margin: 6}}>
                   Add Patient Info
                 </Button>
  
               </div>
              
            
           </Card.Header>
           <Card.Body>
             <Table striped bordered hover variant="dark">
               <thead>
               <tr>
                 <th>Person Code</th>
                 <th>Patient Name</th>
                 <th>DOB</th>
                 <th>Study Name</th>
                 <th>Update Time</th>
                 <th>Action</th>
               </tr>
               </thead>
               <tbody>
               {
                 this.state.patientStudyList.length === 0 ?
                    <tr align="center">
                      <td colSpan="6">No Patient study recorded yet.</td>
                    </tr> :
                    this.state.patientStudyList.map((patientStudy,index) => (
                       <tr key={index}>
                         <td>{patientStudy.personCode}</td>
                         <td>{patientStudy.fullName}</td>
                         <td>{patientStudy.dob}</td>
                         <td>{patientStudy.studyName}</td>
                         <td>{moment(patientStudy.date).format('YYYY-MM-DD HH:mm:ss')}</td>
                         <td>
                           <ButtonGroup>
                             <Button size={"sm"} variant={"outline-primary"} style={{margin: 6}} onClick={this.editPatientInfo.bind(this, patientStudy.id)}><FontAwesomeIcon icon={faEdit}/></Button>
                             <Button size={"sm"} variant={"outline-danger"} onClick={this.deletePatientInfo.bind(this, patientStudy.id)} style={{margin: 6}}><FontAwesomeIcon icon={faTrash}/></Button>
                           </ButtonGroup>
                         </td>
                       </tr>
                    ))
               }
               </tbody>
             </Table>
           </Card.Body>
         </Card>
       </div>
    );
  }
}
