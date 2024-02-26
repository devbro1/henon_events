const knex = require('knex');

const pg = knex({
  client: 'pg',
  connection: 'postgresql://postgres:postgres@db/practice_db_1',
  searchPath: ['knex', 'public'],
});

knex.QueryBuilder.extend("paginate", function (request) {
  limit = request.query.page?.per_page || 1000;
  limit = Math.floor(limit,1000);

  page = request.query.page?.number || 1;
  offset = (page - 1) * limit;

  const raw_sql = this.toSQL().sql;

  return Promise.all([
    pg
      .count('t.* as count')
      .fromRaw('(' + raw_sql + ') as t')
      .first(),
    this.offset(offset).limit(limit)
  ])
    .then(([total, rows]) => {
      var count = total.count;
      var rows = rows;
      var pagination = {};
      pagination.total = count;
      pagination.per_page = limit;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / limit) + 1;
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      return pagination;
    });

  return this;
});

exports.pg = pg;
