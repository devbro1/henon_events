const knex = require('knex');

knex.QueryBuilder.extend("paginate", function (request) {
  limit = request.query.pagination?.limit | 20;
  if(limit > 1000) {
    limit = 1000;
  }
  if(limit) {
    this.limit(limit);
  }

  offset = (request.query.pagination?.page | 0) * limit;
  if(offset) {
    this.offset(offset);
  }

  return this;
});

const pg = knex({
  client: 'pg',
  connection: 'postgresql://postgres:postgres@db/practice_db_1',
  searchPath: ['knex', 'public'],
});

exports.pg = pg;
