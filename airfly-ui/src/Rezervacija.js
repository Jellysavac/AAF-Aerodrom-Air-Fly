import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav } from 'react-bootstrap';
import {FiLogOut} from "react-icons/fi"
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { FaSearch } from "react-icons/fa";
import {IoIosPerson} from 'react-icons/io'
import {MdFlightLand, MdFlightTakeoff, MdDateRange, MdLocalAirport, MdEventSeat} from "react-icons/md"
import Modal from 'react-bootstrap/Modal'

class Rezervacija extends Component{

    state = {
        flights: [], showTable: false, polazniAerodrom: "", dolazniAerodrom: "", datum: "", airports: []
    }

    componentDidMount(){
        axios.get('http://localhost:8080/AirFly/aerodrom/airports')
        .then(res => {
            this.setState({airports:res.data})
        })
    }

    handleSubmit = event => {
        event.preventDefault();
      
        axios.post('http://localhost:8080/AirFly/let/getAllFlightsByParams', {polazniAerodrom: this.state.polazniAerodrom, dolazniAerodrom: this.state.dolazniAerodrom, datum: this.state.datum})
        .then(res => {
          console.log(res.data);
          if(res.data.length===0){
            alert("Nema letova")
          }
          else{
            const flights = res.data;
            this.setState({flights});
          }
        });
      
      }

      showTicket = (e) => {
        const data = JSON.parse(e.currentTarget.getAttribute("data-item"));
        const user = localStorage.getItem("tokens")
        console.log(data)
        console.log(user)

        return(
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Vaša karta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {data.id}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">Poništi</Button>
                    <Button variant="primary">Rezerviši</Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
      }
      
      showTable = () => {
        return(
          <Table striped bordered hover>
          <thead>
          <tr>
              <th>Datum leta</th>
              <th>Vrsta leta</th>
              <th>Polazni aerodrom</th>
              <th>Dolazni aerodrom</th>
              <th>Kompanija</th>
          </tr>
          </thead>
          <tbody>
             {this.state.flights.map((data, key) => {
                 return(
                     <tr key={key} data-item={JSON.stringify(data)} onClick={this.showTicket}>
                          <td>{data.datum}</td>
                          <td>{data.vrsta}</td>
                          <td>{data.nazivPolaznog}</td>
                          <td>{data.nazivDolaznog}</td>
                          <td>{data.kompanija}</td>  
                     </tr>
                 )
             })}
              
        </tbody>
        </Table>
        )
      }

    logout = () => {
        localStorage.removeItem("tokens");
    }

    render(){
        return(
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/user"><MdLocalAirport/> Air Fly</Navbar.Brand>
                    <Navbar.Brand>Rezervacija karata</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/avioprevoznici">Avio prevoznici</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link eventKey={2} href="/" onClick={this.logout}>
                                Logout <FiLogOut/>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <br/>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Form.Group as={Col} controlId="formGridKlasa">
                            <Form.Label><MdFlightTakeoff/>  Polazni aerodrom</Form.Label>
                            <Form.Control as="select" value={this.state.polazniAerodrom} onChange={(e) => this.setState({polazniAerodrom: e.target.value})}>
                                <option>Izaberite polazni aerodrom</option>
                                {this.state.airports.map(airport => <option>{airport.naziv}</option>)}
                            </Form.Control>
                        </Form.Group>  
                        <Form.Group as={Col} controlId="formGridCena">
                            <Form.Label><MdFlightLand/> Dolazni aerodrom</Form.Label>
                            <Form.Control as="select" value={this.state.dolazniAerodrom} onChange={(e) => this.setState({dolazniAerodrom: e.target.value})}>
                                <option>Izaberite dolazni aerodorm</option>
                                {this.state.airports.map(airport => <option>{airport.naziv}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridLet">
                            <Form.Label><MdDateRange/> Datum</Form.Label>
                            <Form.Control type="date"  value={this.state.datum} onChange={(e) => this.setState({datum: e.target.value})} />
                        </Form.Group>
                        </Form.Row>
                        <Form.Row style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Form.Group as={Col} controlId="formGridBrojPutnika">
                            <Form.Label><IoIosPerson/> Putnici</Form.Label>
                            <Form.Control type="number" min="1" value={this.state.putnici} onChange={(e) => this.setState({putnici: e.target.value})} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridKlasa">
                            <Form.Label><MdEventSeat /> Klasa</Form.Label>
                            <Form.Control as="select" value={this.state.klasa} onChange={(e) => this.setState({klasa: e.target.value})}>
                                <option>Ekonomska</option>
                                <option>Biznis</option>
                            </Form.Control>
                        </Form.Group>
                        </Form.Row>
                        <Button variant="light" type="submit" onClick={() => this.setState({showTable: true}) }>Pretraži letove</Button>
                            {this.state.showTable ? this.showTable() : null}
                    
                </Form> 
            </div>
        )
    }
}
export default Rezervacija