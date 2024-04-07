import { gql } from 'apollo-angular';

export const signup = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const login = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const AddEmployee = gql`mutation CreateEmployee($firstname: String!, $lastname: String!, $email: String!, $gender: String!, $salary: Float!) {
  createEmployee(firstname: $firstname, lastname: $lastname, email: $email, gender: $gender, salary: $salary) {
    email
  }
}`
export const getAllEmployees = gql`
  query GetAllEmployees {
    getAllEmployees {
      _id
      firstname
      lastname
      email
      gender
      salary
    }
  }
`;

export const updateEmployee = gql`
  mutation UpdateEmployee($eid: ID!, $firstname: String, $lastname: String, $email: String, $gender: String, $salary: Float) {
    updateEmployee(eid: $eid, firstname: $firstname, lastname: $lastname, email: $email, gender: $gender, salary: $salary) {
      _id
      firstname
      lastname
      email
      gender
      salary
    }
  }
`;

export const deleteEmployee = gql`
  mutation DeleteEmployee($eid: ID!) {
    deleteEmployee(eid: $eid) {
      _id
      firstname
      lastname
      email
      gender
      salary
    }
  }
`;

export const findEmployee = gql`
  query FindEmployee($eid: ID!) {
    getEmployeeById(eid: $eid) {
      _id
      firstname
      lastname
      email
      gender
      salary
    }
  }
`;
