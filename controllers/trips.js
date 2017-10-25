const knex = require("../db/knex.js");

module.exports = {
  viewAll: function(req, res) {
    let returnObj = {name:"",trips:[],flights:[]};
    knex('users')
      .select('name')
      .where('id', req.session.user)
      .limit(1)
      .then((resultArr)=>{
        returnObj.name = resultArr[0].name;
        knex.raw('SELECT t.title, t.description, a.name, f.start, f.destination FROM trips AS t JOIN flights AS f ON (t.flight_id = f.id) JOIN airlines AS a ON (f.airline_id = a.id)')
          .then(resultArr => {
            returnObj.trips = resultArr.rows.map(f=>createFlightTitle(f));
            console.log(JSON.stringify(returnObj.trips, null, 2));
            knex('flights')
              .select(['flights.id','start','destination','airlines.name'])
              .innerJoin('airlines','flights.airline_id','airlines.id')
              .then((resultArr)=> {
                returnObj.flights = resultArr;
                returnObj.flights = returnObj.flights.map(f=>createFlightTitle(f));
                returnObj.message = req.session.message;
                req.session.message = null;
                res.render('pages/trips',returnObj);
                console.log("Trips load");
              })
          })
      })
      .catch((err)=>{
        console.log(err);
        req.session.user = null;
        req.session.message = "There was a problem. Please try again.";
        res.redirect('/');
      })
  },

  create: function(req, res) {
    knex('trips')
      .insert({
        user_id: req.session.user,
        title: req.body.title,
        description: req.body.description,
        flight_id: +req.body.flight_id
      }, '*')
      .then((result)=>{
        req.session.message = "Added trip!"
        res.redirect('/trips');
      })
      .catch((err)=>{
        console.log(err);
        req.session.message = "There was an error adding the trip. Try again.";
        res.redirect('/trips');
      })
  }
};

function abbreviate(str) {
  //regex selects first letter after each word boundary
  //match returns array of all segments that match regex
  return str.match(/\b\w/g).join('').toUpperCase();
}

function createFlightTitle(flight) {
  flight.flight_title = `${abbreviate(flight.name)} ${flight.start}➟${flight.destination}`;
  delete flight.name;
  delete flight.start;
  delete flight.destination;
  return flight;
}
