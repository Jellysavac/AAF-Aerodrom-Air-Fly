import React, { Component } from "react";
import axios from "axios";
import 'mdbreact/dist/css/mdb.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class LetComponent extends React.Component {
  state = {
    flights: []
}

componentDidMount(){
    axios.get('http://localhost:8080/AirFly/let/getAllFlights')
    .then(res => {
        const flights = res.data;
        this.setState({flights});
    })
}

render() {
    return(
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Datum leta</th>
                <th>Broj mesta</th>
                <th>Vrsta leta</th>
                <th>Polazni Aerodrom</th>
                <th>Dolazni aerodrom</th>
                <th>Kompanija</th>
            </tr>
            </thead>
            <tbody>
               {this.state.flights.map((data, key) => {
                   return(
                       <tr key={key}>
                            <td>{data.datum}</td>
                            <td>{data.broj_mesta}</td>
                            <td>{data.vrsta}</td>
                            <td>{data.nazivPolaznog}</td>
                            <td>{data.nazivDolaznog}</td>
                            <td>{data.kompanija}</td>
                       </tr>
                   )
               })}
                
        </tbody>
        </Table>
    )
}
}
