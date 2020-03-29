import React, { Component } from 'react'
import {createLead, createLeadGraphQL} from '../calls'

export class CreateLead extends Component {
    constructor(props){
        super(props)
        this.state = {
          dataType: "", // store the type of data for the type of operation that should be sent to the backend. For example "create" will have the data for creating data
          display: false,
          } 

        this.createLead = this.createLead.bind(this)
        this.displayUpdateFields = this.displayUpdateFields.bind(this)

        }


        async createLead(event){
            event.preventDefault()

            // REGULAR FETCH REQUEST
            var request = await createLead({
                email:this.state.email,
                notes:this.state.notes,
                contacted:this.state.contacted,
                first_name:this.state.first_name,
                last_name:this.state.last_name
            }
            )
            .then((data) => console.log("CREATED RESPONSE", data))
            return request

            // GRAPHQL REQUEST
            // var graphqlRequest = await createLeadGraphQL({
            //     email:this.state.email,
            //     notes:this.state.notes,
            //     contacted:this.state.contacted,
            //     first_name:this.state.first_name,
            //     last_name:this.state.last_name
            // }
            // )
            // .then((data) => window.alert("Created new user: " + data.create_Lead.info.first_name + " " + data.create_Lead.info.last_name))
            // window.location.reload()
            // return graphqlRequest

        }

        async displayUpdateFields(){
            if (!this.state.display){
                this.setState({display:true}, ()=> console.log("DISPLAY", this.state))
            }
            else {
                this.setState({display:false}, ()=> console.log("DISPLAY", this.state))
            }
        }

    render() {
        return (
            <div>
                <h1>Create a new Lead</h1> 
                <button onClick={this.displayUpdateFields}>Create</button>
                <br/>
                <div>
                {
                this.state.display
                ?
                (
                <form onSubmit={this.createLead.bind(this)}>
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

export default CreateLead
