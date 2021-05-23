import React from 'react';
import Container from 'react-bootstrap/Container';
import './App.css';
import {Col, Row} from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Book from './components/Book';
import BookList from './components/BookList';
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
               <Route path="/add" exact component={Book}></Route>
               <Route path="/list" exact component={BookList}></Route>
             </Switch>
           </Col>
         </Row>
       </Container>
       <Footer/>
     </Router>
  );
}

// const App = () => (
//    <Container className="p-3">
//
//        <h1 className="header">Patient Info</h1>
//
//        <Form>
//          <Form.Group controlId="form1">
//            <Form.Label>Person code</Form.Label>
//            <Form.Control type="text" placeholder="Enter Person Code"/>
//          </Form.Group>
//
//          <Form.Group controlId="form3">
//            <Form.Label>First Name</Form.Label>
//            <Form.Control type="text" placeholder="Enter First Name"/>
//          </Form.Group>
//
//          <Form.Group>
//            <Form.Label>Last Name</Form.Label>
//            <Form.Control type="text" placeholder="Last Name"/>
//          </Form.Group>
//
//          <Form.Group>
//            <Form.Label>Date of birth</Form.Label>
//            <Form.Control type="date" placeholder="Date of birth"/>
//          </Form.Group>
//
//
//          <Form.Group>
//            <Button variant="primary" type="submit">
//              Submit
//            </Button>
//          </Form.Group>
//        </Form>
//
//    </Container>
// );

export default App;
