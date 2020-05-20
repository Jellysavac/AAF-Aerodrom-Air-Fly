import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav } from 'react-bootstrap';
import {FiLogOut} from "react-icons/fi"
import {MdLocalAirport} from "react-icons/md"
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { FaSearch } from "react-icons/fa";
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import StarRatings from 'react-star-ratings'; 
import RatingForm from './RatingForm'

class AvioPrevoznici extends Component{
    constructor(props){
        super(props);
        this.state = {
            companies: [], naziv: "",  aircrafts: [], showCompany: false, prevoznik: {},  comments: [],
            loading: false, companyId: "", rating: 0
        }

        this.addComment = this.addComment.bind(this);
    }

    componentDidMount(){
        
        axios.get('http://localhost:8080/AirFly/company/getAllCompanies')
        .then(companiesResponse => {
            this.setState({companies: companiesResponse.data});
        });
        
    }

   handleSubmit = event =>{
       event.preventDefault();

       Promise.all([
           axios.post('http://localhost:8080/AirFly/company/getCompanyByName', {naziv: this.state.naziv}),
           axios.post('http://localhost:8080/AirFly/numberOfAircraft/getAircraftByCompany', {naziv: this.state.naziv}),
           axios.post('http://localhost:8080/AirFly/comment/getAllComments', {naziv: this.state.naziv})
       ])
       .then(([companyResponse, numOfAircraftResponse, commentResponse]) => {
           console.log(companyResponse.data);
           console.log(numOfAircraftResponse.data);
           this.setState({prevoznik: companyResponse.data, aircrafts: numOfAircraftResponse.data, comments: commentResponse.data});
       });
   }

   addComment(comment) {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments]
    });
  }

   showCompany = () => {
    const {prevoznik} = this.state
    return(
        
        <div>
        <h4 style={{ paddingLeft: 10, paddingRight: 10 }}>{prevoznik.naziv} &nbsp; &nbsp;   <StarRatings name="rating" rating={prevoznik.ocena} starDimension="40px" starRatedColor="gold"/></h4>
        <p style={{ paddingLeft: 10, paddingRight: 10 }}>{prevoznik.opis}</p>
        <p style={{ paddingLeft: 10, paddingRight: 10 }}>{prevoznik.prtljag}</p>
        <h5 style={{ paddingLeft: 10, paddingRight: 10 }}>Flota</h5>
        <ul className="list-group list-group-flush">{this.state.aircrafts.map(aircraft => <li className="list-group-item">{aircraft.tip}  <img src={`data:image/jpeg;base64,${aircraft.slika}`}  /> <br/> Broj aviona: {aircraft.kolicina}</li> )}</ul>
        <div className="row">
          <div className="col-4  pt-3 border-right">
            <h6>Recite nešto o ovoj kompaniji</h6>
            <CommentForm addComment={this.addComment} companyId={this.state.companyId} />
            <h6>Ocenite ovu kompaniju</h6>
            <RatingForm  naziv={this.state.naziv}/>
          </div>
          <div className="col-8  pt-3 bg-white">
          <CommentList
              loading={this.state.loading}
              comments={this.state.comments}
            />
          </div>
        </div>
        </div>
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
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          <Navbar.Brand>Avio prevoznici</Navbar.Brand>
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
        <Form onSubmit={this.handleSubmit}>
               <Form.Row style={{ paddingLeft: 10, paddingRight: 10 }}>
                 <Form.Group as={Col} controlId="formGridCompany">
                 <Form.Label></Form.Label>
                   <Form.Control as="select" onChange={(e) => this.setState({naziv: e.target.value.substring(3), companyId: e.target.value.substring(0,1)})}>
                     <option>Izaberite avio prevoznika</option>
                     {this.state.companies.map(company => <option>{company.id}. {company.naziv}</option>)}
                   </Form.Control>
                 </Form.Group>
                 <Button variant="light" type="submit" onClick={() => this.setState({showCompany: true}) }><FaSearch/></Button>
                   {this.state.showCompany ? this.showCompany() : null}
                </Form.Row>
                
        </Form>
        
       
        </div>
        )
    }
}
export default AvioPrevoznici