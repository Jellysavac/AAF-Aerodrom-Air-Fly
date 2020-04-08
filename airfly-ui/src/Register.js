import React, {Component} from 'react';
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { register } from './serviceWorker';

class Register extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: "",
            surname: "",
            email: "",
            password: "",
            password_confirm: "",
            error: ""
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        axios
            .post('http://localhost:8080/AirFly/auth/register',
                {name: this.state.name, surname: this.state.surname, email: this.state.email, password: this.state.password, password_confirm: this.state.password_confirm})
            .then(response => {
                console.log("registration response", response);
            })
            .catch(error => {
                console.log("registration error", error);
            });
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() { 
        return (
            <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="18">
                            <form onSubmit={this.handleSubmit}>
                                <input type="name" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required />
                                <input type="surname" name="surname" placeholder="Surname" value={this.state.surname} onChange={this.handleChange} required />
                                <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                                <input type="password_confirm" name="password_confirm" placeholder="Password confirmation" value={this.state.password_confirm} onChange={this.handleChange} required />
                                <div className="text-center mt-4">
                                    <MDBBtn color="indigo" type="submit">Register</MDBBtn>                  
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}
export default Register