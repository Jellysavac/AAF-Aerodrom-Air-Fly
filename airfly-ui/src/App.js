import React, {Component} from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavDropdown } from 'react-bootstrap';

class App extends Component {
  
  state = {
    flights: []
}

componentDidMount(){
    axios.get('http://localhost:8080/AirFly/let/getAllFlights')
    .then(res => {
        const flights = res.data;
        this.setState({flights});
    })
}

  render(){
  return (
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="#home">Air Fly</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link href="/register">
          Register
        </Nav.Link>
        <Nav.Link eventKey={2} href="/login">
         Login
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    <Table striped bordered hover>
    <thead>
    <tr>
        <th>Datum leta</th>
        <th>Broj mesta</th>
        <th>Vrsta leta</th>
        <th>Polazni Aerodrom</th>
        <th>Dolazni aerodrom</th>
        <th>Kompanija</th>
    </tr>
    </thead>
    <tbody>
       {this.state.flights.map((data, key) => {
           return(
               <tr key={key}>
                    <td>{data.datum}</td>
                    <td>{data.broj_mesta}</td>
                    <td>{data.vrsta}</td>
                    <td>{data.nazivPolaznog}</td>
                    <td>{data.nazivDolaznog}</td>
                    <td>{data.kompanija}</td>
               </tr>
           )
       })}
        
</tbody>
</Table>
</div>
  );
  }
}

export default App;
