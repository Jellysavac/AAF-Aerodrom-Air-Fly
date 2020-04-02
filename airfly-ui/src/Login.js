import React, { Component } from "react";
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import { Redirect  } from 'react-router-dom';

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

        const user = {
            email: this.state.email,
            lozinka: this.state.lozinka
        };

        axios.post('http://localhost:8080/AirFly/user/signin', {email: this.state.email, lozinka: this.state.lozinka})
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    onSubmit = () => {
        this.props.history.push('/');
        
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
                  <p className="h4 text-center mb-4">Sign in</p>
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Your email
                  </label>
                  <input type="email" id="defaultFormLoginEmailEx" className="form-control" name="email" onChange={this.handleChange} />
                  <br />
                  <label htmlFor="defaultFormLoginPasswordEx" className="grey-text" >
                    Your password
                  </label>
                  <input type="password" id="defaultFormLoginPasswordEx" className="form-control" name="lozinka" onChange={this.handleChange} />
                  <div className="text-center mt-4">
                    <MDBBtn color="indigo" type="submit" onClick={this.onSubmit}>Login</MDBBtn>                  
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