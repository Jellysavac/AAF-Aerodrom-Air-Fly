import React, {Component} from 'react'
import StarRatings from 'react-star-ratings';
import axios from 'axios';

class RatingForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            rating: 0, messageSuccess:"", messageError:""
        }
        this.onStarClick = this.onStarClick.bind(this)
    }
    
    onStarClick(nextValue) {
        this.setState({rating: nextValue});
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.post('http://localhost:8080/AirFly/company/ratingCompany', {naziv: this.props.naziv , ocena: this.state.rating})
        .then(res => {
            console.log(res.data)
            this.setState({messageSuccess: "Uspešno ste poslali ocenu."})
        }).catch(err => {
            this.setState({messageError: "Vaša ocena nije poslata. Pokušajte ponovo."})
        })
        this.setState({messageError: ""})
        
    }
    
    render(){
        const {rating} = this.state
        return(
            <form onSubmit={this.handleSubmit}>
            <h3 style={{ paddingLeft: 10, paddingRight: 10 }}>
                <StarRatings name="rate1" starCount={5} rating={rating} changeRating={this.onStarClick} starDimension="30px" starRatedColor="gold"/>
            </h3>
            {this.state.messageError !== "" && <div class="alert alert-danger" role="alert" align="center">
                    {this.state.messageError}
                </div>}
            {this.state.messageSuccess !== "" && <div class="alert alert-success" role="alert" align="center">
                {this.state.messageSuccess}
            </div>}
            <div className="position">
            <button className="btn btn-primary" >Oceni</button>
            </div>
        </form>

        )
    }
}
export default RatingForm