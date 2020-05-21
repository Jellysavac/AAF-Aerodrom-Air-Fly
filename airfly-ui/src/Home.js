import React, {Component} from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { FaSearch } from "react-icons/fa";
import {FiLogIn} from "react-icons/fi";
import {MdFlightLand, MdFlightTakeoff, MdDateRange, MdLocalAirport} from "react-icons/md"
import { BsPen } from "react-icons/bs";

class Home extends Component {
  
  state = {
    flights: [], showTable: false, polazniAerodrom: "", dolazniAerodrom: "", datum: "", airports: [], messageInfoFlights: ""
}

componentDidMount(){
    axios.get('http://localhost:8080/AirFly/aerodrom/airports')
    .then(res => {
        const airports = res.data;
        this.setState({airports});
    })
}

handleSubmit = event => {
  event.preventDefault();

  axios.post('http://localhost:8080/AirFly/let/getAllFlightsByParams', {polazniAerodrom: this.state.polazniAerodrom, dolazniAerodrom: this.state.dolazniAerodrom, datum: this.state.datum})
  .then(res => {
    console.log(res.data);
    if(res.data.length===0){
      this.setState({messageInfoFlights: "Nema letova."})
    }
    else{
      const flights = res.data;
      this.setState({flights});
    }
  });
  this.setState({messageInfoFlights: ""})
}

showTable = () => {
  return(
    <div>
    {this.state.messageInfoFlights !== "" && <div class="alert alert-info" role="alert" align="center">
                    {this.state.messageInfoFlights} </div>}
    <Table striped bordered hover>
    <thead>
    <tr>
        <th>Datum leta</th>
        <th>Vrsta leta</th>
        <th>Polazni aerodrom</th>
        <th>Dolazni aerodrom</th>
        <th>Avio-prevoznik</th>
    </tr>
    </thead>
    <tbody>
       {this.state.flights.map((data, key) => {
           return(
               <tr key={key}>
                    <td>{data.datum}</td>
                    <td>{data.vrsta}</td>
                    <td>{data.nazivPolaznog}, {data.polazniGrad}</td>
                    <td>{data.nazivDolaznog}, {data.dolazniGrad}</td>
                    <td>{data.kompanija}</td>
               </tr>
           )
       })}
        
  </tbody>
  </Table>
  </div>
  )
}

render(){
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/"><MdLocalAirport/> Air Fly</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
      </Nav>
      <Nav>
        <Nav.Link href="/register">
          <BsPen/> Register
        </Nav.Link>
        <Nav.Link eventKey={2} href="/login">
         Login <FiLogIn/>
        </Nav.Link>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
      <br/>
      <Form onSubmit={this.handleSubmit}>
        <Form.Row style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Form.Group as={Col} controlId="formGridKlasa">
            <Form.Label><MdFlightTakeoff/>  Polazni aerodrom</Form.Label>
            <Form.Control as="select"  onChange={(e) => this.setState({polazniAerodrom: e.target.value.substring(0, e.target.value.indexOf(","))})}>
              <option>Izaberite polazni aerodrom</option>
              {this.state.airports.map(airport => <option>{airport.naziv}, {airport.grad}</option>)}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCena">
            <Form.Label><MdFlightLand/> Dolazni aerodrom</Form.Label>
            <Form.Control as="select" onChange={(e) => this.setState({dolazniAerodrom: e.target.value.substring(0, e.target.value.indexOf(","))})}>
              <option>Izaberite dolazni aerodorm</option>
              {this.state.airports.map(airport => <option>{airport.naziv}, {airport.grad}</option>)}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLet">
            <Form.Label><MdDateRange/> Datum</Form.Label>
            <Form.Control type="date"  value={this.state.datum} onChange={(e) => this.setState({datum: e.target.value})} />
          </Form.Group>
          <Button variant="light" type="submit" onClick={() => this.setState({showTable: true}) }><FaSearch/></Button>
        </Form.Row>
            {this.state.showTable ? this.showTable() : null}
      </Form>  
      
    </div>
  );
}
}

export default Home;
