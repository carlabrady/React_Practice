import React, { Component } from 'react';
import './App.css';

const url = 'http://localhost:5000/api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Countries are REALLY Great!',
      countries: [],
      country_name: '',
      continent_name: ''    
    }
    
    this.addCountry = this.addCountry.bind(this);
    this.removeCountry = this.removeCountry.bind(this);
    this.updateCountryName = this.updateCountryName.bind(this);
    this.updateContinentName = this.updateContinentName.bind(this);
  }

  componentDidMount() {
    console.log('component has mounted');    
    this.getCountries();
  }

  getCountries() {
    fetch(`${url}/countries`)
      .then(response => response.json())
      .then(countriesResponseArray => {
        console.log(countriesResponseArray);
        this.setState({
          countries: countriesResponseArray
        });
      })
      .catch(error => console.log(`Error Fetch getCountries: ${error}`));
  }

  updateCountryName(event) {
    this.setState({ country_name: event.target.value })
  }

  updateContinentName(event) {
    this.setState({ continent_name: event.target.value })
  }

  removeCountry(id) {
    const request = new Request(`${url}/remove/${id}`, {
      method: 'DELETE'
    });

    fetch(request)
      .then(response => {
        this.getCountries();
      })
      .catch(error => console.log(`Error Remove Country Fetch : ${error}`));
  }


  addCountry(event) {
    event.preventDefault();

    const country_data = {
      country_name: this.state.country_name,
      continent_name: this.state.continent_name,
    }

    const request = new Request(`${url}/new-country`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(country_data)
    });

    fetch(request)
      .then(response => {
          console.log(`post was successful: ${response}`);
          this.getCountries();
      })
      .catch(error => console.log(`Fetch Error addCountry: ${error}`));
      }


  render() {
    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <form>
          <input type="text" value={this.state.country_name} onChange={this.updateCountryName} placeholder="country_name"></input>
          <input type="text" value={this.state.continent_name} onChange={this.updateContinentName} placeholder="continent_name"></input>
          <button onClick={this.addCountry}>Add Country</button>
        </form>
        {this.state.country_name} | {this.state.continent_name}
        <ul>
        {this.state.countries.map(country => (
            <li key={country.id}> {country.country_name} | {country.continent_name}
              <button onClick={event => this.removeCountry(country.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
