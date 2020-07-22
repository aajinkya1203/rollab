import { gql } from 'apollo-boost';


const loginQuery = gql`
  mutation($email:String!, $password: String!){
    login(email:$email, password:$password){
      name
      id
      token
      email    
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
`

export { loginQuery, signupQuery }