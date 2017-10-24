
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trips', (table) => {//posts is table name.
   table.increments(); //ID add to every table you make.
   table.integer('user_id')
   .notNullable()
   .references('id')
   .inTable('users')
   .onDelete('CASCADE')
   .index();
   table.string('title').notNullable().defaultTo('');
   table.string('description').notNullable().defaultTo('');
   table.integer('flight_id')
   .notNullable()
   .references('id')
   .inTable('flights')
   .onDelete('CASCADE')
   .index();
   table.timestamps(true, true); //created at and updated at.
 });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trips');
};
