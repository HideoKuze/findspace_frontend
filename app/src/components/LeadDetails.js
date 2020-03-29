import React, { Component } from 'react'
import {updateLead, deleteLead} from '../calls'

// Display the details for leads here
export class LeadDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
          dataType: "", // store the type of data for the type of operation that should be sent to the backend. For example "create" will have the data for creating data
          display: false,
          } 
         
          // have CRUD options that are displayed when user clicks on a lead. When on of the options are selected
          // display the appropriate fields
        this.displayUpdateFields = this.displayUpdateFields.bind(this)
        this.deleteLead = this.deleteLead.bind(this)
        }
        
        async componentDidMount() {
            
            const email = this.props.location.state.Obj.selectedLead["email"]
            // set the current email so we can use it as a look up value for updating
            this.setState({currentLead:email}, ()=> console.log("CURR EMAIL", this.state))
            
          }

        async updateLead(event){
            event.preventDefault()
            // take this info and send to backend
            var request = await updateLead({
                lookup:this.state.currentLead, 
                email:this.state.email,
                notes:this.state.notes,
                contacted:this.state.contacted,
                first_name:this.state.first_name,
                last_name:this.state.last_name
            })
            this.props.history.push('/home')
            alert("Updated lead!")
            
            return request

        }
    
        async deleteLead(event){
            event.preventDefault()
            if(window.confirm("Are you sure you want to delete?")){ 
                var request = await deleteLead(this.state.currentLead)
                .then((data) => console.log("DELETED RESPONSE", data))
                this.props.history.push('/home')
                return request
            }
            
            
        }

        async displayUpdateFields(){
            if (!this.state.display){
                this.setState({display:true}, ()=> console.log("DISPLAY", this.state))
            }
            else {
                this.setState({display:false}, ()=> console.log("DISPLAY", this.state))
            }
        }
        // condition ? value-if-true : value-if-false
    render() {
        console.log("HERE STATE", this.props)
        return (
            <div>
                <h1> Details for {this.props.location.state.Obj.selectedLead["firstName"]} {this.props.location.state.Obj.selectedLead["lastName"]} </h1>
                <p><b>Email:</b> {this.props.location.state.Obj.selectedLead["email"]}</p>
                <p><b>Contacted:</b> {this.props.location.state.Obj.selectedLead["contacted"]}</p>
                <p><b>Notes:</b> {this.props.location.state.Obj.selectedLead["notes"]}</p>
                <p><b>Created At</b>: {this.props.location.state.Obj.selectedLead["createdAt"]}</p>
                <p><b>Updated At:</b> {this.props.location.state.Obj.selectedLead["updatedAt"]}</p>

                <h1>More Options</h1>
                <button onClick={this.deleteLead}>Delete Lead</button>
                <br/>
                <div>
                <button onClick={this.displayUpdateFields}>Update Lead</button>
                {
                this.state.display
                ?
                (
                <form onSubmit={this.updateLead.bind(this)}>
                <fieldset>
                <input type="text" name="email" value={this.value} placeholder="Enter new e-mail" onChange={e => this.setState({email: e.target.value})}></input>
                <br></br>
                <input type="text" name="contacted" value={this.value} placeholder="Contacted" onChange={e => this.setState({contacted: e.target.value})}></input>
                <br></br>
                <input type="text" name="notes" value={this.value} placeholder="Enter Notes" onChange={e => this.setState({notes: e.target.value})}></input>
                <br></br>
                <input type="text" name="first_name" value={this.value} placeholder="Enter first name" onChange={e => this.setState({first_name: e.target.value})}></input>
                <br></br>
                <input type="text" name="last_name" value={this.value} placeholder="Enter last name" onChange={e => this.setState({last_name: e.target.value})}></input>
                <br></br>
                <input type="submit" value="Submit" />
                </fieldset>
                </form>
                )
                :
                (
                    null 
                )}    
                </div>
            </div>
        )
    }
}