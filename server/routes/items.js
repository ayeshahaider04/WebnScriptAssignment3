const express = require('express');
const router = express.Router();
const StudySession = require('../models/studysession');

router.get('/', async (req, res) => {
  const sessions = await StudySession.find().sort({ date: 1 });
  res.render('list', { sessions });
});

router.post('/add', async (req, res) => {
  const { title, description, date, duration } = req.body;
  await new StudySession({ title, description, date, duration }).save();
  res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
  const session = await StudySession.findById(req.params.id);
  res.render('edit', { session });
});

router.post('/edit/:id', async (req, res) => {
  const { title, description, date, duration } = req.body;
  await StudySession.findByIdAndUpdate(req.params.id, { title, description, date, duration });
  res.redirect('/');
});

router.post('/delete/:id', async (req, res) => {
  await StudySession.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;


