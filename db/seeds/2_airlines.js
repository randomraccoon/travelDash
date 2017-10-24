
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('airlines').del()
    .then(function () {
      // Inserts seed entries
      return knex('airlines').insert([
        {name: 'American Airlines', description: 'Domestic, International'},
        {name: 'Delta Airlines', description: 'Domestic, International'},
        {name: 'Southwest Airlines', description: 'Domestic'},
        {name: 'United Airlines', description: 'Domestic'},
        {name: 'Air Canada', description: 'Domestic, International'},
        {name: 'Virgin America', description: 'International'},
        {name: 'Hawaiian Airlines', description: 'Domestic'},
        {name: 'Emirates Airlines', description: 'International'},
        {name: 'Singapore Airlines', description: 'International'},
        {name: 'Qatar Airways', description: 'Domestic'}
      ]);
    });
};
