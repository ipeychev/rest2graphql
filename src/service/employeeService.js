const employeeRepository = require('../repository/employeesRepository');

/**
 * Fetches all employees.
 * @returns {Promise} Resolves with all employees
 */
async function getAll() {
  return employeeRepository.getAll();
}

/**
 * Adds a new employee to the database.
 * @param {object} employee The employee to be saved
 * @returns {Promise} Resolves with the saved employee
 */
async function addNewEmployee(employee) {
  return employeeRepository.addNewEmployee(employee);
}

/**
 * Fetches an employee by Id.
 * @param {number} id The employee id
 * @returns {Promise} Resolves with the found employee
 */
async function getById(id) {
  return employeeRepository.getById(parseInt(id, 10));
}

/**
 * Deletes an employee by id.
 * @param {number} id The employee id
 * @returns {Promise} Resolves with the id of the deleted employee
 */
async function deleteById(id) {
  return employeeRepository.deleteById(parseInt(id, 10));
}

/**
 * Adds a friend to an employee.
 * @param {number} id The employee id
 * @param {number} friendId The friend Id to be added as a friend
 * @returns {object} The employee with the added friend
 */
async function addFriend(id, friendId) {
  return employeeRepository.addFriend(parseInt(id, 10), parseInt(friendId, 10));
}

module.exports = {
  addFriend,
  addNewEmployee,
  deleteById,
  getAll,
  getById,
};
