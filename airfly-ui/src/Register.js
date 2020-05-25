import React, {Component} from 'react';
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol, MDBBtn} from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import {MdEmail, MdLock, MdLocalAirport, MdAccountCircle} from "react-icons/md";
import { useAuth } from "./context/auth";
import { Redirect } from "react-router-dom";
import { Error } from "./components/AuthForms";

class Register extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            name: "",
            surname: "",
            email: "",
            adress: "",
            password: "",
            password_confirm: "",
            response: ""
        }

        this.status = {
            succsess: "",
            failed: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .post('http://localhost:8080/AirFly/user/register',
                {name: this.state.name, surname: this.state.surname, email: this.state.email, adress: this.state.adress, password: this.state.password})
            .then(response => {
                console.log("SUCCSESS: ", response);
                alert("Registracija uspešna.");
                this.status.succsess = response.state;
                this.props.history.push("/login");
            })
            .catch(error => {
                console.log("FAILED: ", error);
                this.status.failed = error.state;
            });
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
                                    <center><h1 ><MdLocalAirport />AIR FLY</h1></center>
                                    <br/>
                                    <p className="h4 text-center mb-4">Registracija</p>
                                    <span style = {{display:'inline'}}>
                                        <label htmlFor="name" className="grey-text">
                                        <MdAccountCircle/> Ime:
                                        </label>
                                        <input id="name" type="name" name="name" className="form-control" value={this.state.name} onChange={this.handleChange} required />
                                        <label htmlFor="surname" className="grey-text">
                                        <MdAccountCircle/> Prezime:
                                        </label>
                                        <input id="surname" type="surname" name="surname" className="form-control" value={this.state.surname} onChange={this.handleChange} required />
                                    </span>
                                    <br/>
                                    <span style = {{display:'inline'}}>
                                    <label htmlFor="email" className="grey-text">
                                        <MdEmail/> Email:
                                        </label>
                                        <input id="email" type="email" name="email" className="form-control" value={this.state.email} onChange={this.handleChange} required />
                                        <label htmlFor="adress" className="grey-text">
                                        <MdEmail/> Adresa:
                                        </label>
                                        <input id="adress" type="adress" name="adress" className="form-control" value={this.state.adress} onChange={this.handleChange} required />
                                    </span>
                                    <br/>
                                    <span style = {{display:'inline'}}>
                                        <label htmlFor="password" className="grey-text">
                                        <MdLock/> Lozinka:
                                        </label>
                                        <input id="password" type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleChange} required />
                                        <label htmlFor="passo" className="grey-text">
                                        <MdLock/> Potvrdite lozinku:
                                        </label>
                                        <input id="password_confirm" type="password" name="password_confirm" className="form-control" value={this.state.password_confirm} onChange={this.handleChange} required />
                                    </span>
                                    <br/>
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