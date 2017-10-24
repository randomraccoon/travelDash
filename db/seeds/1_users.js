
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name:'Brian McGrane', email:'b@yahoo.com', password:'test'},
        {name:'Trevor Young', email:'t@yahoo.com', password:'test2'},
        {name:'Barbara Doring', email:'barb@yahoo.com', password:'test3'}
      ]);
    });
};
