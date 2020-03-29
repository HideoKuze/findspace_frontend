
import fetch from 'node-fetch'
import {request} from 'graphql-request'

// get a list of all the leads from the Django backend 
const getAllLeads = async () => {
    const leads = await fetch("http://127.0.0.1:8000/api/v1/leads/", {method:'get', headers: {"Content-Type": "application/json"}})
  
    return await leads
  
  }


const getOneLead = async (email) => {
    const leads = await fetch(`http://127.0.0.1:8000/api/v1/leads/${email}/`, {method:'get', headers: {"Content-Type": "application/json"}})

    return await leads.text()

}

const updateLead = async (body) => {
    console.log("BODY", body)
    const lookupEmail = body.lookup
    
    const leads = await fetch(`http://127.0.0.1:8000/api/v1/leads/${lookupEmail}/`, {method:'put', headers: {"Content-Type": "application/json"}, body:JSON.stringify(body)})

    return await leads.text()

}

const deleteLead = async (email) => {
    console.log("EMAIL", email)
    
    const leads = await fetch(`http://127.0.0.1:8000/api/v1/leads/${email}/`, {method:'delete', headers: {"Content-Type": "application/json"}})

    return await leads.text()

}

const createLead = async (body) => {
    console.log("CREATED BODY", body)
    const leads = await fetch(`http://127.0.0.1:8000/api/v1/leads/`, {method:'post', headers: {"Content-Type": "application/json"}, body:JSON.stringify(body)})

    return await leads.text()

}

const createLeadGraphQL = async(body) => {
    console.log("GRAPHQL CREATE", body)
    let data = {
        query:
        `mutation createLead($email:String!, $contacted:String!, $notes:String!,$first_name:String!, $last_name:String!){
          create_Lead(email:$email, contacted:$contacted, notes:$notes, first_name:$first_name, last_name:$last_name){
          ok
          info{
            email
            first_name
            last_name
          }
          }
        }
        `,
      variables: {
        email: body.email,
        first_name: body.first_name,
        last_name: body.last_name,
        contacted: body.contacted,
        notes: body.notes
      },
      }
    
      return request("http://127.0.0.1:8000/graphql/", data.query, data.variables).then((data) => {return data})

}

const getAllLeadsGraphQL = (callback) => {
    console.log("GRAPHQL CREATE")
    let data = {
        query:
        `query allLeads{
            all_leads{
                id
                email
                first_name
                last_name
                notes
                contacted
            }
        }
        `
      }
    
    const allLeads = request("http://127.0.0.1:8000/graphql/", data.query).then((data) => callback(JSON.stringify(data)))
    console.log("ALL LEAD", allLeads)
    return allLeads
}
  
  

export {getAllLeads, getOneLead, updateLead, deleteLead, createLead, createLeadGraphQL, getAllLeadsGraphQL}