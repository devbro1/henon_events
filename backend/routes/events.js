var express = require('express');
var router = express.Router();
const { body, param, validationResult } = require('express-validator');
var db = require('../database/db');

router.get('/', async function (req, res, next) {
  result = await db.pg('events').select([
    'id',
    'title',
    'type',
    db.pg.raw("to_char(start_date, 'YYYY-MM-DD') as start_date"),
    db.pg.raw("to_char(end_date, 'YYYY-MM-DD') as end_date")]).paginate(req);
  res.send(result);
});

router.post('/',
  body('title').notEmpty(),
  body('start_date').notEmpty().isISO8601().toDate(),
  body('end_date').notEmpty().isISO8601().toDate(),
  body('type').notEmpty(),
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    result = (await db.pg.raw("insert into events (title,start_date,end_date,type) values (:title, :start_date, :end_date, :type ) RETURNING id;",
      {
        title: req.body.title,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        type: req.body.type,
      }));

    res.send({ message: 'new event was created', id: result.rows[0].id });
  });

router.get('/:id', param('id').notEmpty().custom(id => {
  return result = db.pg.raw("select id from events where id = :id", { id })
    .then((data) => {
      if (!data.rows.length) {
        return Promise.reject('resource not found')
      }
    })
}), async function (req, res, next) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }

  result = await db.pg("evnets").select("*").where({ id: req.params.id }).first();
  res.send(result);
});

router.put('/:id',
  param('id').notEmpty().custom(id => {
    return result = db.pg.raw("select id from transactions where id = :id", { id })
      .then((data) => {
        if (!data.rows.length) {
          return Promise.reject('resource not found')
        }
      })
  }),
  body('title').notEmpty(),
  body('start_date').notEmpty().isISO8601().toDate(),
  body('end_date').notEmpty().isISO8601().toDate(),
  body('type').notEmpty(),
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    result = await db.pg.raw("update events set title = :title , start_date = :start_date, end_date = :end_date, type = :type where id = :id",
      {
        id: req.params.id,
        title: req.body.title,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        type: req.body.type,
      });
    res.send({ message: 'event was updated successfully' });
  });

router.delete('/:id', param('id').notEmpty().custom(id => {
  return result = db.pg.raw("select id from events where id = :id", { id })
    .then((data) => {
      if (!data.rows.length) {
        return Promise.reject('resource not found')
      }
    })
}), async function (req, res, next) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }

  result = await db.pg("evnets").where({ id: req.params.id }).delete();
  res.send({ message: 'event was deleted successfully' });
});

module.exports = router;
