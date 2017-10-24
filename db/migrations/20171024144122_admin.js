
exports.up = function(knex, Promise) {
  return knex.schema.createTable('admin', (table)=>{
    table.increments();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.integer('airline_id').references("id")
      .inTable("airlines")
      .onDelete("CASCADE")
      .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('admin');
};
