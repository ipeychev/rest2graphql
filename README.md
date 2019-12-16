# Purpose

The repository shows how an existing REST API can be extended and an additional GraphQL layer to be added on top of it.

# How to run it locally

1. Clone the repository and execute:
```
npm install
```

2. Execute

`npm run start` or `npm run start:watch`

# REST API
1. Fetch all employees 

```
curl 'http://localhost:3000/api/employees' | jq
```

2. Get emplouyee with given id

```
curl http://localhost:3000/api/employees/:id | jq
```

3. Create an employee

```
curl -d "name=Nolan&department=IT" -X POST http://localhost:3000/api/employees
```

4. Delete an employee

```
curl -X DELETE http://localhost:3000/api/employees/:id
```

5. Add a friend to an employee

```
curl -d "id=:id&friendId=:id" -X POST http://localhost:3000/api/employees/friend
```

# GraphQL API

1. Queries can be send to via the UI visible on: `http://localhost:3000/graphql`

2. Fetch employees

```
{
  employees {
    id,
    name,
    friends {
      id,
      name
    }
  }
}
```

3. Create an employee

```
mutation {
  createEmployee(name: "Hiro", department: "IT") {
    id
  }
}
```

4. Delete an employee

```
mutation {
  deleteEmployee(id: :id) {
    id
  }
}
```

5. Add a friend

```
mutation {
  addFriend(id: :id, friendId: :id) {
    id
  }
}
```
