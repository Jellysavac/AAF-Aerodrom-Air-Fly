import React, { Component } from "react";

export default class CommentForm extends Component {
  constructor(props) {
    super(props);   
    this.state = {
      loading: false,
      error: "",

      comment: {
        idKorisnika: localStorage.getItem("id"),
        tekst: "",
        idKompanije: props.companyId
      }
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };

  onSubmit(e) {

    e.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "Polje sa komentarom je obavezno." });
      return;
    }

    this.setState({ error: "", loading: true });

    let { comment } = this.state;
    fetch("http://localhost:8080/AirFly/comment/addComment", {
      method: "post",
      body: JSON.stringify(comment),
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
    }
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ loading: false, error: res.error });
        } else {
          this.props.addComment(comment);
          this.setState({
            loading: false,
            comment: { ...comment, tekst: "" }
          });
        }
      })
      .catch(err => {
        this.setState({
          error: "Nešto nije u redu. Komentar nije postavljen.",
          loading: false
        });
      });
  }

  isFormValid() {
    return this.state.comment.tekst !== "";
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        <form method="post" onSubmit={this.onSubmit}>

          <div className="form-group">
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.tekst}
              className="form-control"
              placeholder="Unesite komentar"
              name="tekst"
              rows="5"
            />
          </div>

          {this.renderError()}

          <div className="form-group">
            <button disabled={this.state.loading} className="btn btn-primary">
              Postavi komentar &#10148;
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}