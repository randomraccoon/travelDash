
exports.up = function(knex, Promise) {
  return knex.schema.createTable('admin', (table)=>{
    table.increments();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.foreign('airline_id').references('airlines');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('admin');
};
