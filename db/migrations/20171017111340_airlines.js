
exports.up = function(knex, Promise) {
  return knex.schema.createTable('airlines', (table) => {//posts is table name.
   table.increments(); //ID add to every table you make.
   table.string('name').notNullable().defaultTo('');
   table.string('description').notNullable().defaultTo('');
   table.timestamps(true, true); //created at and updated at.
 });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('airlines');
};
