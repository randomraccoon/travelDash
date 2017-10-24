
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name:'cameron', email:'c@me.ron', password:'$2a$10$AkhOFbYjKs.h3QikCCmfbOaLp4X4WbqQgC/RrA5b8jc8m/twnPHU6'},
        {name:'Trevor Young', email:'tcyoung4@asu.edu', password:'$2a$10$Yqt4zT4nz3F8xRZYYztMFO2R/3Yv44lLW4AzUcEIpCbNjX.q1lirW'}
      ]);
    });
};
