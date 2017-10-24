exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips').del()
    .then(function () {
      // Inserts seed entries
      return knex('trips').insert([
        {user_id: 1, title: 'SWA108', description: 'Round Trip', flight_id: 1},
        {user_id: 2, title: 'DA9876', description: 'One-', flight_id: 2},
        {user_id: 2, title: 'VA9010', description: 'Round Trip', flight_id: 3}
      ]);
    });
};
