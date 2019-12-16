const path = require('path');
const tingodb = require('tingodb');

const Engine = tingodb();

const db = new Engine.Db(path.join(__dirname, '../../', 'db'), {});

const employeesCollection = db.collection('employees');

/**
 * Validates an employee and throws an exception if employee is invalid.
 * @param {object} employee The employee to be validated
 */
function validateEmployee(employee) {
  if (!(employee.name && employee.department)) {
    throw new Error('Employee name and department are required');
  }
}

/**
 * Fetches all employees from the repository.
 * @returns {Promise} Resolves with all employees
 */
async function getAll() {
  return new Promise((resolve, reject) => {
    employeesCollection.find().toArray((error, items) => {
      if (error) {
        reject(error);
      } else {
        resolve(items);
      }
    });
  });
}

/**
 * Adds a friend to an employee.
 * @param {number} id The employee id
 * @param {number} friendId The friend Id to be added as a friend
 * @returns {object} The employee with the added friend
 */
async function addFriend(id, friendId) {
  const employee = await getById(id);

  if (!employee) {
    throw new Error(`No employee with Id ${id} was found.`);
  }

  const friend = await getById(friendId);

  if (!friend) {
    throw new Error(`No friend with id ${friendId} was found.`);
  }

  employee.friends.push(friend);

  employeesCollection.save(employee, error => {
    if (error) {
      throw error;
    } else {
      return employee;
    }
  });
}

/**
 * Adds a new employee to the database.
 * @param {object} employee The employee to be saved
 * @returns {Promise} Resolves with the saved employee
 */
async function addNewEmployee(employee) {
  return new Promise((resolve, reject) => {
    validateEmployee(employee);

    employeesCollection
      .find()
      .sort({id: -1})
      .limit(1)
      .toArray((error, items) => {
        if (error) {
          reject(error);
        } else {
          const lastEmployee = items[0] || {id: 0};

          const newEmployee = employee;
          const lastId = lastEmployee.id;
          newEmployee.id = lastId + 1;
          newEmployee.friends = [];
          employeesCollection.insert([newEmployee]);
          resolve(newEmployee);
        }
      });
  });
}

/**
 * Fetches an employee by Id.
 * @param {number} id The employee id
 * @returns {Promise} Resolves with the found employee
 */
async function getById(id) {
  return new Promise((resolve, reject) => {
    try {
      employeesCollection.findOne({id}, (error, item) => {
        if (error) {
          reject(error);
        } else if (!item) {
          reject(new Error(`Employee with id: ${id} not found`));
        } else {
          resolve(item);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Deletes an employee by id.
 * @param {number} id The employee id
 * @returns {Promise} Resolves with the id of the deleted employee
 */
async function deleteById(id) {
  return new Promise((resolve, reject) => {
    employeesCollection.findAndRemove({id}, (error, item) => {
      if (error) {
        reject(error);
      }
      resolve(item);
    });
  });
}

module.exports = {
  addFriend,
  addNewEmployee,
  deleteById,
  getAll,
  getById,
};
