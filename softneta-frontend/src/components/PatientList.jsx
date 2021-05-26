import {Component} from 'react';
import {Button, ButtonGroup, Card, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash,faList} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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
  
  render() {
    return (
       <Card className={'border border-dark bg-dark text-white'}>
         <Card.Header> <FontAwesomeIcon icon={faList}/> Patient Study List</Card.Header>
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
                     <tr key={patientStudy.id}>
                       <td>{patientStudy.personCode}</td>
                       <td>{patientStudy.fullName}</td>
                       <td>{patientStudy.dob}</td>
                       <td>{patientStudy.studyName}</td>
                       <td>{patientStudy.date}</td>
                       <td>
                         <ButtonGroup>
                           <Button size={"sm"} variant={"outline-primary"} style={{margin: 6}}><FontAwesomeIcon icon={faEdit}/></Button>
                           <Button size={"sm"} variant={"outline-danger"} style={{margin: 6}}><FontAwesomeIcon icon={faTrash}/></Button>
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
