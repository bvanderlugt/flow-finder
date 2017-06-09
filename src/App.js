import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { RiverRow, RiverHeader } from './components';
import { FormGroup, FormControl, Table } from 'react-bootstrap';
import { loadRivers } from './lib/riverService'

class App extends Component {
  constructor() {
    super()
    this.state = {
      rivers: [],
      currentRiver: '',
      filteredRivers: []
    }
  }

  componentDidMount() {
    loadRivers()
      .then(rivers => {
        console.log("in component did mount", JSON.stringify(rivers))
        this.setState({rivers: rivers,
                       filteredRivers: rivers})
      })
  }

  handleInputChange = (evt) => {
    // this.setState({
    //   currentRiver: evt.target.value
    // })
    evt.preventDefault()
    var updatedList = this.state.rivers
    updatedList = updatedList.filter((item) => {
      return item['riverName'].toLowerCase().search(
        evt.target.value.toLowerCase()) !== -1
    })

    this.setState({
      currentRiver: evt.target.value,
      filteredRivers: updatedList
    })
  }

  handleInputSubmit = (evt) => {
    evt.preventDefault()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>River List</h2>
        </div>

        <div className="River-App">

          <form onSubmit={this.handleInputSubmit}>
            <FormGroup
              controlId="riverSearch">
              <FormControl
                className="River-Search"
                type="text"
                placeholder="Search for a river..."
                value={this.state.currentRiver}
                onChange={this.handleInputChange}
              />
              <FormControl.Feedback />
            </FormGroup>
          </form>
          <Table>
            <tbody>
              <RiverHeader />
              {this.state.filteredRivers.map(river => <RiverRow key={river.id}
                                                        RiverName={river.riverName}
                                                        RunName={river.runName}
                                                        ClassType={river.classType}
                                                        FlowLevel={river.flow}
                                                        LastUpdate={river.lastUpdate} />)}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}


export default App;
