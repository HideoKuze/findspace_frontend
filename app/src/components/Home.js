// this will be the home page that lists all the available leads

import React from 'react'
import {getAllLeads, getAllLeadsGraphQL} from '../../src/calls'
import List from './List'
import {LeadDetails} from './LeadDetails'
import {CreateLead} from './CreateLead'
import {Link} from 'react-router-dom';


class Home extends React.Component {
  constructor(props){
  
  super(props)
  this.state = {
    dataType: "", // store the type of data for the type of operation that should be sent to the backend. For example "create" will have the data for creating data
    data: {},
    displayOptions: false,
    leads: [],
    selectedLead: null
    } 
   
    // have CRUD options that are displayed when user clicks on a lead. When on of the options are selected
    // display the appropriate fields
    this.handleChange = this.handleChange.bind(this)
    this.displayDetails = this.displayDetails.bind(this)
  }

  async handleChange(event){
    event.preventDefault()
    // use console.log here otherwise it won't show the desired value for state on the first click
    // this.setState({displayOptions: true}, () => console.log(this.state)) 
    // now get the details for each lead from backend

  }
  
  
  async displayDetails(dataType, selectedLead){
    selectedLead.contacted = JSON.stringify(selectedLead.contacted)
    this.setState({
      displayOptions: true,
      dataType: dataType,
      selectedLead: selectedLead
    }, () => console.log("options", this.state));

  };
  

  async componentDidMount() {
    var response = await getAllLeads((data) => {return data});
    var leads = await response.text()
    var leads = JSON.parse(leads)
    console.log("HOME RESPONSE", response)
    this.setState({ leads }, () => console.log("HOME STATE", this.state));
    
    // GraphQL CALL
    // var leads = await getAllLeadsGraphQL(function(data){
    //   return data
    // })
    // leads = JSON.parse(leads)
    // leads = leads.all_leads
    // this.setState({ leads })
  }

  
  
  // <HomePage dataState={this.state}/>
  // then if the dataType isn't empty display the HTML for those fields
  // <Card Obj={this.state} displayDetails={this.displayDetails}/>
  render() {
    // when one of the leads is clicked, display options
    if(this.state.dataType === "detail" && this.state.displayOptions === true){
        console.log("DISPLAY Details",this.state.displayOptions)
        // Switch>
        // <Route path="/leads" component={Home}></Route>
        // </Switch>
        return (
          <div className="App">
            <h1> Details for {this.state.selectedLead["firstName"]}  {this.state.selectedLead["lastName"]} </h1>
            <LeadDetails />
          </div>
        )

    }
    return (
        <div className="App">
          <h1> Select lead  </h1>
          <List Obj={this.state} displayDetails={this.displayDetails}/>
          <CreateLead pathname="/create"/>
        </div>
      )
  }
}

export default Home;
