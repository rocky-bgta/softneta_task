import React from 'react';
import Container from 'react-bootstrap/Container';
import './App.css';
import {Col, Row} from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import PatientEntryForm from './components/PatientEntryForm';
import PatientList from './components/PatientList';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  const marginTop = {
    marginTop: '20px'
  };
  
  return (
     <Router>
       <NavigationBar/>
       <Container>
         <Row>
           <Col lg={12} style={marginTop}>
             <Switch>
               <Route path="/" exact component={PatientList}></Route>
               <Route path="/add" exact component={PatientEntryForm}></Route>
               <Route path="/edit/:id" exact component={PatientEntryForm}></Route>
             </Switch>
           </Col>
         </Row>
       </Container>
     </Router>
  );
}
export default App;
