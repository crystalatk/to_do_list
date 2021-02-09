const host = 'ziggy.db.elephantsql.com',
    database = 'fnzljpje',
    user = 'fnzljpje',
    password = '7j9wp9jE0QqIcZs0J7ORc2Jv3hQZIquO';

const pgp = require('pg-promise')({
    query: function (event) {
        console.log('QUERY:', event.query);
    }
});

const options = {
    host,
    database,
    user,
    password
};

const db = pgp(options);

console.log("This is our db:", db);

module.exports = db;