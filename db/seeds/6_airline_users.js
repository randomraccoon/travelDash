exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('airline_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('airline_users').insert([
        {username:"cameron", password:"$2a$10$AkhOFbYjKs.h3QikCCmfbOaLp4X4WbqQgC/RrA5b8jc8m/twnPHU6", airline_id:1},
        {username:"trevor", password:"$2a$10$Yqt4zT4nz3F8xRZYYztMFO2R/3Yv44lLW4AzUcEIpCbNjX.q1lirW", airline_id:1},
        ]);
    });
};
