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
import {MdFlightLand, MdFlightTakeoff, MdDateRange, MdLocalAirport} from "react-icons/md"
import BestCompany from './BestCompany'

class HomeUser extends Component{

    state = {
        tickets:[]
    }
    
    componentDidMount(){
     
        axios.get('http://localhost:8080/AirFly/ticket/getCheapestTicket')
        .then(resTicket => {
          console.log(resTicket.data)
          this.setState({tickets:resTicket.data});
        })
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
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/avioprevoznici">Avio prevoznici</Nav.Link>
                <Nav.Link href="/rezervacija">Rezervacija karata</Nav.Link>
              </Nav>  
              <Nav>
                <Nav.Link eventKey={2} href="/" onClick={this.logout}>
                  Logout <FiLogOut/>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <br/>
          <div className="row">
          <div className="col-8  pt-3 border-right">
          <h4 style={{ paddingLeft: 10, paddingRight: 10 }}>Najpovoljnije karte</h4> 
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Klasa</th>
                <th>Cena (€)</th>
                <th>Polazni aerodrom</th>
                <th>Dolazni aerodrom</th>
                <th>Datum leta</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tickets.map((dataT, keyT) => {
              return(
                <tr key={keyT}>
                  <td>{dataT.klasa}</td>
                  <td>{dataT.cena}</td>
                  <td>{dataT.polazniAerodrom}, {dataT.gradPolazni}</td>
                  <td>{dataT.dolazniAerodrom}, {dataT.gradDolazni}</td>
                  <td>{dataT.datum}</td>  
                </tr>
              )
              })}
            </tbody>
          </Table>  
          </div> 
          <div className="col-4  pt-3 bg-white">
            <BestCompany/>
          </div>
          </div>   
        </div>
      )
  }             
}
export default HomeUser