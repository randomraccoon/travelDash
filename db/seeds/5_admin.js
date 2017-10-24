
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('admin').del()
    // .then(function () {
    //   // Inserts seed entries
    //   return knex('admin').insert([
    //     {username:"trevor", password:"admin1965", airline_id:1234},
    //     ]);
    // });
};
