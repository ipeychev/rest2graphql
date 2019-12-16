const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');

const employeesService = require('../service/employeeService');

const schema = buildSchema(`
  type Query {
    employee(id: Int!): Employee,
    employees: [Employee]
  }

  type Mutation {
    addFriend(id: Int!, friendId: Int!): Employee,
    createEmployee(name: String!, department: String!): Employee,
    deleteEmployee(id: Int!): DeleteEmployeeResponse,
  }

  input EmployeeInput {
    name: String!,
    department: String!
  }

  input AddFriendInput {
    id: Int!,
    friendId: Int!
  }

  type DeleteEmployeeResponse {
    id: Int!
  }

  type Employee {
    id: Int!,
    name: String!,
    department: String!
    friends: [Employee]
  }
`);

const rootResolver = {
  addFriend: addFriendInput =>
    employeesService.addFriend(addFriendInput.id, addFriendInput.friendId),
  createEmployee: employeeInput =>
    employeesService.addNewEmployee(employeeInput),
  deleteEmployee: employeeInput =>
    employeesService.deleteById(employeeInput.id),
  employee: employeeInput =>
    employeesService.getById(employeeInput && employeeInput.id),
  employees: employeesService.getAll(),
};

const graphql = graphqlHTTP({
  graphiql: true,
  rootValue: rootResolver,
  schema,
});

module.exports = graphql;
