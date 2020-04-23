import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav } from 'react-bootstrap';
import {FiLogOut} from "react-icons/fi"
import {MdLocalAirport} from "react-icons/md"
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { FaSearch } from "react-icons/fa";

class AvioPrevoznici extends Component{

    state = {
        companies: [], naziv: "",  aircrafts: [], showCompany: false, prevoznik: {}
    }

    componentDidMount(){
        
        axios.get('http://localhost:8080/AirFly/company/getAllCompanies')
        .then(companiesResponse => {
            this.setState({companies: companiesResponse.data});
        });
        
    }

   handleSubmit = event =>{
       event.preventDefault();

       Promise.all([
           axios.post('http://localhost:8080/AirFly/company/getCompanyByName', {naziv: this.state.naziv}),
           axios.post('http://localhost:8080/AirFly/numberOfAircraft/getAircraftByCompany', {naziv: this.state.naziv})
       ])
       .then(([companyResponse, numOfAircraftResponse]) => {
           console.log(companyResponse.data);
           console.log(numOfAircraftResponse.data);
           this.setState({prevoznik: companyResponse.data, aircrafts: numOfAircraftResponse.data});
       });
   }

   showCompany = () => {
    const {prevoznik} = this.state
    return(
        
        <div>
        <h4 style={{ paddingLeft: 10, paddingRight: 10 }}>{prevoznik.naziv}</h4>
        <p style={{ paddingLeft: 10, paddingRight: 10 }}>{prevoznik.opis}</p>
        <p style={{ paddingLeft: 10, paddingRight: 10 }}>{prevoznik.prtljag}</p>
        <h5 style={{ paddingLeft: 10, paddingRight: 10 }}>Flota</h5>
        <ul class="list-group list-group-flush">{this.state.aircrafts.map(aircraft => <li class="list-group-item">{aircraft.tip}  <img src={`data:image/jpeg;base64,${aircraft.slika}`}  /> <br/> Broj aviona: {aircraft.kolicina}</li> )}</ul>
        
        </div>
    )
    }
    

    render(){
        return(
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/user"><MdLocalAirport/> Air Fly</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          <Navbar.Brand>Avio prevoznici</Navbar.Brand>
          <Nav.Link href="/rezervacija">Rezervacije</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link eventKey={2} href="/">
            Logout <FiLogOut/>
          </Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br/>
        <Form onSubmit={this.handleSubmit}>
               <Form.Row style={{ paddingLeft: 10, paddingRight: 10 }}>
                 <Form.Group as={Col} controlId="formGridCompany">
                 <Form.Label></Form.Label>
                   <Form.Control as="select" value={this.state.naziv} onChange={(e) => this.setState({naziv: e.target.value})}>
                     <option>Izaberite avio prevoznika</option>
                     {this.state.companies.map(company => <option>{company.naziv}</option>)}
                   </Form.Control>
                 </Form.Group>
                 <Button variant="light" type="submit" onClick={() => this.setState({showCompany: true}) }><FaSearch/></Button>
                   {this.state.showCompany ? this.showCompany() : null}
                </Form.Row>
                
        </Form>
        
       
        </div>
        )
    }
}
export default AvioPrevoznici