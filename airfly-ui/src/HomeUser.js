import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav } from 'react-bootstrap';
import {MdLocalAirport} from "react-icons/md"
import {FiLogOut} from "react-icons/fi"

class HomeUser extends Component{

    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/user"><MdLocalAirport/> Air Fly</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#features">Avio prevoznici</Nav.Link>
                <Nav.Link href="#pricing">Rezervacija karata</Nav.Link>
            </Nav>
            
            <Nav>
              <Nav.Link eventKey={2} href="/">
               Logout <FiLogOut/>
              </Nav.Link>
            </Nav>
            </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default HomeUser