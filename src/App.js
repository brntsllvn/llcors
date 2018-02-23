import React, { Component } from 'react';
import './App.css';

function TaxItem(props) {
  return (
    <div>
      {props.label} {props.value}
    </div>
  )
}


class TaxForm extends Component {
  state = {
    income: 0, 
    incomeTax: 0, 
    socialSecurityTax: 0, 
    medicareTax: 0, 
    totalTax: 0
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  calculateTax(income, taxRate) {
    if (!income) {
      return 0;
    } else {
      return income * taxRate;
    }
  }

  updateTax = event => {
    console.log(event.target.value)
    this.setState({
      income: event.target.value
    })
      // incomeTax: this.calculateTax(this.state.income, 0.2),
      // socialSecurityTax: Math.round(this.state.income * 0.124 * 100) / 10,
      // medicareTax: Math.round(this.state.income * 0.029 * 100) / 10,
      // totalTax: Math.round(this.state.incomeTax + this.state.socialSecurityTax + this.state.medicareTax)
  }

  renderTaxItem(label, value) {
    return (
      <TaxItem 
        label={label}
        value={value}
      />
    )
  }

  render() {
    // const {incomeTax, socialSecurityTax, medicareTax, totalTax} = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          Salary:
          <input 
            onChange={this.updateTax}
            type="number" 
          />
        </div>

        <div>
          {this.renderTaxItem('Income Tax', this.calculateTax(this.state.income, 0.2))}

        </div>
{/*
        <div>
          Social Security Tax: {socialSecurityTax}
        </div>

        <div>
          Medicare Tax: {medicareTax}
        </div>

        <div>
          Total Tax: {totalTax}
        </div>

        <div>
          Total Tax: {totalTax}
        </div>*/}
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
