exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('admin').del()
    .then(function () {
      // Inserts seed entries
      return knex('admin').insert([
        {username:"cameron", password:"$2a$10$AkhOFbYjKs.h3QikCCmfbOaLp4X4WbqQgC/RrA5b8jc8m/twnPHU6"},
        {username:"trevor", password:"$2a$10$Yqt4zT4nz3F8xRZYYztMFO2R/3Yv44lLW4AzUcEIpCbNjX.q1lirW"},
        ]);
    });
};
