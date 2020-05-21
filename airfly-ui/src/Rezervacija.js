import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav } from 'react-bootstrap';
import {FiLogOut, FiCheckCircle} from "react-icons/fi"
import {FaTicketAlt } from 'react-icons/fa'
import {RiMoneyEuroCircleLine} from "react-icons/ri"
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import {IoIosPerson} from 'react-icons/io'
import {MdFlightLand, MdFlightTakeoff, MdDateRange, MdLocalAirport, MdEventSeat} from "react-icons/md"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import './App.css';


class Rezervacija extends Component{

    state = {
        flights: [], showTable: false, polazniAerodrom: "", dolazniAerodrom: "", datum: "", airports: [], putnici: null, klasa: "Ekonomska",
        selectedRow:{}, showTicket:false, cena:{}, checked: -1, messageSuccess: "", messageError: "", messageInfoFlights: ""
    }

    componentDidMount(){
        axios.get('http://localhost:8080/AirFly/aerodrom/airports')
        .then(res => {
            this.setState({airports: res.data});
        })
    }

    handleSubmit = event => {
        event.preventDefault();
      
        axios.post('http://localhost:8080/AirFly/let/getAllFlightsForReservation', {polazniAerodrom: this.state.polazniAerodrom, dolazniAerodrom: this.state.dolazniAerodrom, datum: this.state.datum, brojPutnika: this.state.putnici})
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

      changeColor = checked => e => {
        if (checked !== undefined) {
          this.setState({ checked  });
        }
      };
      
      showTable = () => {
        return(
            <div>
                {this.state.messageInfoFlights !== "" && <div class="alert alert-info" role="alert" align="center">
                    {this.state.messageInfoFlights} </div>}
          <Table >
          <thead>
          <tr>
              <th>#</th>
              <th>Datum leta</th>
              <th>Vrsta leta</th>
              <th>Polazni aerodrom</th>
              <th>Dolazni aerodrom</th>
              <th>Avio-prevoznik</th>
              <th></th>
          </tr>
          </thead>
          <tbody>
             {this.state.flights.map((data, key) => {
                 return(
                     <tr key={key} data-item={JSON.stringify(data)} className={this.state.checked === key ? "tableSelected" : "" } onClick={()=>{this.setState({selectedRow: data, checked: key}); this.changeColor(key)}} >
                         <td>{data.id}</td>
                          <td>{data.datum}</td>
                          <td>{data.vrsta}</td>
                          <td>{data.polazni}, {data.gradPolazni}</td>
                          <td>{data.dolazni}, {data.gradDolazni}</td>
                          <td>{data.kompanija}</td> 
                          <td><Tooltip title="Selektujte let da bi ste rezervisali"><span><Button variant="info" disabled={this.state.checked !== key} onClick={()=> {this.setState({showTicket:true}); this.getTicket()}}>Rezerviši</Button></span></Tooltip></td>    
                     </tr>
                     
                 )
             })}
              
        </tbody>
        </Table>
        {this.state.showTicket ? this.showTicket() : null}
        </div>
        )  
      }


    getTicket = () => {
        axios.post('http://localhost:8080/AirFly/ticket/getTicketPrice', {idLeta: this.state.selectedRow.id, klasa: this.state.klasa})
        .then(res => {
            console.log(res.data)
            this.setState({cena: res.data})
        })
    }

    handleSubmitReservation = event =>{
        event.preventDefault();

        axios.post('http://localhost:8080/AirFly/reservation/addReservation', {brojKarata: this.state.putnici, idKarte: this.state.cena.id, idKorisnika: localStorage.getItem("id")})
        .then(res =>{
            console.log(res.data)
            this.setState({messageSuccess: "Uspešno ste kreirali rezervaciju."})
        }).catch(error=>{
            
             this.setState({messageError: "Neuspešna rezervacija."})   
           
        })
        this.setState({messageError: ""})
    }

      showTicket = () => {
        return(
            <Dialog open={this.state.showTicket} onClose={()=>{this.setState({showTicket:false})}}>
                {this.state.messageSuccess !== "" && <div class="alert alert-success" role="alert" align="center">
                    {this.state.messageSuccess}
                </div>}
                {this.state.messageError !== "" && <div class="alert alert-danger" role="alert" align="center">
                    {this.state.messageError}
                </div>}

                <DialogTitle><FiCheckCircle className="position-right"/> Vaša rezervacija </DialogTitle>
                
                <DialogContent>
                   <p><MdFlightTakeoff/> Polazni aerodrom: {this.state.selectedRow.polazni}, {this.state.selectedRow.gradPolazni}</p>
                   <p><MdFlightLand/> Dolazni aerodrom: {this.state.selectedRow.dolazni}, {this.state.selectedRow.gradDolazni}</p>
                   <p><MdDateRange/> Datum: {this.state.selectedRow.datum}</p>
                   <p><MdLocalAirport/> Avio-prevoznik: {this.state.selectedRow.kompanija}</p>
                   <p><FaTicketAlt/> Broj karata: {this.state.putnici}</p>
                   <p><MdEventSeat /> Klasa: {this.state.klasa}</p>
                   <p><RiMoneyEuroCircleLine/> Cena: {this.state.cena.cena*this.state.putnici} eura</p>
                </DialogContent>
                <DialogActions>
                    <Button variant="secondary" onClick={()=>{this.setState({showTicket:false})}}>Odustani</Button>
                    <Button variant="primary" onClick={this.handleSubmitReservation}>Potvrdi</Button>
                </DialogActions>
            </Dialog>
        )
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
                        <Form.Group as={Col} controlId="formGridPolazni">
                            <Form.Label><MdFlightTakeoff/>  Polazni aerodrom</Form.Label>
                            <Form.Control as="select" onChange={(e) => this.setState({polazniAerodrom: e.target.value.substring(0, e.target.value.indexOf(","))})}>
                                <option>Izaberite polazni aerodrom</option>
                                {this.state.airports.map(airport => <option>{airport.naziv}, {airport.grad}</option>)}
                            </Form.Control>
                        </Form.Group>  
                        <Form.Group as={Col} controlId="formGridDolazni">
                            <Form.Label><MdFlightLand/> Dolazni aerodrom</Form.Label>
                            <Form.Control as="select" onChange={(e) => this.setState({dolazniAerodrom: e.target.value.substring(0, e.target.value.indexOf(","))})}>
                                <option>Izaberite dolazni aerodorm</option>
                                {this.state.airports.map(airport => <option>{airport.naziv}, {airport.grad}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridDatum">
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