const express = require('express');

const employeeService = require('../service/employeeService');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.json(await employeeService.getAll());
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  const employeeId = req.params.id;

  try {
    return res.json(await employeeService.getById(employeeId));
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const newEmployee = req.body;
    return res.json(await employeeService.addNewEmployee(newEmployee));
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

router.post('/friend', async (req, res) => {
  try {
    const employeeId = req.body.id;
    const friendId = req.body.friendId;

    return res.json(await employeeService.addFriend(employeeId, friendId));
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;
    return res.json(await employeeService.deleteById(employeeId));
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

module.exports = router;
