import React from 'react'
import Home from './components/Home'
import {CreateLead} from './components/CreateLead'
import {LeadDetails} from './components/LeadDetails'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      
      <div className="App">
        <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/details" component={LeadDetails} />
          <Route path="/create" component={CreateLead} />
        </Switch>
        </BrowserRouter>
      </div>
      
    )
  }
}
export default App;
