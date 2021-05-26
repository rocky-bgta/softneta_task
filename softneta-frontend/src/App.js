import React from 'react';
import Container from 'react-bootstrap/Container';
import './App.css';
import {Col, Row} from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
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
               <Route path="/" exact component={Welcome}></Route>
               <Route path="/add" exact component={PatientEntryForm}></Route>
               <Route path="/edit/:id" exact component={PatientEntryForm}></Route>
               <Route path="/list" exact component={PatientList}></Route>
             </Switch>
           </Col>
         </Row>
       </Container>
       {/*<Footer/>*/}
     </Router>
  );
}
export default App;
