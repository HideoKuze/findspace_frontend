import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class List extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showMenu: false,
      selectedLead: null
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

showMenu(leadObj){
    this.state.selectedLead = leadObj
    // this.setState({selectedLead: leadObj}, () => console.log("LIST NEW STATE", this.state))
    
}
  
  closeMenu(event) {
    
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      }); 
      
    }
  }

  handleClick(arg){
      this.props.updateOptions(arg)
      console.log(this.props.Obj)
  }

  render() {
    return (  
      <div>
        {this.props.Obj.leads.map(lead => (
        <div key={lead.id}>
        <Link to={{pathname:'/details', state: {Obj:this.state}}}>
        <button  href={lead.first_name} onClick={()=>this.showMenu({"email":lead.email, "firstName":lead.first_name, 
        "lastName":lead.last_name, "notes":lead.notes, "contacted": lead.contacted, 
        "updatedAt":lead.updated_At, "createdAt": lead.created_At})}>
            {lead.first_name} {lead.last_name} 
        </button>
        </Link>
        </div>  
        ))}
 
      </div>
    );
  }
}


export default withRouter(List)