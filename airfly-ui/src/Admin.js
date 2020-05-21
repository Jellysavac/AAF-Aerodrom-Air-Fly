import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import axios from "axios";
import {Navbar, Nav } from 'react-bootstrap';
import {MdLocalAirport, MdEventSeat} from "react-icons/md"
import {FiLogOut} from "react-icons/fi"
import {RiMoneyEuroCircleLine} from "react-icons/ri"

class Admin extends Component{

    state= {showFormForTicket: false, flights: [],
        klasa: "Ekonomska", cena: null, letId: null}


componentDidMount(){
    axios.get('http://localhost:8080/AirFly/let/getAllFlights')
    .then(res => {
        const flights = res.data;
        this.setState({flights});
    });
    
}

handleChangeFlights = (event) => {
    this.setState({ flights: event.target.value });
};

handleSubmit = event => {
    event.preventDefault();

    axios.post('http://localhost:8080/AirFly/ticket/addTicket', {klasa:this.state.klasa, cena:this.state.cena, idLeta:this.state.letId})
    .then(res => {
        console.log(res.data)
        if(res.status===200){
            alert("Uspešno dodata karta")
        }
        
    })
    .catch(function(error){
        if(error.response.status===400){
            alert("Neuspešno dodavanje karte")
          }
    });
}

showFormForTicket = () => {
    return (
        <div> 
            <Form onSubmit={this.handleSubmit}>

            <Form.Row style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Form.Group as={Col} controlId="formGridKlasa">
            <Form.Label><MdEventSeat /> Klasa</Form.Label>
            <Form.Control as="select" value={this.state.klasa} onChange={(e) => this.setState({klasa: e.target.value})}>
                <option>Ekonomska</option>
                <option>Biznis</option>
            </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCena">
            <Form.Label><RiMoneyEuroCircleLine/> Cena</Form.Label>
            <Form.Control type="number" step="0.1" placeholder="€" value={this.state.cena} onChange={(e) => this.setState({cena: e.target.value})}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLet">
            <Form.Label> <MdLocalAirport/> Let</Form.Label>
            <Form.Control as="select" onChange={(e) => this.setState({letId: e.target.value.substring( 0, e.target.value.indexOf(","))})} >
            <option defalut>Id, polazni aerodrom, dolazni aerodrom, datum, kompanija</option>
    {this.state.flights.map(response => <option>{response.id}, {response.nazivPolaznog}, {response.nazivDolaznog}, {response.datum}, {response.kompanija}</option>)}
                
            </Form.Control>
            </Form.Group>
            </Form.Row>

            <Button variant="secondary" type="submit">Dodaj</Button>
            <Button variant="danger" onClick={() => this.setState({showFormForTicket: false})}>X</Button>
        </Form>
        </div>
        );
}

logout = () =>{
    localStorage.removeItem("tokens")
    localStorage.removeItem("id")
    localStorage.removeItem("name")
}

    render(){
        return(
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/admin"><MdLocalAirport/> Air Fly</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          <Navbar.Brand>Administratorski panel</Navbar.Brand>
          </Nav>
          <Nav>
          <Nav.Link eventKey={2} href="/" onClick={this.logout}>
            Logout <FiLogOut/>
          </Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
            <button type="button" class="btn btn-primary">Dodaj Let</button>
            <Button variant="primary" onClick={() => this.setState({showFormForTicket: true}) }>Dodaj kartu</Button>
            {this.state.showFormForTicket ? this.showFormForTicket() : null}
            </div>
        )
    }
    
}
export default Admin