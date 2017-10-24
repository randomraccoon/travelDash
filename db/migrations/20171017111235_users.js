
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {//posts is table name.
   table.increments(); //ID add to every table you make.
   table.string('name').notNullable().defaultTo('');
   table.string('email').notNullable().defaultTo('');
   table.string('password').notNullable().defaultTo('');
   table.timestamps(true, true); //created at and updated at.
 });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
