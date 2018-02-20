import React, { Component } from 'react';
import './App.css';

class TaxForm extends Component {
  state = {income: 0}

  handleSubmit = event => {
    event.preventDefault()
  }

  updateTax = event => {
    this.setState({
      income: event.target.value
    })
  }

  render() {
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
          Income Tax: {this.income * 0.2}
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
