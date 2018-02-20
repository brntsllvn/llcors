import React, { Component } from 'react';
import './App.css';

class TaxForm extends Component {
  state = {income: 0, incomeTax: 0, socialSecurityTax: 0, medicareTax: 0, totalTax: 0}

  handleSubmit = event => {
    event.preventDefault()
  }

  updateTax = event => {
    this.setState({
      income: event.target.value,
      incomeTax: Math.round(this.state.income * 0.20 * 100) / 10,
      socialSecurityTax: Math.round(this.state.income * 0.124 * 100) / 10,
      medicareTax: Math.round(this.state.income * 0.029 * 100) / 10,
      totalTax: Math.round(this.state.incomeTax + this.state.socialSecurityTax + this.state.medicareTax)
    })
  }

  render() {
    const {incomeTax, socialSecurityTax, medicareTax, totalTax} = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Salary:
          <input 
            onChange={this.updateTax}
            type="number" 
          />
        </label>

        <br></br>
        <label>
          Income Tax: {incomeTax}
        </label>

        <br></br>
        <label>
          Social Security Tax: {socialSecurityTax}
        </label>

        <br></br>
        <label>
          Medicare Tax: {medicareTax}
        </label>

        <br></br>
        <label>
          Total Tax: {totalTax}
        </label>
      </form>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <TaxForm />
      </div>
    );
  }
}

export default App;
