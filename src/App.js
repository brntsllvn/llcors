import React, { Component } from 'react';
import './App.css';

function TaxItem(props) {
  return (
    <div>
      {props.label}: {props.value}
    </div>
  )
}

function calculateTax(income, taxTableKey) {
  if (!income) {
    return 0;
  } 
  var taxRate = getTaxRate(taxTableKey);
  var taxableIncome = getTaxableIncome(income, taxTableKey);
  return taxableIncome * taxRate;
}

// function calculateSCorpTax(sCorpIncome, sCorpDividend, taxTableKey) {
//   if (!sCorpIncome && !sCorpDividend) {
//     return 0;
//   }
//   if (!sCorpIncome) {
//     sCorpIncome = 0;
//   }
//   if (!sCorpDividend) {
//     sCorpDividend = 0;
//   }
//   var taxRate = getTaxRate(taxTableKey);
//   var taxableIncome = getSCorpTaxableIncome(sCorpIncome, sCorpDividend, taxTableKey);
//   return taxableIncome * taxRate;
// }

function getTaxableIncome(income, taxName) {
  return taxName === 'social security' ? getSocialSecurityTax(income) : income;
}

// function getSCorpTaxableIncome(sCorpIncome, sCorpDividend, taxName) {
//   if (taxName === 'medicare') {
//     return sCorpIncome;
//   } else if (taxName === 'social security') {
//     return getSocialSecurityTax(sCorpIncome);
//   } else {
//     return sCorpIncome + sCorpDividend;
//   }
// }

function getSocialSecurityTax(income) {
  return Math.min(128400, income);
}

function getTaxRate(taxTableKey) {
  var taxRates = {
    'income': 0.2,
    'social security': 0.124,
    'medicare': 0.029
  }
  if (!(taxRates[taxTableKey])) {
    throw 'Invalid tax name!';
  }
  return taxRates[taxTableKey];
}

class TaxForm extends Component {
  state = {
    llcIncome: 0, 
    llcIncomeTax: 0,
    llcSocialSecurityTax: 0,
    llcMedicareTax: 0,
    llcTotalTax: 0,
    sCorpIncome: 0, 
    sCorpDividend: 0,
    sCorpIncomeTax: 0,
    sCorpSocialSecurityTax: 0,
    sCorpMedicareTax: 0,
    sCorpTotalTax: 0,
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  updateLlcTax = event => {
    var updatedIncome = event.target.valueAsNumber;
    var llcIncomeTax = calculateTax(updatedIncome, 'income');
    var llcSocialSecurityTax = calculateTax(updatedIncome, 'social security');
    var llcMedicareTax = calculateTax(updatedIncome, 'medicare');
    var llcTotalTax = llcIncomeTax + llcSocialSecurityTax + llcMedicareTax;
    this.setState({
      llcIncome: updatedIncome,
      llcIncomeTax: llcIncomeTax,
      llcSocialSecurityTax: llcSocialSecurityTax,
      llcMedicareTax: llcMedicareTax,
      llcTotalTax: llcTotalTax
    });
  }

  // updateSCorpIncome(event) {
  //   this.setState({
  //     sCorpIncome: event.target.valueAsNumber
  //   })
  // }

  // updateSCorpDividend(event) {
  //   this.setState({
  //     sCorpDividend: event.target.valueAsNumber
  //   })
  // }

  renderTaxItem(label, tax) {    
    return (
      <TaxItem 
        label={label}
        value={tax}
      />
    )
  }

  /*renderSCorpTaxItem(label, taxTableKey) {
    return (
      <TaxItem 
        label={label}
        value={calculateSCorpTax(
          this.state.sCorpIncome, 
          this.state.sCorpDividend, 
          taxTableKey
        )}
      />
    )
  }

  renderTotalSCorpTaxItem(label) {
    return (
      <TaxItem 
        label={label}
        value={calculateTotalSCorpTax(
          this.state.sCorpIncomeTax, 
          this.state.sCorpSocialSecurityTax, 
          this.state.sCorpMedicareTax
        )}
      />
    )
  }*/


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          Salary: 
          <input 
            onChange={this.updateLlcTax}
            type="number" 
          />
        </div>
        <div>
          {this.renderTaxItem('Income Tax', this.state.llcIncomeTax)}
          {this.renderTaxItem('Social Security Tax', this.state.llcSocialSecurityTax)}
          {this.renderTaxItem('Medicare Tax', this.state.llcMedicareTax)}
          {this.renderTaxItem('Total LLC Tax', this.state.llcTotalTax)}
        </div>

        {/*<br></br>

        <div>
          Salary: 
          <input 
            onChange={this.updateSCorpIncome}
            type="number" 
          />
        </div>
        <div>
          Dividend: 
          <input 
            onChange={this.updateSCorpDividend}
            type="number" 
          />
        </div>
        <div>
          {this.renderSCorpTaxItem('Income Tax', 'income')}
          {this.renderSCorpTaxItem('Social Security Tax', 'social security')}
          {this.renderSCorpTaxItem('Medicare Tax', 'medicare')}
          {this.renderTotalSCorpTaxItem('Total S Corp Tax')}
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
