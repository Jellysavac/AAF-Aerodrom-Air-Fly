import React, { useState } from "react";
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import {MdEmail, MdLock, MdLocalAirport} from "react-icons/md"
import { useAuth } from "./context/auth";
import { Redirect } from "react-router-dom";
import { Error } from "./components/AuthForms";

function Login(props) {

  const { setAuthTokens } = useAuth();  
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoggedInUser, setLoggedInUser] = useState(false);
  const [isLoggedInAdmin, setLoggedInAdmin] = useState(false);
  //const referer = props.location.state.referer || '/user';
  
 

   function handleSubmit (event){
        event.preventDefault();

        axios.post('http://localhost:8080/AirFly/user/signin', {email, lozinka})
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.status === 200){
              setAuthTokens(res.data);
              
              if(res.data.uloga === "ROLE_USER"){
                setLoggedInUser(true);
              }
              else{
                setLoggedInAdmin(true);
              }
            }
            else{
              setIsError(true);
            }
            
        })
        .catch(e => {
          setIsError(true);
        });
    }

    if (isLoggedInUser) {
      return <Redirect to="/user" />;
    }
    
    if(isLoggedInAdmin){
      return <Redirect to="/admin" />;
    }

    
        return (
            <div
    style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
            <MDBContainer>
           
            <MDBRow>
              <MDBCol md="18">
                <form onSubmit={handleSubmit}>
                
                  <h1 align="center"><MdLocalAirport />AIR FLY</h1>
                  <br/>
                  <p className="h4 text-center mb-4">Prijavljivanje</p>
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                   <MdEmail/> Email
                  </label>
                  <input type="email" id="defaultFormLoginEmailEx" className="form-control" name="email" onChange={e => {setEmail(e.target.value)}} />
                  <br />
                  <label htmlFor="defaultFormLoginPasswordEx" className="grey-text" >
                    <MdLock/> Lozinka
                  </label>
                  <input type="password" id="defaultFormLoginPasswordEx" className="form-control" name="lozinka" onChange={e=>{setLozinka(e.target.value)}} />
                  <br/>
                  <div style={{width: '78vh'}}>
                  { isError &&<div className="alert alert-danger" align="center">Pogrešno unet email i/ili lozinka!</div> }
                  </div>
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
export default Login
