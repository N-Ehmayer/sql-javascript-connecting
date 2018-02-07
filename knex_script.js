const settings = require("./settings"); //settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});


const arg = process.argv.slice(2).toString();


function displayFamousQuery(results) {
  results.forEach(function(val, index) {
    const id = results[index].id;
    const fName = results[index].first_name;
    const lName = results[index].last_name;
    const dob = results[index].birthdate;

    console.log(`- ${id}: ${fName} ${lName}, born '${dob}'`);
  });
};

function queryFamousPeopleByName(name) {
  knex
    .select('*')
    .from('famous_people')
    .where('first_name', 'like', `%${name}%`)
    .orWhere('last_name', 'like', `%${name}%`)
    .asCallback((err, rows) => {
      displayFamousQuery(rows);
    });
};


queryFamousPeopleByName(arg);

