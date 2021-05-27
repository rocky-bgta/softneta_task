import {Component} from 'react';
import {Button, ButtonGroup, Card, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash, faList} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
       }).catch(()=>{
      this.errorNotify("Something went wrong");
    })
  }
  
  deletePatientInfo = (patientId) => {
    confirmAlert({
      title: 'Delete Patient Info',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.deletePatient(patientId)
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }
  
  deletePatient = (id)=>{
    axios.delete("http://localhost:3000/api/patient-info/delete/"+id)
       .then(response=> {
         if(response.data.data!=null){
           this.successNotify(response.data.message);
           this.setState({
             patientStudyList: this.state.patientStudyList.filter(patient => patient.id !== id)
           })
         }else {
           this.errorNotify(response.data.message);
         }
       }).catch(()=>{
      this.errorNotify("Something went wrong");
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
             <div style={{display: 'flex', justifyContent: 'flex-end'}}>
               <Button size={'sm'}
                       variant={'primary'}
                       onClick={this.addPatientInfo.bind(this)}
                       style={{margin: 6}}>
                 Add Patient Info
               </Button>
             </div>
           </Card.Header>
           <Card.Body>
             <Table striped bordered hover variant="dark" className={'table-responsive-lg'}>
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
                         <td>{moment(patientStudy.dob).format('YYYY-MM-DD')}</td>
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
