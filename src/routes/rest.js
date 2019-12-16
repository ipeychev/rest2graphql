const express = require('express');

const employeeService = require('../service/employeeService');

const router = express.Router();

router.get('/', async (req, res) => {
  res.json(await employeeService.getAll());
});

router.get('/:id', async (req, res) => {
  const employeeId = req.params.id;
  return res.json(await employeeService.getById(employeeId));
});

router.post('/', async (req, res) => {
  const newEmployee = req.body;
  return res.json(await employeeService.save(newEmployee));
});

router.post('/friend', async (req, res) => {
  const employeeId = req.body.id;
  const friendId = req.body.friendId;

  return res.json(await employeeService.addFriend(employeeId, friendId));
});

router.delete('/:id', async (req, res) => {
  const employeeId = req.params.id;
  return res.json(await employeeService.deleteById(employeeId));
});

module.exports = router;
