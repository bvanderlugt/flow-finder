import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { RiverRow } from './components/RiverRow';
const rivers = require('../data/rivers.json')

console.log(rivers.rivers)

class App extends Component {
  constructor() {
    super()
    this.state = {
      rivers: rivers.rivers,
      currentRiver: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (evt) {
    this.setState({
      currentRiver: evt.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>River List</h2>
        </div>

        <div className="River-App">
          <form>
            <input type="text"
                   placeholder="Search for a river..."
                   value={this.state.currentRiver}
                   onChange={this.handleInputChange}/>
          </form>
          <table>
            <tbody>
              {this.state.rivers.map(river => <RiverRow key={river.riverName}
                                                        RiverName={river.riverName}
                                                        RunName={river.runName}
                                                        ClassType={river.classType}
                                                        FlowLevel={river.flow.level}
                                                        LastUpdate={river.lastUpdate} />)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


export default App;
