import { gql } from 'apollo-boost';


const loginQuery = gql`
  mutation($email:String!, $password: String!){
    login(email:$email, password:$password){
      name
      id
      token
      email 
      contacts{
        id
        people{
          name
          id
        }
      }
      groups{
        id
        name
        members{
          name
          id
        }
      }
      messages{
        id
        convos{
          person{
            id
          }
        }
      }   
    }
  }
`;

const signupQuery = gql`
  mutation($name: String!, $email: String!, $password: String!){
      addUser(name:$name, email: $email, password: $password){
        name
        id
        email
        
      }
  }
`;

const userDetails = gql`
query($id:ID){
  user(id: $id){
    name
    id
    email
    contacts{
      id
      people{
        name
        id
      }
    }
    groups{
      id
      name
      members{
        name
        id
      }
    }
    messages{
      id
      convos{
        person{
          id
        }
      }
    }
  
  }
}
`

const allUsers = gql`
  {
    allUsers{
      name
      id
      email
      contacts{
        id
        people{
          name
          id
        }
      }
    }
  }
`;

const allContacts = gql`
query($id:ID!){
  allContacts(id:$id){
  	id
    people{
      name
      id
      email
    }
  }
}
`


const addContact = gql`
  mutation($to:String!, $toCont:String!, $from: String!, $fromCont:String!){
    addContact(to: $to, toCont:$toCont, from:$from, fromCont:$fromCont){
      id
      people{
        name
        id
        email
      }
    }
  }
`

export { loginQuery, signupQuery, userDetails, allUsers, addContact, allContacts };