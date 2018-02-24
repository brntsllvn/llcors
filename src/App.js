import React, { Component } from 'react';
import './App.css';

function TaxItem(props) {
  return (
    <div>
      {props.label}: ${props.value}
    </div>
  )
}

function calculateTax(income, taxTableKey) {
  if (!income) {
    return 0;
  } 
  var taxRate = getTaxRate(taxTableKey);
  var taxableIncome = getTaxableIncome(income, taxTableKey);
  return (taxableIncome * taxRate).toFixed(2);
}

function getTaxableIncome(income, taxName) {
  return taxName === 'social security' ? getSocialSecurityTax(income) : income;
}

function getSocialSecurityTax(income) {
  return Math.min(128400, income);
}

function getTaxRate(taxTableKey) {
  var taxRates = {
    'income': 0.2,
    'social security': 0.124,
    'medicare': 0.029,
    'total': 0.353
  }
  if (!(taxRates[taxTableKey])) {
    throw 'Invalid tax name!';
  }
  return taxRates[taxTableKey];
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

  renderTaxItem(label, taxTableKey) {
    return (
      <TaxItem 
        label={label}
        value={calculateTax(this.state.income, taxTableKey)}
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
          {this.renderTaxItem('Income Tax', 'income')}
          {this.renderTaxItem('Social Security Tax', 'social security')}
          {this.renderTaxItem('Medicare Tax', 'medicare')}
          {this.renderTaxItem('Total Tax', 'total')}
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
