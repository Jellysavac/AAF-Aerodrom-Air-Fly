import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import FormGroup from 'react-bootstrap/FormGroup'
import axios from "axios";
import {Navbar, Nav } from 'react-bootstrap';
import {MdLocalAirport, MdEventSeat} from "react-icons/md"
import {FiLogOut} from "react-icons/fi"
import {RiMoneyEuroCircleLine} from "react-icons/ri"

class Admin extends Component{

    state= {showFormForTicket: false, flights: [],
        klasa: "Ekonomska", cena: null, letId: null, 
        showFormForFlight: false, airports: [], companies: [],
        type: "Jednokratni", date: null, seats: null, departureId: null, arrivalId: null, companyId: null}


componentDidMount(){

    axios.get('http://localhost:8080/AirFly/let/getAllFlights')
    .then(res => {
        const flights = res.data;
        this.setState({flights});
    })
    
    axios.get('http://localhost:8080/AirFly/aerodrom/airports')
    .then(res => {
        const airports = res.data;
        this.setState({airports});
    })
    
    axios.get('http://localhost:8080/AirFly/company/getAllCompanies')
    .then(res => {
        const companies = res.data;
        this.setState({companies});
    })

    ;
}

handleChangeFlights = (event) => {
    this.setState({ flights: event.target.value });
};
handleChangeAirports = (event) => {
    this.setState({ airports: event.target.value });
};
handleChangeCompanies= (event) => {
    this.setState({ companies: event.target.value });
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

handleFlightSubmit = event => {
    event.preventDefault();

    axios.post('http://localhost:8080/AirFly/let/addFlight', {type:this.state.type, seats:this.state.seats, date:this.state.date, 
                                                                departureId:this.state.departureId, arrivalId:this.state.arrivalId,companyId:this.state.companyId})
    .then(res => {
        console.log(res.data)
        if(res.status===200){
            alert("Uspešno dodat let!")
        }
        
    })
    .catch(function(error){
        if(error.response.status===400){
            alert("Neuspešno dodavanje leta!")
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

showFormForFlight = () => {
    return (
        <div> 
            <Form onSubmit={this.handleFlightSubmit}>

            <Form.Row style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Form.Group as={Col} controlId="formGridTip">
            <Form.Label>Tip</Form.Label>
            <Form.Control as="select" value={this.state.type} onChange={(e) => this.setState({type: e.target.value})}>
                <option>Jednokratni</option>
                <option>Svakodnevni</option>
                <option>Radni dani</option>
            </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridSedista">
            <Form.Label>Broj Sedišta</Form.Label>
            <Form.Control type="number" value={this.state.seats} onChange={(e) => this.setState({seats: e.target.value})}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAerodrom">

            <Form.Label>Polazni Aerodrom</Form.Label>
            <Form.Control as="select"  value={this.state.departureId} onChange={(e) => this.setState({departureId: e.target.value.substring( 0, e.target.value.indexOf(","))})} >
            <option defalut>Ime i Grad</option>
            {this.state.airports.map(response => <option>{response.id}, {response.naziv},{response.grad}</option>)}
            </Form.Control>

            <Form.Label>Dolazni Aerodrom</Form.Label>
            <Form.Control as="select"  value={this.state.arrivalId} onChange={(e) => this.setState({arrivalId: e.target.value.substring( 0, e.target.value.indexOf(","))})} >
            <option defalut>Ime i Grad</option>
            {this.state.airports.map(response => <option>{response.id}, {response.naziv},{response.grad}</option>)}
            </Form.Control>

            </Form.Group>

            <FormGroup as={Col} controlId="formGridKompanija">

            <Form.Label>Kompanija</Form.Label>
            <Form.Control as="select"  value={this.state.companyId} onChange={(e) => this.setState({companyId: e.target.value.substring( 0, e.target.value.indexOf(","))})} >
            <option defalut>Naziv</option>
            {this.state.companies.map(response => <option>{response.id}, {response.naziv}</option>)}
            </Form.Control>

            </FormGroup>
            </Form.Row>

            <Button variant="secondary" type="submit">Dodaj</Button>
            <Button variant="danger" onClick={() => this.setState({showFormForFlight: false})}>X</Button>
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
            <Button variant="primary" onClick={() => this.setState({showFormForFlight: true}) }>Dodaj let</Button>
            {this.state.showFormForFlight ? this.showFormForFlight() : null}
            <Button variant="primary" onClick={() => this.setState({showFormForTicket: true}) }>Dodaj kartu</Button>
            {this.state.showFormForTicket ? this.showFormForTicket() : null}
            </div>
        )
    }
    
}
export default Admin