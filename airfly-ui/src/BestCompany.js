import React, {Component} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import StarRatings from 'react-star-ratings'; 

class BestCompany extends Component {

    constructor(props){
        super(props)
        this.state={bestCompanies: []}
    }

    componentDidMount(){
        axios.get('http://localhost:8080/AirFly/company/bestCompanies')
        .then(res => {
            this.setState({bestCompanies: res.data})
        })
    }

    render(){
        return(
            <div>
            <h4>Najbolje ocenjeni avio-prevoznici</h4>
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>Avio-prevoznik</th>
                <th>Ocena</th>
              </tr>
            </thead>
            <tbody>
              {this.state.bestCompanies.map((data, key) => {
              return(
                <tr key={key}>
                  <td>{data.naziv}</td>
                  <td><StarRatings name="rating" rating={data.ocena} starDimension="20px" starRatedColor="gold"/></td> 
                </tr>
              )
              })}
            </tbody>
          </Table>  
          </div>
        )
    }
}
export default BestCompany