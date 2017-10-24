
exports.up = function(knex, Promise) {
  return knex.schema.createTable('flights', (table) => {//posts is table name.
   table.increments(); //ID add to every table you make.
   table.string('start').notNullable().defaultTo('');
   table.string('destination').notNullable().defaultTo('');
   table.integer('airline_id')
   .notNullable()
   .references('id')
   .inTable('airlines')
   .onDelete('CASCADE')
   .index();
   table.timestamps(true, true); //created at and updated at.
 });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('flights');
};
