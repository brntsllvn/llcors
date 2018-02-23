import React, { Component } from 'react';
import './App.css';

function TaxItem(props) {
  return (
    <div>
      {props.label}: ${props.value}
    </div>
  )
}


function calculateTax(income, taxRate) {
  if (!income) {
    return 0;
  } else {
    return income * taxRate;
  }
}

function getTaxRate(taxName) {
  var taxRates = {
    'income': 0.2,
    'social security': 0.124,
    'medicare': 0.029,
    'total': 0.353
  }

  if (!(taxRates[taxName])) {
    throw 'Invalid tax name!'
  }

  return taxRates[taxName]
}

class TaxForm extends Component {
  state = {income: 0}

  handleSubmit = event => {
    event.preventDefault()
  }

  updateTax = event => {
    console.log(event.target.value)
    this.setState({
      income: event.target.value
    })
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
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          Salary: 
          <input 
            onChange={this.updateTax}
            type="number" 
          />
          {this.renderTaxItem('Income Tax', calculateTax(this.state.income, getTaxRate('income')))}
          {this.renderTaxItem('Social Security Tax', calculateTax(this.state.income, getTaxRate('social security')))}
          {this.renderTaxItem('Medicare Tax', calculateTax(this.state.income, getTaxRate('medicare')))}
          {this.renderTaxItem('Total Tax', calculateTax(this.state.income, getTaxRate('total')))}
        </div>
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
