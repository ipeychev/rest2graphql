const employeesData = [
  {
    department: 'IT',
    friends: [],
    id: 1,
    name: 'Christie',
  },
];

/**
 * Validates an employee and throws an exception if employee is invalid.
 * @param {object} employee The employee to be validated
 */
function validateEmployee(employee) {
  if (!(employee.name && employee.department)) {
    throw new Error('Employee Name and department is required');
  }
}

/**
 * Fetches all employees from the repository.
 * @returns {Promise} Resolves with all employees
 */
async function getAll() {
  return new Promise(resolve => {
    resolve(employeesData);
  });
}

/**
 * Saves an employee to the database.
 * @param {object} employee The employee to be saved
 * @returns {Promise} Resolves with the saved employee
 */
async function save(employee) {
  return new Promise((resolve, reject) => {
    try {
      validateEmployee(employee);
      const newEmployee = employee;
      const lastEmployee = employeesData[employeesData.length - 1] || {id: 0};
      const lastId = lastEmployee.id;
      newEmployee.id = lastId + 1;
      newEmployee.friends = newEmployee.friends || [];
      employeesData.push(employee);
      resolve(employee);
    } catch (error) {
      reject(error);
    }
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
      const employee = employeesData.filter(item => item.id === id);
      if (employee.length === 0) {
        throw new Error(`Employee Resource with id: ${id} not found`);
      }
      resolve(employee[0]);
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
    try {
      const employeeIndex = employeesData.findIndex(item => item.id === id);
      if (employeeIndex === -1) {
        throw new Error(`Employee Resource with id: ${id} not found`);
      }
      employeesData.splice(employeeIndex, employeeIndex + 1);
      resolve({id});
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  deleteById,
  getAll,
  getById,
  save,
};
