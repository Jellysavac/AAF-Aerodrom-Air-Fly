import React, { Component } from "react";
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {MdEmail, MdLock, MdLocalAirport} from "react-icons/md"

class Login extends Component {
    state = {
        email: '',
        lozinka: ''
    }

    handleChange = event => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.post('http://localhost:8080/AirFly/user/signin', {email: this.state.email, lozinka: this.state.lozinka})
        .then(response => {
          console.log(response);
          console.log(response.data);
          if(response.data.uloga==="ROLE_USER"){
            this.props.history.push('/user');
          }
          else{
            this.props.history.push('/admin');
          }
        })
        .catch(function(error){
          if(error.response.status===401){
            alert("Pogrešno unet email i/ili lozinka!")
          }
          
        });
      }


    render() {       
        return (
            <div
            style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="18">
                    <form onSubmit={this.handleSubmit}>
                      <h1><MdLocalAirport/> AIR FLY</h1>
                      <br/><br/>
                      <p className="h4 text-center mb-4">Prijavljivanje</p>
                      <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                        <MdEmail/> Email
                      </label>
                      <input type="email" id="defaultFormLoginEmailEx" className="form-control" name="email" onChange={this.handleChange} />
                      <br />
                      <label htmlFor="defaultFormLoginPasswordEx" className="grey-text" >
                        <MdLock/> Lozinka
                      </label>
                      <input type="password" id="defaultFormLoginPasswordEx" className="form-control" name="lozinka" onChange={this.handleChange} />
                      <div className="text-center mt-4">
                        <MDBBtn color="indigo" type="submit">Prijavi se</MDBBtn>
                      </div>
                    </form>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
        );
    }
}
export default Login