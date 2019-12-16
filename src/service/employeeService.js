const employeeRepository = require('../repository/employeesRepository');

/**
 * Fetches all employees.
 * @returns {Promise} Resolves with all employees
 */
async function getAll() {
  return employeeRepository.getAll();
}

/**
 * Saves an employee to the database.
 * @param {object} employee The employee to be saved
 * @returns {Promise} Resolves with the saved employee
 */
async function save(employee) {
  return employeeRepository.save(employee);
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
  const employee = await getById(id);

  if (employee) {
    const friend = await getById(friendId);

    if (!friend) {
      throw new Error(`No employee with Id ${friendId} was found.`);
    }

    employee.friends.push(friend);
  }

  return employee;
}

module.exports = {
  addFriend,
  deleteById,
  getAll,
  getById,
  save,
};
