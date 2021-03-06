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
    }
    groups{
      id
    }
    messages{
      id
      convos{
        person{
          name
          id
        }
        messages{
          text
          sender{
            name
            id
          }
          time
        }
      }
    }
  
  }
}
`
const userDetailWithMessages = gql`
query($id:ID, $profileId: ID!){
  user(id: $id){
    name
    id
    email
    contacts{
      id
    }
    groups{
      id
    }
    message{
      id
      convos(id: $profileId){
        person{
          name
          id
        }
        messages{
          text
          sender{
            name
            id
          }
          time
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
`;


const sendMessage = gql`
  mutation($text:String!,$sender:String!, $id:String!, $person:String!, $personId: String!, $userId: String!){
    sendMessage(text:$text, sender:$sender, id:$id, person:$person, personId: $personId, userId:$userId){
      id
      convos{
        person{
          name
        }
      }
    }
  }
`

const myAllContacts = gql`
  query($id:ID!){
      user(id:$id){
        id
        name
        contacts{
          id
          people{
            name
            id
            email 
          }
        }
        groups{
          id
          name
        }
      }
  }
`;

const createGroup = gql`
mutation($name: String!, $admin: String!, $members: [String]){
  createGroup(name:$name, admin:$admin, members:$members){
    name
    id
    admin{
      name
    }
    members{
      name
    }
  }
}
`;

const allMyGroups = gql`
query($id: ID!){
  allMyGroups(id:$id){
    name
    id
    members{
      name
      id
      email
    }
  }
}
`;

const getAGroup = gql`
query($id: ID){
  group(id: $id){
    name
    id
    members{
      name
			id
      email
    }
    admin{
      name
      id
      email
    }
  }
}
`

const getFreq = gql`
query($id: ID){
  user(id: $id){
    messages{
      convos{
        person{
          id
          name
        }
        messages{
          text
        }
      }
    }
  }
}

`

export { loginQuery, getFreq, getAGroup, allMyGroups, createGroup, signupQuery, userDetails, allUsers, addContact, userDetailWithMessages, allContacts, myAllContacts, sendMessage };